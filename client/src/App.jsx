import { useState } from 'react'
import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes/index.js'



function Layout() {
  const user = true;

  const location = useLocation();
  return user ? (<Outlet />) : (<Navigate to='user-auth' state={{ from: location }} replace />);
}

function App() {
  return (
    <main>
      <Routes>
        <Route element={<Layout />}>

          {privateRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component
            return (<Route key={index}
              path={route.path}
              element={
                <Layout >
                  <Page />
                </Layout>
              } />)
          })}
        </Route>
        {publicRoutes.map((route, index) => {

          const Layout = route.layout;
          const Page = route.component
          return (<Route key={index}
            path={route.path}
            element={
              <Layout >
                <Page />
              </Layout>
            } />)
        })}

      </Routes>
      
    </main>
  );
}

export default App
