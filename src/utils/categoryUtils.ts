
// Shared category definitions and utility functions for the shop
export interface Category {
  id: string;
  name: string;
  description: string;
  dbName: string;
  productCount?: number;
}

export const categories: Category[] = [
  {
    id: 'supplements',
    name: 'Supplements',
    description: 'Protein powders, pre-workout formulas, and nutritional supplements to enhance your fitness journey.',
    dbName: 'Supplements',
    productCount: 0
  },
  {
    id: 'equipment',
    name: 'Equipment',
    description: 'High-quality fitness equipment for strength, cardio, and flexibility training.',
    dbName: 'Equipment',
    productCount: 0
  },
  {
    id: 'apparel',
    name: 'Apparel',
    description: 'Comfortable and stylish athletic wear for optimal performance during workouts.',
    dbName: 'Apparel',
    productCount: 0
  }
];

// Find a category by ID regardless of case
export const findCategoryById = (categoryId: string) => {
  return categories.find(cat => cat.id.toLowerCase() === categoryId.toLowerCase());
};

// Convert a database category name to a URL-friendly ID
export const getCategoryId = (categoryName: string): string => {
  const categoryMap: {[key: string]: string} = {
    'Supplements': 'supplements',
    'Equipment': 'equipment',
    'Apparel': 'apparel'
  };
  
  return categoryMap[categoryName] || categoryName.toLowerCase();
};

// Get category database name from an ID
export const getCategoryDbName = (categoryId: string): string => {
  const category = findCategoryById(categoryId);
  return category ? category.dbName : categoryId;
};
