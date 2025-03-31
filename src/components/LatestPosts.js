import React, { useState } from "react";
import "./LatestPosts.css";

// Placeholder images for blog posts (replace with actual images)
import postImage1 from "../assets/pages/st1 (3).jpg";
import postImage2 from "../assets/pages/advisor.jpg";

const LatestPosts = () => {
  // Sample blog posts data (you can replace this with dynamic data from a backend)
  const posts = [
    {
      id: 1,
      title: "Annual Faith Festival 2025: A Celebration of Community",
      excerpt:
        "On March 15, 2025, Suesland Academy hosted its Annual Faith Festival, bringing together students, families, and staff to celebrate Christian values through music, art, and community service projects.",
      fullContent: `
        On March 15, 2025, Suesland Academy hosted its Annual Faith Festival, a cherished tradition that brings together students, families, and staff to celebrate Christian values through music, art, and community service projects. The event was a vibrant display of creativity and community spirit, with students performing in the school choir, showcasing their artwork inspired by biblical themes, and participating in service projects to support local charities. Parents and faculty joined in the festivities, which included a prayer service, a talent show, and a communal meal. The festival highlighted the school’s commitment to fostering a strong sense of faith and community, leaving everyone inspired and connected. This year’s theme, "Love in Action," resonated deeply with attendees, encouraging acts of kindness and service both within and beyond the school walls.
      `,
      image: postImage1,
    },
    {
      id: 2,
      title: "Students Shine at Regional Academic Competitions",
      excerpt:
        "Our students made us proud by securing top positions in the 2025 Regional Academic Competitions, demonstrating their dedication and academic excellence.",
      fullContent: `
        Our students made us proud by securing top positions in the 2025 Regional Academic Competitions, demonstrating their dedication and academic excellence. Held on March 20, 2025, the competitions brought together schools from across the region to compete in subjects like mathematics, science, literature, and history. Suesland Academy students excelled, with the math team taking first place in the calculus challenge, the science team winning the physics innovation award, and several individual students earning top honors in essay writing and debate. The success is a testament to the hard work of our students and the guidance of our dedicated teachers, who have fostered a culture of intellectual curiosity and rigorous preparation. This achievement not only highlights the academic strength of our school but also sets a high standard for future competitions.
      `,
      image: postImage2,
    },
  ];

  // State to manage modal visibility and selected post
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Function to open the modal with the selected post
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <section className="latest-posts">
      <h2 className="lp-heading">Latest Posts</h2>
      <div className="lp-grid">
        {posts.map((post) => (
          <div key={post.id} className="lp-card">
            <div className="lp-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="lp-content">
              <h3 className="lp-title">{post.title}</h3>
              <p className="lp-excerpt">{post.excerpt}</p>
              <button
                onClick={() => openModal(post)}
                className="lp-read-more"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying full post content */}
      {isModalOpen && selectedPost && (
        <div className="lp-modal-overlay">
          <div className="lp-modal">
            <button className="lp-modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="lp-modal-content">
              <h2 className="lp-modal-title">{selectedPost.title}</h2>
              <div className="lp-modal-image">
                <img src={selectedPost.image} alt={selectedPost.title} />
              </div>
              <p className="lp-modal-text">{selectedPost.fullContent}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestPosts;