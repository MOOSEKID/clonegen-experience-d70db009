
export interface SectionTemplate {
  id: string;
  name: string;
  description: string;
}

export interface PageContent {
  [pageId: string]: ContentElement[];
}

export interface PageSections {
  [pageId: string]: SectionTemplate[];
}

export interface ContentElement {
  id: string;
  type: string;
  content: string;
  properties: ElementProperties;
  alt?: string;
  link?: string;
  videoUrl?: string;
}

export interface ElementProperties {
  align: string;
  size: string;
  style: string;
  color: string;
  padding: string;
  margin?: number;
  borderRadius?: string;
  videoUrl?: string;
  [key: string]: any; // Allow additional properties
}

// Define a type for page content mapping
export interface PageContentMapping {
  [pageId: string]: ContentElement[];
}

// Define a type for section templates mapping
export interface SectionTemplateMapping {
  [pageId: string]: SectionTemplate[];
}
