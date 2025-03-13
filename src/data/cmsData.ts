
// Mock data for the CMS pages
// This would typically be fetched from an API or database

export const pageContentData = {
  'home': [
    {
      id: 'text-1',
      type: 'text',
      content: 'Welcome to Uptown Gym',
      properties: {
        align: 'center',
        size: '3xlarge',
        style: 'bold',
        color: '#333333',
        padding: 'large',
      }
    },
    {
      id: 'text-2',
      type: 'text',
      content: 'Your Fitness Journey Starts Here',
      properties: {
        align: 'center',
        size: 'xlarge',
        style: 'normal',
        color: '#666666',
        padding: 'small',
      }
    },
    {
      id: 'image-1',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      alt: 'Modern gym interior with equipment',
      properties: {
        align: 'center',
        padding: 'medium',
      }
    },
    {
      id: 'text-3',
      type: 'text',
      content: 'Join our community of fitness enthusiasts and transform your life with state-of-the-art facilities, expert trainers, and a supportive environment.',
      properties: {
        align: 'center',
        size: 'medium',
        style: 'normal',
        color: '#555555',
        padding: 'medium',
      }
    },
    {
      id: 'button-1',
      type: 'button',
      content: 'Join Now',
      link: '/membership',
      properties: {
        align: 'center',
        padding: 'medium',
      }
    }
  ],
  'about-us': [
    {
      id: 'text-1',
      type: 'text',
      content: 'About Uptown Gym',
      properties: {
        align: 'left',
        size: '3xlarge',
        style: 'bold',
        color: '#333333',
        padding: 'large',
      }
    },
    {
      id: 'text-2',
      type: 'text',
      content: 'Founded in 2015, Uptown Gym is committed to providing the best fitness experience for all members.',
      properties: {
        align: 'left',
        size: 'large',
        style: 'normal',
        color: '#555555',
        padding: 'medium',
      }
    },
    {
      id: 'image-1',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
      alt: 'Gym trainer helping a client',
      properties: {
        align: 'center',
        padding: 'medium',
      }
    }
  ],
  'classes': [
    {
      id: 'text-1',
      type: 'text',
      content: 'Our Fitness Classes',
      properties: {
        align: 'center',
        size: '3xlarge',
        style: 'bold',
        color: '#333333',
        padding: 'large',
      }
    },
    {
      id: 'text-2',
      type: 'text',
      content: 'Find the perfect class to match your fitness goals',
      properties: {
        align: 'center',
        size: 'large',
        style: 'normal',
        color: '#555555',
        padding: 'small',
      }
    },
    {
      id: 'image-1',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
      alt: 'Weights training class',
      properties: {
        align: 'center',
        padding: 'medium',
      }
    }
  ],
  'membership': [
    {
      id: 'text-1',
      type: 'text',
      content: 'Membership Plans',
      properties: {
        align: 'center',
        size: '3xlarge',
        style: 'bold',
        color: '#333333',
        padding: 'large',
      }
    },
    {
      id: 'text-2',
      type: 'text',
      content: 'Choose the perfect plan for your fitness journey',
      properties: {
        align: 'center',
        size: 'large',
        style: 'normal',
        color: '#555555',
        padding: 'small',
      }
    }
  ],
  'services': [
    {
      id: 'text-1',
      type: 'text',
      content: 'Our Services',
      properties: {
        align: 'center',
        size: '3xlarge',
        style: 'bold',
        color: '#333333',
        padding: 'large',
      }
    }
  ],
  'contact-us': [
    {
      id: 'text-1',
      type: 'text',
      content: 'Contact Us',
      properties: {
        align: 'center',
        size: '3xlarge',
        style: 'bold',
        color: '#333333',
        padding: 'large',
      }
    }
  ],
  'shop': [
    {
      id: 'text-1',
      type: 'text',
      content: 'Shop',
      properties: {
        align: 'center',
        size: '3xlarge',
        style: 'bold',
        color: '#333333',
        padding: 'large',
      }
    }
  ]
};

// SEO settings for each page
export const seoSettings = {
  'home': {
    title: 'Uptown Gym - Your Fitness Partner',
    description: 'Uptown Gym offers premium fitness facilities and expert trainers to help you achieve your fitness goals.',
    keywords: 'gym, fitness, workout, health, wellness, training'
  },
  'about-us': {
    title: 'About Us - Uptown Gym',
    description: 'Learn about Uptown Gym\'s mission, values, and commitment to helping you achieve your fitness goals.',
    keywords: 'gym history, fitness center, about gym, uptown gym'
  },
  'classes': {
    title: 'Fitness Classes - Uptown Gym',
    description: 'Explore our variety of fitness classes led by expert trainers at Uptown Gym.',
    keywords: 'fitness classes, gym classes, yoga, HIIT, pilates, spinning'
  },
  'membership': {
    title: 'Membership Plans - Uptown Gym',
    description: 'Choose from our flexible membership options designed to fit your lifestyle and budget at Uptown Gym.',
    keywords: 'gym membership, fitness plans, gym pricing, membership options'
  },
  'services': {
    title: 'Our Services - Uptown Gym',
    description: 'Discover the comprehensive fitness services we offer at Uptown Gym.',
    keywords: 'gym services, personal training, fitness assessment, nutrition'
  },
  'contact-us': {
    title: 'Contact Us - Uptown Gym',
    description: 'Get in touch with our team at Uptown Gym. We\'re here to help with your fitness journey.',
    keywords: 'contact gym, gym location, fitness center contact, gym hours'
  },
  'shop': {
    title: 'Shop - Uptown Gym',
    description: 'Browse our selection of fitness gear, supplements, and Uptown Gym merchandise.',
    keywords: 'gym shop, fitness equipment, supplements, gym gear, workout clothes'
  }
};

// Version history for content changes
export const versionHistory = [
  {
    id: 1,
    page: 'home',
    timestamp: '2023-10-15T14:30:00Z',
    user: 'admin',
    description: 'Initial home page setup'
  },
  {
    id: 2,
    page: 'about-us',
    timestamp: '2023-10-16T10:15:00Z',
    user: 'admin',
    description: 'Updated about page content'
  },
  {
    id: 3,
    page: 'home',
    timestamp: '2023-11-02T09:45:00Z',
    user: 'admin',
    description: 'Updated hero image and text'
  }
];
