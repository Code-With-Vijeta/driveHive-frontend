// pages/Home.jsx
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";

// Define the API base URL (must be prefixed with NEXT_PUBLIC_ if on Next.js client-side)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Fetch data for the featured cars
    fetch(`${API_BASE_URL}/api/featured-cars`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFeaturedCars(data); // Assuming 'data' is an array of cars
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
        console.error('Error fetching featured cars:', err);
      });
  }, []); // Empty dependency array runs once on mount

  // 2. Handle loading and error states
  if (isLoading) {
    // You could render a simpler component like your <Loader /> here
    return <div>Loading homepage content...</div>; 
  }

  if (error) {
    return <div>Error: {error}. Could not load featured content.</div>;
  }

  return (
    <>
      <Hero />
      {/* 3. Pass the fetched data down to the child component */}
      <FeaturedSection cars={featuredCars} /> 
      <Banner />
      <Newsletter />
    </>
  );
};

export default Home;