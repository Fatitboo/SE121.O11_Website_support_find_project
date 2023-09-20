import { useState } from 'react'
import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { publicRoutes, privateRoutes} from './routes/index.js'
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';


function Layout(){
  const user = false;
  const location = useLocation();
  return user ? (<Outlet />): (<Navigate to='user-auth' state={{from: location}} replace />);
}

function App() {
  return (
    <main>
      <Navbar/>
      <Routes>
        <Route element={<Layout/>}>
          
          {privateRoutes.map((route,index)=>{
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page/>} />
        })} 
        </Route>
          {publicRoutes.map((route,index)=>{
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page/>} />
        })} 
         
      </Routes>
      <Footer/>
    </main>
  );
}

export default App
