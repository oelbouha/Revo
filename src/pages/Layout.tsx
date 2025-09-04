
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


export const Layout = () => {
    return (
        <div className="h-screen ">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}