
import { v4 as uuidv4 } from 'uuid';
import { pageContentData } from './cmsData';

// Function to create a text element
const createTextElement = (content: string, align: string = 'left') => ({
  id: `text-${uuidv4()}`,
  type: 'text',
  content,
  properties: {
    align,
    size: 'medium',
    style: 'normal',
    color: '#000000',
    padding: 'medium',
    responsiveSettings: {
      desktop: { fontSize: 'medium', columns: 3, visible: true },
      tablet: { fontSize: 'medium', columns: 2, visible: true },
      mobile: { fontSize: 'small', columns: 1, visible: true }
    }
  }
});

// Function to create an image element
const createImageElement = (imageUrl: string, alt: string = '') => ({
  id: `image-${uuidv4()}`,
  type: 'image',
  content: imageUrl,
  alt,
  properties: {
    align: 'center',
    padding: 'medium',
    responsiveSettings: {
      desktop: { columns: 3, visible: true },
      tablet: { columns: 2, visible: true },
      mobile: { columns: 1, visible: true }
    }
  }
});

// Function to create a button element
const createButtonElement = (text: string, link: string = '#') => ({
  id: `button-${uuidv4()}`,
  type: 'button',
  content: text,
  link,
  properties: {
    align: 'center',
    padding: 'medium',
    responsiveSettings: {
      desktop: { fontSize: 'medium', visible: true },
      tablet: { fontSize: 'medium', visible: true },
      mobile: { fontSize: 'small', visible: true }
    }
  }
});

// Define default components for each page type
export const pages = {
  'home': [
    createTextElement('Welcome to Uptown Gym', 'center'),
    createImageElement('/images/gym-hero.jpg', 'Uptown Gym Facilities'),
    createTextElement('Join our premium fitness center and experience the ultimate workout environment with state-of-the-art equipment and expert trainers.'),
    createButtonElement('Join Now', '/membership'),
  ],
  'membership': [
    createTextElement('Membership Plans', 'center'),
    createTextElement('Choose the perfect membership plan for your fitness journey. We offer flexible options to suit your needs.'),
    createImageElement('/images/membership-plans.jpg', 'Membership Options'),
    createButtonElement('Sign Up Today', '/signup'),
  ],
  'classes': [
    createTextElement('Our Fitness Classes', 'center'),
    createTextElement('Discover our wide range of fitness classes led by expert instructors. From high-intensity workouts to calming yoga sessions, we have something for everyone.'),
    createImageElement('/images/classes.jpg', 'Fitness Classes'),
    createButtonElement('View Schedule', '/schedule'),
  ],
  'blogs': [
    createTextElement('Fitness Blog', 'center'),
    createTextElement('Stay updated with the latest fitness tips, nutrition advice, and wellness insights from our expert team.'),
    createImageElement('/images/blog.jpg', 'Fitness Blog'),
    createButtonElement('Read More', '/blogs/latest'),
  ],
  'shop': [
    createTextElement('Gym Shop', 'center'),
    createTextElement('Browse our collection of fitness gear, supplements, and Uptown Gym merchandise.'),
    createImageElement('/images/shop-items.jpg', 'Gym Shop Products'),
    createButtonElement('Shop Now', '/shop/products'),
  ],
  'personal-training': [
    createTextElement('Personal Training', 'center'),
    createTextElement('Get personalized training sessions with our certified trainers. Achieve your fitness goals faster with dedicated one-on-one guidance.'),
    createImageElement('/images/personal-training.jpg', 'Personal Training'),
    createButtonElement('Book a Session', '/book-trainer'),
  ],
  'nutrition': [
    createTextElement('Nutrition Services', 'center'),
    createTextElement('Consult with our nutrition experts to develop a personalized meal plan that complements your fitness routine.'),
    createImageElement('/images/nutrition.jpg', 'Nutrition Services'),
    createButtonElement('Schedule Consultation', '/nutrition/consult'),
  ],
  'about-us': [
    createTextElement('About Uptown Gym', 'center'),
    createTextElement('Learn about our journey, mission, and commitment to helping you achieve your fitness goals.'),
    createImageElement('/images/gym-interior.jpg', 'Uptown Gym Interior'),
    createTextElement('Founded in 2010, Uptown Gym has been dedicated to providing a premium fitness experience with a focus on community and results.'),
  ],
  'contact-us': [
    createTextElement('Contact Us', 'center'),
    createTextElement('Get in touch with our team for any inquiries about membership, classes, or facilities.'),
    createTextElement('Email: info@uptowngym.com\nPhone: (123) 456-7890\nAddress: 123 Fitness Street, Gymtown'),
    createButtonElement('Send Message', '/contact-form'),
  ],
  'careers': [
    createTextElement('Join Our Team', 'center'),
    createTextElement('Explore career opportunities at Uptown Gym. We\'re always looking for passionate individuals to join our growing team.'),
    createImageElement('/images/team.jpg', 'Uptown Gym Team'),
    createButtonElement('View Open Positions', '/careers/openings'),
  ],
};

// For pages without specific defaults, create a basic template
const createBasicTemplate = (title: string) => [
  createTextElement(title, 'center'),
  createTextElement('This page is under construction. Check back soon for updates.'),
  createButtonElement('Return to Home', '/'),
];

// Ensure all pages have at least a basic template
Object.keys(pageContentData).forEach(pageId => {
  if (!pages[pageId]) {
    const pageTitle = pageId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    pages[pageId] = createBasicTemplate(pageTitle);
  }
});
