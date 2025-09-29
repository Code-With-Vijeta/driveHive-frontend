import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";
import { useAppContext } from "../context/AppContext"; 

const Home = () => {
    const { loading, error } = useAppContext();

    if (loading) {
        return <div className="text-center p-20 text-xl">Loading homepage content...</div>; 
    }

    if (error) {
        return <div className="text-red-600 text-center p-20 text-xl">Error: Could not load featured content. Please check server logs.</div>;
    }

    return (
        <>
            <Hero />
            
            <FeaturedSection /> 
            
            <Banner />
            <Newsletter />
        </>
    );
};

export default Home;