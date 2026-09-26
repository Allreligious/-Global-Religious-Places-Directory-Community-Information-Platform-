"use client";

import { useMemo, useState } from "react";

type Place = {
  name: string;
  tradition: string;
  category: string;
  city: string;
  address: string;
  description: string;
};

const places: Place[] = [
  {
    name: "Calgary Community Place",
    tradition: "Islam",
    category: "Mosque",
    city: "Calgary",
    address: "Calgary, Alberta",
    description: "Community worship, education and family programs.",
  },
  {
    name: "Calgary Faith Centre",
    tradition: "Christianity",
    category: "Church",
    city: "Calgary",
    address: "Calgary, Alberta",
    description: "Worship services and community activities.",
  },
  {
    name: "Calgary Hindu Centre",
    tradition: "Hinduism",
    category: "Temple",
    city: "Calgary",
    address: "Calgary, Alberta",
    description: "Religious services, cultural programs and festivals.",
  },
  {
    name: "Calgary Sikh Community Centre",
    tradition: "Sikhism",
    category: "Gurdwara",
    city: "Calgary",
    address: "Calgary, Alberta",
    description: "Gurdwara services and community support.",
  },
];

const traditions = ["All", "Islam", "Christianity", "Hinduism", "Sikhism", "Buddhism", "Judaism"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [tradition, setTradition] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return places.filter((place) => {
      const matchesTradition =
        tradition === "All" || place.tradition === tradition;
      const matchesQuery =
        !q ||
        [place.name, place.tradition, place.category, place.city, place.address]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesTradition && matchesQuery;
    });
  }, [query, tradition]);

  return (
    <main>
      <header className="site-header">
        <div className="container nav">
          <div className="brand">
            <span className="brand-mark">✦</span>
            <div>
              <strong>All Religious</strong>
              <small>Global Religious Places Directory</small>
            </div>
          </div>
          <nav>
            <a href="#places">Places</a>
            <a href="#events">Events</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">CALGARY MVP • GLOBAL VISION</span>
            <h1>Find a place of worship or faith community near you.</h1>
            <p>
              Discover religious places, services, events and community
              information in one trusted directory.
            </p>

            <div className="search-box">
              <input
                aria-label="Search religious places"
                placeholder="Search by name, religion, city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={() => document.getElementById("places")?.scrollIntoView({ behavior: "smooth" })}>
                Search
              </button>
            </div>

            <div className="filters">
              {traditions.map((item) => (
                <button
                  key={item}
                  className={tradition === item ? "filter active" : "filter"}
                  onClick={() => setTradition(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-card">
            <div className="map-preview">
              <span className="map-pin">●</span>
              <span className="map-label">Calgary</span>
              <div className="map-grid" />
            </div>
            <div className="hero-card-footer">
              <strong>Start in Calgary</strong>
              <span>Expand to Canada → Worldwide</span>
            </div>
          </div>
        </div>
      </section>

      <section id="places" className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DIRECTORY</span>
            <h2>Religious places</h2>
          </div>
          <span className="result-count">{filtered.length} places</span>
        </div>

        <div className="place-grid">
          {filtered.map((place) => (
            <article className="place-card" key={place.name}>
              <div className="place-icon">{place.category === "Church" ? "✚" : "✦"}</div>
              <div className="place-content">
                <span className="tag">{place.tradition}</span>
                <h3>{place.name}</h3>
                <p className="muted">{place.category} · {place.city}</p>
                <p>{place.description}</p>
                <div className="address">⌖ {place.address}</div>
                <button className="text-button">View place →</button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty">
            <h3>No places found</h3>
            <p>Try another search or religion filter.</p>
          </div>
        )}
      </section>

      <section id="events" className="feature-section">
        <div className="container feature-grid">
          <div>
            <span className="eyebrow">COMING NEXT</span>
            <h2>Events, prayer times & community services</h2>
            <p>
              The next stage will let organizations publish services, prayer
              times, festivals, classes and community programs.
            </p>
          </div>
          <div className="feature-list">
            <div><span>01</span><strong>Service & prayer times</strong></div>
            <div><span>02</span><strong>Events & festivals</strong></div>
            <div><span>03</span><strong>Community services</strong></div>
            <div><span>04</span><strong>Verified organization profiles</strong></div>
          </div>
        </div>
      </section>

      <section id="about" className="section container about">
        <span className="eyebrow">OUR VISION</span>
        <h2>One directory. Many communities.</h2>
        <p>
          Built to make religious and community information easier to discover
          while respecting the diversity of faith traditions around the world.
        </p>
      </section>

      <footer>
        <div className="container footer-inner">
          <strong>Global Religious Places Directory</strong>
          <span>Calgary → Canada → Worldwide</span>
        </div>
      </footer>
    </main>
  );
}
