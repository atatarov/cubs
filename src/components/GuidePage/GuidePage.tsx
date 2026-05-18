import { useState } from 'react';
import styles from './GuidePage.module.css';
import type { SectionKey, GuideSection } from './types';
import { generalSection } from './sections/generalSection';
import { supportSection } from './sections/supportSection';
import { ddSection } from './sections/ddSection';
import { ImageModal } from '../ImageModal/ImageModal';

const GUIDE_SECTIONS: GuideSection[] = [
  generalSection,
  supportSection,
  ddSection,
];

const ALL_SUBSECTION_IDS = [
  'general-settings', 'buffs', 'minmax',
  'support-analyzer', 'support-analyzer-example',
  'dd-analyzer', 'dd-tips'
];

export function GuidePage() {
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(
    new Set(['general', 'support', 'dd'])
  );
  const [expandedSubsections, setExpandedSubsections] = useState<Set<string>>(
    new Set(ALL_SUBSECTION_IDS)
  );
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const toggleSection = (sectionKey: SectionKey) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  const toggleSubsection = (subsectionId: string) => {
    setExpandedSubsections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subsectionId)) {
        newSet.delete(subsectionId);
      } else {
        newSet.add(subsectionId);
      }
      return newSet;
    });
  };

  const openImageModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  return (
    <div className={styles.guidePage}>
      <div className={styles.guideHeader}>
        <h1 className={styles.guideHeader__title}>📜 Памятка по игре</h1>
        <p className={styles.guideHeader__subtitle}>
          Нажмите на любой заголовок, чтобы развернуть или свернуть информацию
        </p>
      </div>

      <div className={styles.guideSections}>
        {GUIDE_SECTIONS.map((section) => (
          <div key={section.key} className={styles.guideSection}>
            <button
              className={styles.guideSection__header}
              onClick={() => toggleSection(section.key)}
            >
              <span className={styles.guideSection__toggle}>
                {expandedSections.has(section.key) ? '▼' : '▶'}
              </span>
              <span className={styles.guideSection__title}>{section.title}</span>
            </button>

            {expandedSections.has(section.key) && (
              <div className={styles.guideSection__content}>
                {section.subsections.map((subsection) => (
                  <div key={subsection.id} className={styles.guideSubsection}>
                    <button
                      className={styles.guideSubsection__header}
                      onClick={() => toggleSubsection(subsection.id)}
                    >
                      <span className={styles.guideSubsection__toggle}>
                        {expandedSubsections.has(subsection.id) ? '▼' : '▶'}
                      </span>
                      <span className={styles.guideSubsection__title}>
                        {subsection.title}
                      </span>
                    </button>

                    {expandedSubsections.has(subsection.id) && (
                      <div className={styles.guideSubsection__content}>
                        {subsection.image && (
                          <div 
                            className={styles.guideImageContainer}
                            onClick={() => openImageModal(subsection.image!.src, subsection.image!.alt)}
                          >
                            <img
                              src={subsection.image.src}
                              alt={subsection.image.alt}
                              className={styles.guideImage}
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                console.error(`Не удалось загрузить изображение: ${subsection.image?.src}`);
                              }}
                            />
                            <div className={styles.guideImageZoom}>
                              🔍 Нажмите для увеличения
                            </div>
                            {subsection.image.caption && (
                              <p className={styles.guideImageCaption}>
                                {subsection.image.caption}
                              </p>
                            )}
                          </div>
                        )}
                        <ul className={styles.guideSubsection__list}>
                          {subsection.content.map((item, index) => {
                            const lines = item.split('\n');
                            return lines.map((line, lineIndex) => (
                              <li key={`${index}-${lineIndex}`}>
                                {line}
                              </li>
                            ));
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.guideTip}>
        <strong>💡 Совет:</strong> Используйте эту памятку при подготовке к рейдам.
        Все настройки и советы проверены опытными игроками.
      </div>

      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={closeImageModal}
        />
      )}
    </div>
  );
}

export default GuidePage;