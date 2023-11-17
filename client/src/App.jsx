import { useState } from 'react'
import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes/index.js'
import { useSelector } from 'react-redux';



function Layout({user}) {
  
  
  const location = useLocation();
  return user ? (<Outlet />) : (<Navigate to='/user-auth/login' state={{ from: location }} replace />);
}

function App() {
  const storeData = useSelector(store => store.users)
  
  const user = storeData?.userAuth?.user
  
  
  return (
    <main>
      <Routes>
        <Route element={<Layout user={user}/>}>
          {privateRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component
            return (
              <Route key={index}
                path={route.path}
                element={
                  <Layout >
                    <Page />
                  </Layout>
                } />
            )
          })}
        </Route>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout;
          const Page = route.component
          return (
            <Route key={index}
              path={route.path}
              element={
                <Layout user={user}>
                  <Page />
                </Layout>} 
            />
          )
        })}
      </Routes>
    </main>
  );
}

export default App
