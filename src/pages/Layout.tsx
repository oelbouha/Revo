
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { images } from "../components/HeroSection";

export const Layout = () => {

      const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = images.flatMap(item => [
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = item.image;
            img.onload = resolve;
            img.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = item.mobileImage;
            img.onload = resolve;
            img.onerror = reject;
          })
        ]);

        await Promise.all(imagePromises);
         setTimeout(() => {
          setIsLoading(false);
        }, 200); 
      } catch (error) {
        console.error('Error preloading images:', error);
        
          setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 top-0 left-0 bg-black  flex items-center justify-center z-[5000]">
        <div className="animate-pulse">
          <img 
            src="/Group 7.svg" 
            alt="Loading Logo" 
            className="w-48  md:w-[20rem] "
          />
        </div>
      </div>
    );
  }

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