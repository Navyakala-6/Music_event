import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { defaultAssets } from "../utils/assets";
import { useWishlist } from "./WishlistContext";

const MediaSlide = memo(function MediaSlide({
  asset,
  index,
  isActive,
  userPaused,
  isLiked,
  onVideoClick,
  onToggleLike,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || asset.type !== "video") return;

    if (isActive && !userPaused) {
      video.muted = false;
      video.volume = 1;
      if (video.readyState >= 2) {
        video.play().catch(() => {});
      } else {
        const onCanPlay = () => {
          video.play().catch(() => {});
          video.removeEventListener("canplay", onCanPlay);
        };
        video.addEventListener("canplay", onCanPlay);
        return () => video.removeEventListener("canplay", onCanPlay);
      }
    } else {
      video.pause();
      video.muted = true;
      video.volume = 0;
    }
  }, [isActive, userPaused, asset.type]);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleLike(asset);
  };

  return (
    <div className="media-item" data-index={index}>
      <div
        className="media-wrapper"
        onClick={(e) => asset.type === "video" && onVideoClick(index, e)}
      >
        {asset.type === "video" ? (
          <video
            ref={videoRef}
            className="media-content"
            loop
            playsInline
            preload={isActive ? "auto" : "none"}
            muted={!isActive}
          >
            <source src={asset.src} type="video/mp4" />
          </video>
        ) : (
          <img
            className="media-content"
            src={asset.src}
            alt={asset.title || ""}
            loading={isActive ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        )}
        <button
          type="button"
          className={`media-like-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLikeClick}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isLiked ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
});

function Content({ mediaAssets }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPausedVideos, setUserPausedVideos] = useState(() => new Set());
  const { toggleLike, isLiked } = useWishlist();

  const mediaScrollerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const hasInteracted = useRef(false);

  const assets = useMemo(() => {
    if (Array.isArray(mediaAssets)) return mediaAssets;
    return defaultAssets;
  }, [mediaAssets]);

  const assetsKey = useMemo(
    () => assets.map((a) => a.src).join("|"),
    [assets]
  );

  const scrollToItem = useCallback(
    (index) => {
      const scroller = mediaScrollerRef.current;
      if (!scroller || index < 0 || index >= assets.length) return;

      const pageHeight = scroller.clientHeight;
      scroller.scrollTo({
        top: index * pageHeight,
        behavior: "smooth",
      });

      activeIndexRef.current = index;
      setActiveIndex(index);
    },
    [assets.length]
  );

  const stopAllAudio = useCallback(() => {
    if (!mediaScrollerRef.current) return;
    mediaScrollerRef.current.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.muted = true;
      video.volume = 0;
    });
  }, []);

  useEffect(() => {
    activeIndexRef.current = 0;
    setActiveIndex(0);
    setUserPausedVideos(new Set());
    stopAllAudio();

    const scroller = mediaScrollerRef.current;
    if (scroller) {
      scroller.scrollTop = 0;
    }
  }, [assetsKey, stopAllAudio]);

  useEffect(() => {
    if (assets.length === 0) return;
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;

    const playActive = () => {
      const video = scroller.querySelector('[data-index="0"] video');
      if (video && assets[0]?.type === "video") {
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {});
      }
    };

    const t = setTimeout(playActive, 150);
    return () => clearTimeout(t);
  }, [assetsKey, assets]);

  useEffect(() => {
    const scroller = mediaScrollerRef.current;
    if (!scroller || assets.length === 0) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const pageHeight = scroller.clientHeight;
        if (pageHeight <= 0) {
          rafId = null;
          return;
        }

        const newIndex = Math.max(
          0,
          Math.min(Math.round(scroller.scrollTop / pageHeight), assets.length - 1)
        );

        if (newIndex !== activeIndexRef.current) {
          scroller.querySelectorAll("video").forEach((video, i) => {
            const item = video.closest(".media-item");
            const idx = Number(item?.dataset?.index);
            if (idx !== newIndex) {
              video.pause();
              video.muted = true;
              video.volume = 0;
            }
          });

          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);

          if (assets[newIndex]?.type !== "video") {
            stopAllAudio();
          } else if (!userPausedVideos.has(newIndex)) {
            const video = scroller.querySelector(
              `[data-index="${newIndex}"] video`
            );
            if (video) {
              video.muted = false;
              video.volume = 1;
              video.play().catch(() => {});
            }
          }
        }
        rafId = null;
      });
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [assetsKey, assets, stopAllAudio, userPausedVideos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") scrollToItem(activeIndexRef.current + 1);
      if (e.key === "ArrowUp") scrollToItem(activeIndexRef.current - 1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [scrollToItem]);

  useEffect(() => {
    if (!hasInteracted.current) return;

    const advance = () => {
      scrollToItem((activeIndexRef.current + 1) % assets.length);
    };

    let timeoutId;

    if (assets[activeIndex]?.type === "video") {
      const scroller = mediaScrollerRef.current;
      const item = scroller?.querySelector(
        `[data-index="${activeIndex}"] video`
      );
      if (item) {
        const handleEnded = () => advance();
        item.addEventListener("ended", handleEnded);
        return () => item.removeEventListener("ended", handleEnded);
      }
    } else {
      timeoutId = setTimeout(advance, 5000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeIndex, assets, scrollToItem, assetsKey]);

  const handleVideoClick = useCallback((index, e) => {
    e.stopPropagation();
    const video = mediaScrollerRef.current?.querySelector(
      `[data-index="${index}"] video`
    );
    if (!video) return;

    hasInteracted.current = true;

    if (video.paused) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
      setUserPausedVideos((prev) => {
        const s = new Set(prev);
        s.delete(index);
        return s;
      });
    } else {
      video.pause();
      setUserPausedVideos((prev) => new Set([...prev, index]));
    }
  }, []);

  if (assets.length === 0) {
    return (
      <main className="content">
        <div className="media-empty">No media found for this option.</div>
      </main>
    );
  }

  return (
    <main className="content">
      <div className="media-scroller" ref={mediaScrollerRef}>
        <div className="media-container" key={assetsKey}>
          {assets.map((asset, index) => (
            <MediaSlide
              key={asset.src}
              asset={asset}
              index={index}
              isActive={index === activeIndex}
              userPaused={userPausedVideos.has(index)}
              isLiked={isLiked(asset)}
              onVideoClick={handleVideoClick}
              onToggleLike={toggleLike}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Content;
