
import { SectionType } from '../ContentSectionTypes';
import { PageSection } from '../PageStructureEditor';
import { v4 as uuidv4 } from 'uuid';

// Generate a template for the Membership page
export const getMembershipPageTemplate = (): PageSection[] => {
  return [
    {
      id: uuidv4(),
      type: SectionType.EDITABLE,
      title: 'Hero Section',
      description: 'Main banner for the Membership page',
      isRequired: true,
      content: {
        title: 'Find Your Perfect Membership Plan',
        subtitle: 'Join our community and transform your fitness journey',
        backgroundImage: '/images/defaults/membership-hero.jpg',
        buttonText: 'Join Now',
        buttonLink: '#plans'
      }
    },
    {
      id: uuidv4(),
      type: SectionType.DYNAMIC,
      title: 'Membership Plans',
      description: 'Automatically fetched from subscriptions database',
      isRequired: true,
      dynamicDataSource: 'subscription_plans'
    },
    {
      id: uuidv4(),
      type: SectionType.EDITABLE,
      title: 'Member Benefits',
      description: 'List of benefits for members',
      content: {
        title: 'Member Benefits',
        benefits: [
          'Access to all gym equipment',
          'Free fitness assessment',
          'Discounts on personal training',
          'Access to online workout videos'
        ]
      }
    },
    {
      id: uuidv4(),
      type: SectionType.OPTIONAL,
      title: 'FAQ Section',
      description: 'Frequently asked questions about membership',
      content: {
        title: 'Frequently Asked Questions',
        faqs: [
          {
            question: 'How do I cancel my membership?',
            answer: 'You can cancel your membership through your online account or by visiting the front desk.'
          },
          {
            question: 'Do you offer student discounts?',
            answer: 'Yes, we offer special rates for students with valid ID.'
          }
        ]
      }
    },
    {
      id: uuidv4(),
      type: SectionType.EDITABLE,
      title: 'Testimonials',
      description: 'Member reviews and feedback',
      isHidden: false,
      content: {
        title: 'What Our Members Say',
        testimonials: [
          {
            quote: 'Joining Uptown Gym was the best decision I made this year!',
            author: 'Sarah M.'
          },
          {
            quote: 'The facilities are top-notch and the staff is incredibly helpful.',
            author: 'John D.'
          }
        ]
      }
    }
  ];
};
