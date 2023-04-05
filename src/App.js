import logo from './logo.svg';
import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
const BasicTable = lazy(() => import('./BasicTable'));

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basic-table" element={<BasicTable />} />
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
        <ul className="list-disc">
          <Link className="text-base" to="/basic-table">
            Basic Table
          </Link>
        </ul>
      </header>
    </div>
  );
}

export default App;
