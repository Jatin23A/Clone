import "./Home.css";

function Home() {
  return (
    <section className="hero">

      <div className="overlay">

        <div className="hero-content">

          <span className="tag">#1 Movie Platform</span>

          <h1>
            Unlimited Movies,
            <br />
            TV Shows & More
          </h1>

          <p>
            Watch the latest blockbusters, award-winning series,
            and timeless classics anytime, anywhere.
          </p>

          <div className="hero-buttons">

            <button className="watch-btn">
              ▶ Watch Now
            </button>

            <button className="browse-btn">
              Browse Movies
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Home;