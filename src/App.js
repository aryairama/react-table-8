import logo from './logo.svg';
import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
const BasicTable = lazy(() => import('./BasicTable'));
const SortingTable = lazy(() => import('./SortingTable'));

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basic-table" element={<BasicTable />} />
          <Route path="/sorting-table" element={<SortingTable />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

function Home() {
  return (
    <div className="App">
      <header className="App-header !justify-start">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Example Table Tanstack</p>
        <ul className="list-disc flex flex-col w-full">
          <Link className="text-base" to="/basic-table">
            Basic Table
          </Link>
          <Link className="text-base" to="/sorting-table">
            Sorting Table
          </Link>
        </ul>
      </header>
    </div>
  );
}

export default App;
