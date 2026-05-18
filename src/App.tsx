import { useState, lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { TicketsPage } from './components/TicketsPage/TicketsPage';

// Ленивая загрузка страницы Guide
const GuidePage = lazy(() => import('./components/GuidePage/GuidePage'));

type Page = 'tickets' | 'guide';

// Ключ для localStorage
const STORAGE_KEY = 'app_current_page';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Пытаемся получить сохранённую страницу из localStorage
    const savedPage = localStorage.getItem(STORAGE_KEY) as Page | null;
    // Если есть сохранённая страница и она валидна - используем её, иначе 'tickets'
    return savedPage && (savedPage === 'tickets' || savedPage === 'guide') 
      ? savedPage 
      : 'tickets';
  });

  // Сохраняем выбранную страницу в localStorage при её изменении
  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    localStorage.setItem(STORAGE_KEY, page);
  };

  return (
    <div className="app">
      <div className="container">
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
        
        {currentPage === 'tickets' ? (
          <TicketsPage />
        ) : (
          <Suspense fallback={<div className="loading-spinner">Загрузка памятки...</div>}>
            <GuidePage />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;