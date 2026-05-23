const WISHLIST_KEY = 'music_app_wishlist';

export const getWishlist = () => {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveWishlist = (items) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

export const getWishlistId = (asset) => asset?.src || '';

export const isInWishlist = (asset) => {
  const id = getWishlistId(asset);
  return getWishlist().some((item) => item.src === id);
};

export const toggleWishlistItem = (asset) => {
  const id = getWishlistId(asset);
  if (!id) return getWishlist();

  const list = getWishlist();
  const exists = list.findIndex((item) => item.src === id);
  let next;

  if (exists >= 0) {
    next = list.filter((item) => item.src !== id);
  } else {
    next = [
      ...list,
      {
        src: asset.src,
        type: asset.type,
        title: asset.title || 'Media',
        description: asset.description || '',
        folder: asset.folder || '',
      },
    ];
  }

  saveWishlist(next);
  return next;
};
