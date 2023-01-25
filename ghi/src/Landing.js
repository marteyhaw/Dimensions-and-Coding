import React from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper/bundle";
import { useEffect } from "react";
// import CharacterDetailsTwo from "./CharacterDetailsRTK";

function LandingPage() {
  useEffect(() => {
    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
  }, []);

  return (
    <div className="contact-bg">
      <div className="jumbotron centered">
        <div className="container offset-3 col-6 mb-3">
          <i className="fas fa-key fa-6x" />
          <h1 className="display-3 text-bg-secondary p-3 opacity-50  ">
            Dungeon and Coding
          </h1>
          <p className="lead text-bg-secondary p-3 opacity-50 ">
            Brave adventurers use programming skills to conquer new type of
            dungeon filled with puzzles and obstacles. They discovered the
            puzzles not only challenging but also taught new coding techniques.
            The deeper they went, the more they realized their coding skills
            were as important as their combat skills. The game of Dungeon and
            Coding was born, providing a fun and engaging way to learn and
            practice coding. Are you ready to join the adventure and improve
            your coding skills with Dungeon and Coding?
          </p>
          <hr />
          <Link to="/signup">
            <button type="submit" className="btn btn-primary btn-lg">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button type="submit" className="btn btn-primary btn-lg ms-5">
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className="testimonials paralax-mf bg-image">
        <div className="overlay-mf"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="testimonials-slider swiper"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonial-box">
                      <div className="author-test">
                        <img
                          src="src/img/Shah.png"
                          alt=""
                          className="rounded-circle b-shadow-a"
                        />
                        <span className="author">David J</span>
                      </div>
                      <img
                        src={require("./img/DavidJ.png")}
                        alt=""
                        width="65"
                        height="65"
                        style={{ borderRadius: "50%" }}
                        className="d-inline-block align-top mr-2"
                      />
                      <div className="content-test">
                        <p className="description lead">
                          "I was skeptical at first about a game that promised
                          to teach me coding, but Dungeon and Coding exceeded my
                          expectations. The puzzles and obstacles in the game
                          are challenging but not impossible, and the game does
                          a great job of introducing new coding concepts in a
                          way that's easy to understand. I also love the
                          adventure aspect of the game, it made me feel like a
                          real code-slinging adventurer. Definitely a must-try
                          for anyone interested in coding."
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-box">
                      <div className="author-test">
                        <img
                          src="assets/img/testimonial-4.jpg"
                          alt=""
                          className="rounded-circle b-shadow-a"
                        />
                        <span className="author">Edmund G</span>
                      </div>
                      <img
                        src={require("./img/EdmundG.png")}
                        alt=""
                        width="65"
                        height="65"
                        style={{ borderRadius: "50%" }}
                        className="d-inline-block align-top mr-2"
                      />
                      <div className="content-test">
                        <p className="description lead">
                          "Dungeon and Coding is a unique and fun way to learn
                          programming concepts. The game combines adventure and
                          puzzle-solving with coding challenges, making it an
                          engaging and interactive experience. The deeper I went
                          into the game, the more I realized that my coding
                          skills were just as important as my combat skills. I
                          highly recommend this game to anyone looking to
                          improve their coding skills while having a blast."
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-box">
                      <div className="author-test">
                        <img
                          src="assets/img/testimonial-4.jpg"
                          alt=""
                          className="rounded-circle b-shadow-a"
                        />
                        <span className="author">Martey</span>
                      </div>
                      <div className="content-test">
                        <p className="description lead">
                          "Dungeon and Coding is a unique game that combines
                          dungeon crawling with coding challenges. The retro
                          graphics and 8-bit soundtrack add to the game's charm.
                          It features a tutorial mode for new coders and
                          emphasizes problem-solving and critical thinking.
                          Overall, it's an enjoyable and challenging experience
                          for players of all skill levels."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              <div id="testimonial-mf" className="owl-carousel owl-theme"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
