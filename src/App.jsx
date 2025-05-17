import { lazy, Suspense } from 'react';
import Header from './components/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Country = lazy(() => import('./pages/Country'));
const SearchCountry = lazy(() => import('./pages/SearchCountry'));

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<SearchCountry />} />
          <Route path="/country/:countryId" element={<Country />} /> {/*path="/country/:countryId" === to={`/country/${id}`} */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

