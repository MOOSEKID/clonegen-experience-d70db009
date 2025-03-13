
// This file maps CMS content sections to actual website components
import { pageContentData } from '@/data/cmsData';

// Maps content section IDs to website section names
export const componentSectionMap = {
  'home': [
    { id: 'hero', name: 'Hero Section', description: 'Main landing banner' },
    { id: 'features', name: 'Features Section', description: 'Gym features and highlights' },
    { id: 'trainers', name: 'Trainers Section', description: 'Featured gym trainers' },
    { id: 'classes', name: 'Classes Section', description: 'Featured fitness classes' },
    { id: 'testimonials', name: 'Testimonials', description: 'Customer testimonials' },
    { id: 'membership', name: 'Membership Section', description: 'Membership pricing plans' },
  ],
  'about-us': [
    { id: 'about-header', name: 'About Header', description: 'About page header' },
    { id: 'about-mission', name: 'Our Mission', description: 'Company mission statement' },
    { id: 'about-team', name: 'Our Team', description: 'Team members and leadership' },
  ],
  'classes': [
    { id: 'classes-header', name: 'Classes Header', description: 'Classes page header' },
    { id: 'classes-list', name: 'Classes List', description: 'List of available classes' },
  ],
  'membership': [
    { id: 'membership-header', name: 'Membership Header', description: 'Membership page header' },
    { id: 'pricing-tables', name: 'Pricing Tables', description: 'Membership pricing plans' },
  ],
  'services': [
    { id: 'services-header', name: 'Services Header', description: 'Services page header' },
    { id: 'services-list', name: 'Services List', description: 'List of available services' },
  ],
  'contact-us': [
    { id: 'contact-header', name: 'Contact Header', description: 'Contact page header' },
    { id: 'contact-form', name: 'Contact Form', description: 'Contact form and information' },
  ],
  'shop': [
    { id: 'shop-header', name: 'Shop Header', description: 'Shop page header' },
    { id: 'shop-products', name: 'Shop Products', description: 'Product listings' },
  ],
};

// Returns preview data for a section
export const getSectionPreviewData = (pageId: string, sectionId: string) => {
  const pageContent = pageContentData[pageId] || [];
  // Find content elements for this section (this would come from a database in a real app)
  // For now just return the page content as a demonstration
  return pageContent;
};

// This would be used to update actual website components with CMS content
export const applyContentToWebsite = (pageId: string, content: any[]) => {
  // In a real application, this would update the website's components or database
  console.log(`Applying content to ${pageId}:`, content);
  // Here you would implement logic to update components or save to database
};
