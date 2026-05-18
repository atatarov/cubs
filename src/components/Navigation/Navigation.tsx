import styles from './Navigation.module.css';

type Page = 'tickets' | 'guide';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__logo}>
        🐈 Чайкошка
      </div>
      <div className={styles.navigation__links}>

        <button
          className={`${styles.navLink} ${currentPage === 'guide' ? styles['navLink--active'] : ''}`}
          onClick={() => onPageChange('guide')}
        >
          📖 Памятка игрока
        </button>
        <button
          className={`${styles.navLink} ${currentPage === 'tickets' ? styles['navLink--active'] : ''}`}
          onClick={() => onPageChange('tickets')}
        >
          🎫 Билеты в Куб Эйва
        </button>
      </div>
    </nav>
  );
}