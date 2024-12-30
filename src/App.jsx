import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from '../src/app/pages/admin/index'
import UsuariosAdmin from "./app/pages/admin/UsuariosAdmin";
import CategoriasAdmin from "./app/pages/admin/CategoriasAdmin";
import LibrosAdmin from "./app/pages/admin/LibrosAdmin";
import AutoresAdmin from "./app/pages/admin/AutoresAdmin";
import LoginPage from "./app/pages/client/LoginClient";
import Cliente from "./app/pages/client";
import PrincipalClient from "./app/pages/client/PrincipalClient";
import ReadBook from "./app/pages/client/ReadBook"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cliente/>}>
              <Route index element={<PrincipalClient/>}/>
              <Route path=":titulo/leer" element={<ReadBook/>}/>
              <Route />
              <Route path="login" element={<LoginPage/>}/>
          </Route>
          <Route path="/ie22455/biblioteca/admin" element={<Admin/>}>
            <Route index element={<UsuariosAdmin/>}/>
            <Route path="categorias" element={<CategoriasAdmin/>}/>
            <Route path="libros" element={<LibrosAdmin/>}/>
            <Route path="autores" element={<AutoresAdmin/>}/>
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