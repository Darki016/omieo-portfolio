"use client";

export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Omieo Zaman",
    "url": "https://omieo-portfolio.vercel.app",
    "image": "https://omieo-portfolio.vercel.app/profile.webp",
    "jobTitle": "Full-Stack Web Developer & Medical Student",
    "description": "Premium WordPress & WooCommerce Developer specializing in high-performance e-commerce sites for clients in Bangladesh and worldwide.",
    "sameAs": [
      "https://www.facebook.com/omieozaman",
      "https://www.instagram.com/omieozaman/",
      "https://www.linkedin.com/in/abid-zaman-1a9709288/",
      "https://www.fiverr.com/omieozaman",
      "https://www.upwork.com/freelancers/~01d0019fdd7a74382b"
    ],
    "knowsAbout": [
      "Web Development",
      "WordPress",
      "WooCommerce",
      "React",
      "Next.js",
      "E-commerce Optimization",
      "JavaScript",
      "UI/UX Design"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Anwer Khan Modern Medical College"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
