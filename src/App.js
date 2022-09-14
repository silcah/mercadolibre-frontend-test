import * as React from "react";
import "./assets/styles/index.scss";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Search from "./components/search/search";
import ResultSearch from "./pages/result-search/result-search";
import DetailPage from "./pages/detail-page/detail-page";
import { QueryProvider } from "./utils/query-provider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <Search />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<ResultSearch />} />
            <Route path="/items" element={<ResultSearch />} />
            <Route path="/items/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </QueryProvider>
    </div>
  );
}

export default App;
