"use client";

import { useMemo, useState } from "react";

type Place = {
  name: string;
  tradition: string;
  category: string;
  city: string;
  address: string;
  phone?: string;
  description: string;
  sourceUrl: string;
  status: "Source checked" | "Pending organization verification";
};

const places: Place[] = [
  {
    name: "Baitun Nur Mosque Calgary",
    tradition: "Islam",
    category: "Mosque",
    city: "Calgary",
    address: "4353 54 Ave NE, Calgary, AB T3J 4L3",
    phone: "403-590-8008",
    description: "Mosque and community centre of the Ahmadiyya Muslim Jama'at.",
    sourceUrl: "https://baitunnur.org/",
    status: "Pending organization verification",
  },
  {
    name: "Holy Nativity Anglican Church",
    tradition: "Christianity",
    category: "Church",
    city: "Calgary",
    address: "12707 Bonaventure Dr SE, Calgary, AB T2J 4P4",
    phone: "403-278-0001",
    description: "Anglican parish offering Sunday Holy Communion services and community programs.",
    sourceUrl: "https://www.calgary.anglican.ca/glenmore-deanery/holy-nativity",
    status: "Pending organization verification",
  },
  {
    name: "Hindu Society of Calgary",
    tradition: "Hinduism",
    category: "Temple",
    city: "Calgary",
    address: "2225 24 Ave NE, Calgary, AB T2E 8M2",
    phone: "403-291-2551",
    description: "Hindu temple and community organization with religious, cultural and social programs.",
    sourceUrl: "https://hindusocietyofcalgary.com/",
    status: "Pending organization verification",
  },
  {
    name: "Dashmesh Culture Centre",
    tradition: "Sikhism",
    category: "Gurdwara",
    city: "Calgary",
    address: "135 Gurdwara Sahib Blvd NE, Calgary, AB T3J 2X5",
    phone: "403-590-0970",
    description: "Gurdwara and Sikh community centre providing religious and community support services.",
    sourceUrl: "https://www.dashmesh.ca/",
    status: "Pending organization verification",
  },
  {
    name: "Calgary Buddhist Temple",
    tradition: "Buddhism",
    category: "Temple",
    city: "Calgary",
    address: "658 1 Avenue NE, Calgary, AB T2E 3Y1",
    phone: "403-263-5723",
    description: "Jodo Shinshu Buddhist temple in Calgary's Bridgeland area.",
    sourceUrl: "https://calgary-buddhist.ab.ca/",
    status: "Pending organization verification",
  },
  {
    name: "Beth Tzedec Congregation",
    tradition: "Judaism",
    category: "Synagogue",
    city: "Calgary",
    address: "1325 Glenmore Trail SW, Calgary, AB T2V 4Y8",
    phone: "403-255-8688",
    description: "Conservative Jewish congregation and community centre with daily and Shabbat services.",
    sourceUrl: "https://bethtzedec.ca/",
    status: "Pending organization verification",
  },
];

const traditions = ["All", "Islam", "Christianity", "Hinduism", "Sikhism", "Buddhism", "Judaism"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [tradition, setTradition] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return places.filter((place) => {
      const matchesTradition = tradition === "All" || place.tradition === tradition;
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
                {place.phone && <div className="address">☎ {place.phone}</div>}
                <div className="verification-note">
                  <span>● {place.status}</span>
                  <a href={place.sourceUrl} target="_blank" rel="noreferrer">
                    Source ↗
                  </a>
                </div>
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
