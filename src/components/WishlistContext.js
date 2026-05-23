import React, { createContext, useContext, useState, useCallback } from 'react';
import { getWishlist, toggleWishlistItem } from '../utils/wishlist';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => getWishlist());

  const toggleLike = useCallback((asset) => {
    const next = toggleWishlistItem(asset);
    setWishlist(next);
    return next.some((item) => item.src === asset.src);
  }, []);

  const isLiked = useCallback(
    (asset) => {
      const src = asset?.src;
      return src ? wishlist.some((item) => item.src === src) : false;
    },
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggleLike, isLiked }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return ctx;
}
