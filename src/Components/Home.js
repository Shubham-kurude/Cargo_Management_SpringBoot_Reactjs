import React from "react";
// Remove Tailwind-based Button, Card imports since you want pure CSS-based styling
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

import '../Components/Home.css'
export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage:
            "url('https://www.gofreight.com/wp-content/uploads/2021/08/transportation-logistics-scaled.jpg')",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
  <h1 className="hero-title mb-2">Reliable Cargo & Freight Services</h1>
  <p className="hero-subtitle mb-2">Fast, Secure & Affordable Shipping Worldwide.</p>
  <Link to="/get-quote">
  <button className="" id="btnn">Get a Quote</button>
</Link>
<Link to="/adminlogin">
  <button className="" id="btnn">Admin Login</button>
</Link>
</div>

      </section>

      {/* About Section */}
      <section className="about container">
        <h2 className="about-title">Why Choose Our Cargo Service?</h2>
        <p className="about-text">
          We deliver cargo with the utmost care and efficiency. Our professional
          team ensures that your packages reach their destination safely, on time,
          every time.
        </p>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2 className="services-title">Our Services</h2>
        <div className="service-grid container">
          {/* Air Freight */}
          <article tabIndex="0" className="service-card">
            <img
              src="https://image.slidesdocs.com/responsive-images/background/illustration-of-air-cargo-concept-featuring-a-toy-jet-airplane-and-boxes-of-goods-with-a-quick-delivery-sign-rendered-in-3d-powerpoint-background_aff8ecb31a__960_540.jpg"
              alt="Air Freight"
              className="service-image"
            />
            <div className="service-content">
              <h3 className="service-title">Air Freight</h3>
              <p className="service-description">Fast and secure air cargo delivery worldwide.</p>
            </div>
          </article>

          {/* Sea Freight */}
          <article tabIndex="0" className="service-card">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/951/6/476/boat-cargo-ship-tanker-wallpaper-preview.jpg"
              alt="Sea Freight"
              className="service-image"
            />
            <div className="service-content">
              <h3 className="service-title">Sea Freight</h3>
              <p className="service-description">Reliable and cost-effective sea cargo solutions.</p>
            </div>
          </article>

          {/* Road Freight */}
          <article tabIndex="0" className="service-card">
            <img
              src="https://bidvestilwebsitestorage.blob.core.windows.net/bidvestiluploads/ac26c213-1636-4e7f-8a74-f7faa9d29888/Flatbed-Truck-1-1024x682-1.jpg"
              alt="Road Freight"
              className="service-image"
            />
            <div className="service-content">
              <h3 className="service-title">Road Freight</h3>
              <p className="service-description">Door-to-door cargo delivery by road transport.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2 className="contact-title">Ready to Ship?</h2>
        <p className="contact-text">Contact us for the best cargo service experience.</p>
        <button className="contact-btn">Contact Us</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 Cargo Freight Solutions. All Rights Reserved.
      </footer>
    </div>
  );
}
