export type SectionKey = 'general' | 'support' | 'dd';

export interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
  size?: 'small' | 'large';  // добавляем размер
}

export interface Subsection {
  id: string;
  title: string;
  content: string[];
  image?: ImageItem;
  images?: ImageItem[];
}

export interface GuideSection {
  key: SectionKey;
  title: string;
  subsections: Subsection[];
}