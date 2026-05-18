export type SectionKey = 'general' | 'support' | 'dd';

export interface Subsection {
  id: string;
  title: string;
  content: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface GuideSection {
  key: SectionKey;
  title: string;
  subsections: Subsection[];
}