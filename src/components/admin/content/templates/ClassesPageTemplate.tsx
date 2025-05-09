
import { SectionType } from '../ContentSectionTypes';
import { PageSection } from '../PageStructureEditor';
import { v4 as uuidv4 } from 'uuid';

// Generate a template for the Classes page
export const getClassesPageTemplate = (): PageSection[] => {
  return [
    {
      id: uuidv4(),
      type: SectionType.EDITABLE,
      title: 'Hero Section',
      description: 'Main banner for the Classes page',
      isRequired: true,
      content: {
        title: 'Explore Our Weekly Fitness Classes',
        subtitle: 'Find the perfect class to match your fitness goals',
        backgroundImage: '/images/defaults/classes-hero.jpg',
        buttonText: 'View Schedule',
        buttonLink: '#schedule'
      }
    },
    {
      id: uuidv4(),
      type: SectionType.DYNAMIC,
      title: 'Class Schedule',
      description: 'Automatically fetched from the admin panel',
      isRequired: true,
      dynamicDataSource: 'classes'
    },
    {
      id: uuidv4(),
      type: SectionType.EDITABLE,
      title: 'Class Categories',
      description: 'Different types of classes offered',
      content: {
        title: 'Class Categories',
        categories: [
          { name: 'Cardio', description: 'High intensity workouts to improve cardiovascular health' },
          { name: 'Strength', description: 'Build muscle and increase strength' },
          { name: 'Mind & Body', description: 'Improve flexibility, balance and mental well-being' }
        ]
      }
    },
    {
      id: uuidv4(),
      type: SectionType.OPTIONAL,
      title: 'Trainer Spotlight',
      description: 'Featured trainers',
      isHidden: false,
      content: {
        title: 'Meet Our Expert Trainers',
        description: 'Our certified trainers are committed to helping you achieve your fitness goals'
      }
    },
    {
      id: uuidv4(),
      type: SectionType.EDITABLE,
      title: 'Call to Action',
      description: 'Encourage visitors to book a class',
      isRequired: true,
      content: {
        title: 'Ready to Start Your Fitness Journey?',
        description: 'Join a class today and experience the Uptown Gym difference',
        buttonText: 'Book a Trial Class',
        buttonLink: '/sign-up'
      }
    }
  ];
};
