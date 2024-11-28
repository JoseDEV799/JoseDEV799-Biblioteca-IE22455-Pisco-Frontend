import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from '../src/app/pages/admin/index'
import UsuariosAdmin from "./app/pages/admin/UsuariosAdmin";
import CategoriasAdmin from "./app/pages/admin/CategoriasAdmin";
import LibrosAdmin from "./app/pages/admin/LibrosAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>

          </Route>
          <Route path="/ie22455/biblioteca/admin" element={<Admin/>}>
            <Route index element={<UsuariosAdmin/>}/>
            <Route path="categorias" element={<CategoriasAdmin/>}/>
            <Route path="libros" element={<LibrosAdmin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

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