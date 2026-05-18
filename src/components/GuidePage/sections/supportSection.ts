import type { GuideSection } from '../types';

export const supportSection: GuideSection = {
  key: 'support',
  title: '2. Для саппортов',
  subsections: [
    {
      id: 'support-analyzer',
      title: '2.1 Настройка Анализатора боя для саппорта',
      content: [
        'Эффективность увеличения силы атаки показывает сколько процентов урона было нанесено под красным бафом саппорта',
        'Эффективность увеличения урона I - сколько было нанесено урона под желтым бафом (зетка)',
        '',
        'Минимум нужно держать 80 - 80 - 50, все что ниже считается плохо',
        '',
      ],
      image: {
        src: './images/analizator-sup-settings.jpg',
        alt: 'Настройки анализатора боя для саппорта',
        caption: 'Настройки фильтров анализатора боя',
      },
    },
    {
      id: 'support-analyzer-example',
      title: 'Пример настроенного анализатора боя',
      content: [],
      image: {
        src: './images/sup-analizator.jpg',
        alt: 'Пример работы анализатора боя',
        caption: 'Анализатор боя с настроенными фильтрами',
      },
    },
  ],
};