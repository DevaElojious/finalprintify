import React from 'react'
import Header from './Header';
import Footer from './Footer';

export const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight: "60vh"}}>
            {children}
        </main>
        <Footer/>
    </div>
  );
};

export default Layout;
