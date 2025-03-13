
// Media mock data
export const mockImages = [
  {
    id: 'img1',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    name: 'gym-interior.jpg',
    type: 'image',
    size: '1.2 MB',
    date: '2023-05-15'
  },
  {
    id: 'img2',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    name: 'trainer.jpg',
    type: 'image',
    size: '856 KB',
    date: '2023-06-22'
  },
  {
    id: 'img3',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    name: 'weights.jpg',
    type: 'image',
    size: '1.5 MB',
    date: '2023-04-10'
  },
  {
    id: 'img4',
    url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop',
    name: 'boxing.jpg',
    type: 'image',
    size: '984 KB',
    date: '2023-07-05'
  },
  {
    id: 'img5',
    url: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop',
    name: 'yoga.jpg',
    type: 'image',
    size: '1.1 MB',
    date: '2023-03-18'
  },
  {
    id: 'img6',
    url: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=2070&auto=format&fit=crop',
    name: 'swimming.jpg',
    type: 'image',
    size: '1.3 MB',
    date: '2023-08-12'
  }
];

export const mockVideos = [
  {
    id: 'vid1',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    name: 'workout-tutorial.mp4',
    type: 'video',
    size: '24.5 MB',
    date: '2023-06-10'
  },
  {
    id: 'vid2',
    url: 'https://www.youtube.com/embed/UBMk30rjy0o',
    thumbnail: 'https://img.youtube.com/vi/UBMk30rjy0o/hqdefault.jpg',
    name: 'stretching-guide.mp4',
    type: 'video',
    size: '18.2 MB',
    date: '2023-07-22'
  }
];

export type MediaItem = {
  id: string;
  url: string;
  thumbnail: string;
  name: string;
  type: string;
  size: string;
  date: string;
};
