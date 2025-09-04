import React from "react";
import HeroSection from "../../components/HeroSection";
import About from "../../components/About";
import AboutSection from "../../components/AboutSection";
import PortfolioSection from "../../components/PortfolioSection";
import Footer from "../../components/Footer";



export const Homepage: React.FC = () => {
    return (
    <div className="min-h-screen bg-white overflow-hidden">
        <HeroSection />
        <About />
        <AboutSection />
        <PortfolioSection />
    </div>
    );
}