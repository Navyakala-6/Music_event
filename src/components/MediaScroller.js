import React, { useState, useEffect } from 'react';
import './LandingPage.css';

// Import only essential assets directly to avoid performance issues
import videoSrc from '../assets/WhatsApp Video 2025-10-12 at 1.40.08 PM.mp4';
import image1 from '../assets/15bb5d5c-a260-4377-bff9-c57d04ceb75f.jpg';
import image2 from '../assets/47f2aa63-7c09-4430-9862-534827de4fe3.jpg';
import image3 from '../assets/699810f9-dc48-43fe-8c7b-4a924769ac59.jpg';
import image4 from '../assets/e2b85c2e-1297-41ba-97a5-04b2a4eaa095.jpg';

const MEDIA_ITEMS = [
  {
    type: "image",
    src: image1,
    title: "Music Event 1",
    description: "Amazing musical performance"
  },
  {
    type: "image",
    src: image2,
    title: "Music Event 2",
    description: "Beautiful musical moment"
  },
  {
    type: "video",
    src: videoSrc,
    title: "Music Event Video",
    description: "Live musical performance"
  },
  {
    type: "image",
    src: image3,
    title: "Music Event 3",
    description: "Inspiring musical scene"
  },
  {
    type: "image",
    src: image4,
    title: "Music Event 4",
    description: "Captivating musical experience"
  }
];

function MediaScroller() {
  return (
    <div className="media-scroller">
      <div className="media-container">
        {MEDIA_ITEMS.map((media, index) => (
          <div className="media-item" key={index}>
            <div className="media-wrapper">
              {media.type === "video" ? (
                <video
                  className="media-content"
                  loop
                  playsInline
                  preload="metadata"
                  muted
                  controls
                >
                  <source src={media.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="media-content"
                  alt={media.title}
                  loading="lazy"
                  src={media.src}
                />
              )}
              <div className="media-overlay">
                <div className="media-info">
                  <h3 className="media-title">{media.title}</h3>
                  <p className="media-description">{media.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaScroller;