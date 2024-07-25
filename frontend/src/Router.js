import React from "react";

import PrivateRoute from "./components/Global/helpers/PrivateRoute";

import { HashRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/login";

import Users from "./pages/Users/Home";

//configuracion
import Forms from "./pages/Configuracion/Forms/Home";
import Tables from "./pages/Configuracion/Tables/Home";
import Catalogos from "./components/Catalogos/Home";

import Page404 from "./pages/Page404";
import Page403 from "./pages/Page403";


//Modelo del Negocio  
import Proveedores from "./pages/Proveedores/Proveedores";
import Busqueda from "./pages/Busqueda/Busqueda";
import Distribuidor from "./pages/Distribuidor/Distribuidor";
import Ficha from "./pages/Distribuidor/Ficha";



import { Spin } from "antd";
import Layout from "./components/Layout/Layout";

const loading = () => (
  <div className="animated fadeIn pt-1 text-center">
    {" "}
    <Spin /> Cargando...
  </div>
);

const Router = () => {
  return (
    // <ReactKeycloakProvider authClient={keycloak}>
    <HashRouter>
      <React.Suspense fallback={loading()}>
      <Routes>
          <Route path="Dashboard/Dashboard" element={<PrivateRoute> <Layout> <Dashboard /> </Layout> </PrivateRoute>} />
          <Route path="/" element={<Layout><Login /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
        
          <Route path="Configuracion/Forms" element={<PrivateRoute><Layout><Forms /></Layout></PrivateRoute>} />
          <Route path="Configuracion/Tables" element={<PrivateRoute><Layout><Tables /></Layout> </PrivateRoute>} />
          <Route path="Configuracion/Catalogos" element={<PrivateRoute><Layout><Catalogos /></Layout> </PrivateRoute>} />
          <Route path="Configuracion/Users" element={<PrivateRoute><Layout><Users /></Layout></PrivateRoute>} />

          {/* Modelo del Negocio   */}
          <Route path="Modelo/Proveedores" element={<PrivateRoute><Layout><Proveedores /></Layout></PrivateRoute>} />
          <Route path="Modelo/Busqueda" element={<PrivateRoute><Layout><Busqueda /></Layout></PrivateRoute>} />
          <Route path="Modelo/Distribuidor" element={<PrivateRoute><Layout><Distribuidor /></Layout></PrivateRoute>} />

          <Route path="Modelo/Ficha/:id" element={<PrivateRoute><Ficha /></PrivateRoute>} />

          <Route path="/Page403" element={<PrivateRoute><Page403 /> </PrivateRoute>} />
          <Route path="/Page404" element={<PrivateRoute><Layout><Page404 /></Layout> </PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><Layout><Dashboard /></Layout> </PrivateRoute>} />
        </Routes>
      </React.Suspense>
    </HashRouter>
    // </ReactKeycloakProvider>
  );
};

export default Router;
