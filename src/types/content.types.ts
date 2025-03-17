
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
}

export interface ElementProperties {
  align: string;
  size: string;
  style: string;
  color: string;
  padding: string;
  [key: string]: any;
}
