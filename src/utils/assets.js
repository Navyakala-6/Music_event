import videoAsset from '../assets/WhatsApp Video 2025-10-12 at 1.40.08 PM.mp4';
import image1 from '../assets/15bb5d5c-a260-4377-bff9-c57d04ceb75f.jpg';
import image2 from '../assets/47f2aa63-7c09-4430-9862-534827de4fe3.jpg';
import image3 from '../assets/699810f9-dc48-43fe-8c7b-4a924769ac59.jpg';
import image4 from '../assets/e2b85c2e-1297-41ba-97a5-04b2a4eaa095.jpg';

export const defaultAssets = [
  {
    type: 'video',
    src: videoAsset,
    title: 'Music Event Video 1',
    description: 'Amazing musical performance',
  },
  {
    type: 'image',
    src: image1,
    title: 'Music Event Image 1',
    description: 'Beautiful musical moment',
  },
  {
    type: 'image',
    src: image2,
    title: 'Music Event Image 2',
    description: 'Inspiring musical scene',
  },
  {
    type: 'image',
    src: image3,
    title: 'Music Event Image 3',
    description: 'Captivating musical experience',
  },
  {
    type: 'image',
    src: image4,
    title: 'Music Event Image 4',
    description: 'Memorable musical moment',
  },
];

// Load every image/video under src/assets (all subfolders).
const mediaContext = require.context(
  '../assets',
  true,
  /\.(png|jpe?g|svg|mp4|mov|avi)$/i
);

const isMediaFile = (key) =>
  !/sirilogo/i.test(key) && /\.(png|jpe?g|svg|mp4|mov|avi)$/i.test(key);

const normalizeLabel = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const shuffle = (list) => {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const interleaveVideosImages = (assets) => {
  const videos = assets.filter((a) => a.type === 'video');
  const images = assets.filter((a) => a.type === 'image');
  const result = [];
  const maxLength = Math.max(videos.length, images.length);
  for (let i = 0; i < maxLength; i++) {
    if (images[i]) result.push(images[i]);
    if (videos[i]) result.push(videos[i]);
  }
  return result;
};

const parseKey = (key) => {
  const parts = key.split('/').filter(Boolean);
  // './Piano/photo.jpg' -> folder Piano
  // './photo.jpg' -> root
  if (parts.length >= 2) {
    return { folder: parts[0], fileName: parts.slice(1).join('/') };
  }
  return { folder: 'root', fileName: parts[0] || key };
};

const buildAsset = (key) => {
  const src = mediaContext(key);
  const { folder, fileName } = parseKey(key.replace(/^\.\//, ''));
  const isVideo = /\.(mp4|mov|avi)$/i.test(fileName);
  return {
    type: isVideo ? 'video' : 'image',
    src,
    folder,
    title: `${folder === 'root' ? 'Media' : folder} – ${fileName}`,
    description: folder === 'root' ? 'Root assets' : `Media from ${folder}`,
  };
};

const allMediaAssets = () => {
  const seen = new Set();
  return mediaContext.keys().filter(isMediaFile).reduce((acc, key) => {
    const asset = buildAsset(key);
    if (seen.has(asset.src)) return acc;
    seen.add(asset.src);
    acc.push(asset);
    return acc;
  }, []);
};

// Discover folder names from bundled files.
const discoveredFolderMap = (() => {
  const map = new Map();
  mediaContext.keys().forEach((key) => {
    if (!isMediaFile(key)) return;
    const { folder } = parseKey(key.replace(/^\.\//, ''));
    if (folder && folder !== 'root') {
      map.set(normalizeLabel(folder), folder);
    }
  });
  return map;
})();

export const getDiscoveredFolders = () =>
  Array.from(discoveredFolderMap.values()).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );

export const ASSET_FOLDERS = getDiscoveredFolders();

// Bottom bar labels (matches your page options).
export const BOTTOM_BOX_OPTIONS = [
  'Chadi Thalinkana',
  'Shiv Dhol Thasha',
  'Gabra',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
];

// Bottom boxes 4–15 are placeholders (no media yet).
const EMPTY_BOTTOM_SLOTS = new Set([
  '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
]);

const folderAliases = {
  drum: 'Drums',
  drums: 'Drums',
  ammu: 'Ammu',
  chinna: 'Chinna',
  ohm: 'Ohm',
  sri: 'Sri',
  moon: 'Moon',
  sky: 'Sky',
  gabra: 'Gabra',
  guitar: 'Guitar',
  piano: 'Piano',
  violin: 'Violin',
  trumpet: 'Trumpet',
  saxophone: 'Saxophone',
  'chadi talinkana': 'Chadi Thalinkana',
  'chadi thalinkana': 'Chadi Thalinkana',
  'shiv dhol thasha': 'Shiv Dhol Thasha',
  'shiv dholthasha': 'Shiv Dhol Thasha',
  star: 'Moon',
  sun: 'Sky',
};

// Top menu letters I–Z map to folders 16–28.
const letterFolder = (letter) => {
  const code = letter.toUpperCase().charCodeAt(0);
  const iCode = 'I'.charCodeAt(0);
  if (code >= iCode && code <= 'Z'.charCodeAt(0)) {
    return String(16 + (code - iCode));
  }
  return null;
};

const resolveFolder = (folder) => {
  if (!folder || typeof folder !== 'string') return folder;

  const trimmed = folder.trim();
  const normalized = normalizeLabel(trimmed);

  if (normalized === 'all' || normalized === 'random' || normalized === 'home') {
    return 'all';
  }

  if (EMPTY_BOTTOM_SLOTS.has(trimmed)) {
    return '__empty__';
  }

  if (discoveredFolderMap.has(normalized)) {
    return discoveredFolderMap.get(normalized);
  }

  const alias = folderAliases[normalized];
  if (alias) {
    const aliasNorm = normalizeLabel(alias);
    if (discoveredFolderMap.has(aliasNorm)) {
      return discoveredFolderMap.get(aliasNorm);
    }
    return alias;
  }

  const fromLetter = letterFolder(trimmed);
  if (fromLetter && discoveredFolderMap.has(normalizeLabel(fromLetter))) {
    return discoveredFolderMap.get(normalizeLabel(fromLetter));
  }

  return trimmed;
};

export const getShuffledAllAssets = () => getAssetsForFolder('all');

export const getAssetsForFolder = (folder) => {
  const resolved = resolveFolder(folder);

  if (resolved === '__empty__') {
    return [];
  }

  if (resolved === 'all') {
    const all = allMediaAssets();
    return all.length > 0 ? shuffle(all) : [...defaultAssets];
  }

  const targetNorm = normalizeLabel(resolved);
  const filtered = allMediaAssets().filter(
    (asset) => normalizeLabel(asset.folder) === targetNorm
  );

  if (filtered.length === 0) {
    return [];
  }

  return interleaveVideosImages(filtered);
};

/** Instrument / menu names that have media in assets */
export const hasFolderMedia = (label) => getAssetsForFolder(label).length > 0;
