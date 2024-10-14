import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../component/public/Header';
import Footer from '../../component/public/Footer'
// import './layout.css';

const Layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
