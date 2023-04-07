import logo from './logo.svg';
import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
const BasicTable = lazy(() => import('./BasicTable'));
const SortingTable = lazy(() => import('./SortingTable'));
const FormatingTable = lazy(() => import('./FormatingTable'));
const GlobalFilterTable = lazy(() => import('./GlobalFilterTable'));
const GlobalFilterColumnFilterTable = lazy(() => import('./GlobalFilterColumnFilterTable'));
const PaginationTable = lazy(() => import('./PaginationTable'));
const RowSelectTable = lazy(() => import('./RowSelectTable'));
const OrderVisibilityTable = lazy(() => import('./OrderVisibilityTable'));
const PaginationSortingGlobalFilterControlledTable = lazy(() =>
  import('./PaginationSortingGlobalFilterControlledTable')
);

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basic-table" element={<BasicTable />} />
          <Route path="/sorting-table" element={<SortingTable />} />
          <Route path="/formating-table" element={<FormatingTable />} />
          <Route path="/global-filter-table" element={<GlobalFilterTable />} />
          <Route path="/global-filter-column-filter-table" element={<GlobalFilterColumnFilterTable />} />
          <Route path="/pagination-table" element={<PaginationTable />} />
          <Route path="/row-select-table" element={<RowSelectTable />} />
          <Route path="/order-visibility-table" element={<OrderVisibilityTable />} />
          <Route
            path="/pagination-sorting-global-filter-controlled"
            element={<PaginationSortingGlobalFilterControlledTable />}
          />
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
          <Link className="text-base" to="/formating-table">
            Formating Table
          </Link>
          <Link className="text-base" to="/global-filter-table">
            Global Filter Table
          </Link>
          <Link className="text-base" to="/global-filter-column-filter-table">
            Global Filter & Column Filter Table
          </Link>
          <Link className="text-base" to="/pagination-table">
            Pagination Table
          </Link>
          <Link className="text-base" to="/row-select-table">
            Row Select Table
          </Link>
          <Link className="text-base" to="/order-visibility-table">
            Order & Visibility Table
          </Link>
          <Link className="text-base" to="/pagination-sorting-global-filter-controlled">
            Pagination Sorting Global Filter Controlled Table
          </Link>
        </ul>
      </header>
    </div>
  );
}

export default App;
