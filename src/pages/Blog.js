import React from "react";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts"; // Import the new component
import "./Blog.css";

const Blog = () => {
  return (
    <div className="blog">
      {/* Hero Section */}
      <Hero
        title="Suesland Academy Blog"
        subtitle="Stay updated with the latest news, events, and insights from our community."
        buttonText="Explore More"
        buttonLink="/blog"
        backgroundImage="url('../assets/pages/advisor.jpg')"
      />

      {/* Latest Posts Section */}
      <LatestPosts />
    </div>
  );
};

export default Blog;