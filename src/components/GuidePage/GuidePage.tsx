import { useState } from 'react';
import styles from './GuidePage.module.css';

type SectionKey = 'general' | 'support' | 'dd';

interface Subsection {
  id: string;
  title: string;
  content: string[];
}

interface GuideSection {
  key: SectionKey;
  title: string;
  subsections: Subsection[];
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    key: 'general',
    title: '1. Общая информация для всех игроков',
    subsections: [
      {
        id: 'general-settings',
        title: '1.1 Общие настройки игры для рейдов',
        content: [
          'Отключите уведомления о достижениях',
          'Включите отображение только важных дебаффов',
          'Установите масштаб интерфейса 80%',
        ],
      },
      {
        id: 'buffs',
        title: '1.2 База по бафам',
        content: [
          'Еда: +40 к основной характеристике',
          'Флакон: соответствующий классу',
          'Масло/Настойка на оружие',
        ],
      },
      {
        id: 'minmax',
        title: '1.3 Min/Max сборка персонажа',
        content: [
          'Символы: только на основные способности',
          'Экипировка: 15% капа меткости → полный кап скорости → крит',
          'Камни: 1 красный + 2 фиолетовых под меткость',
        ],
      },
    ],
  },
  {
    key: 'support',
    title: '2. Для саппортов',
    subsections: [
      {
        id: 'support-analyzer',
        title: '2.1 Настройка Анализатора боя для саппорта',
        content: [
          'Фильтр: аптайм основных баффов (минимально 95%)',
          'Трекер: кто перебивает дебаффы',
          'Игнорировать исходящий урон',
        ],
      },
      {
        id: 'support-macros',
        title: '2.2 Полезные макросы',
        content: [
          '`/focus [@player]` – фикс фокуса',
          '`/cancelaura Вихрь` – отмена опасных эффектов',
        ],
      },
    ],
  },
  {
    key: 'dd',
    title: '3. Для ДДшек',
    subsections: [
      {
        id: 'dd-analyzer',
        title: '3.1 Анализатор боя для ДД',
        content: [
          'Вкладка «Потоки»: нет ли простоев между ГКД',
          'Вкладка «Баффы»: время простоя под геройством',
          'Вкладка «Цели»: не перебивали ли вы контроль',
        ],
      },
      {
        id: 'dd-tips',
        title: '3.2 Советы: почему персонаж не дамажит',
        content: [
          '❌ Проблема: Нет дебаффа на броню цели\n   ✅ Решение: Используйте «Разящий удар» / «Рассечение брони»',
          '❌ Проблема: Потеря ГКД из-за движения\n   ✅ Решение: Научитесь «стрельбе на бегу» или используйте инсты',
          '❌ Проблема: Не используете АП-потки в моменте силы\n   ✅ Решение: Заскриптуйте «Потка + Берс + Трюк»',
        ],
      },
    ],
  },
];

export function GuidePage() {
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(
    new Set(['general', 'support', 'dd'])
  );
  const [expandedSubsections, setExpandedSubsections] = useState<Set<string>>(
    new Set(['general-settings', 'buffs', 'minmax', 'support-analyzer', 'support-macros', 'dd-analyzer', 'dd-tips'])
  );

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
                      <ul className={styles.guideSubsection__content}>
                        {subsection.content.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
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
    </div>
  );
}

// Default export для lazy import
export default GuidePage;