import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/components/Layout";
import Principal from "./app/pages/client/Principal";
import Index from "./app/pages/client/Index";
import FilterCategory from './app/pages/client/FilterCategory';
import { AuthProvider } from "./app/context/AuthContext";
import { CategoryProvider } from "./app/context/CategoryContext";
import { BooksProvider } from "./app/context/BooksContext";
import ReadBook from "./app/pages/client/ReadBook";

function App() {
  return (
    <>
      <AuthProvider>
        <BooksProvider>
          <CategoryProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/principal" element={<Principal />}>
                    <Route index element={<Index/>}/>
                    <Route path='filter-category' element={<FilterCategory/>} />
                  </Route>
                  <Route path='/read-book' element={<ReadBook/>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CategoryProvider>
        </BooksProvider>
      </AuthProvider>

      {/* <BooksProvider>
        <CategoryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/principal" element={<Principal />}>
                  <Route index element={<Index />} />
                  <Route path='filter-category' element={<FilterCategory />} />
                </Route>
                <Route path='/read-book' element={<ReadBook />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CategoryProvider>
      </BooksProvider> */}

    </>
  )
}

export default App