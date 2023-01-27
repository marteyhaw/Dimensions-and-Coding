import React from "react";
import Swiper from "swiper/bundle";
import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    new Swiper(".testimonials-slider", {
      speed: 1000,
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
    <>
      <div>
        <div className="contact-bg">
          <div className="jumbotron centered">
            <div className="container offset-3 col-6 mb-3">
              <i className="fas fa-key fa-6x" />
              <h1 className="text-center display-3 text-bg-secondary p-3 font-family: DynaPuff cursive;  ">
                Dimensions and Coding
              </h1>
              <p className="lead text-bg-secondary p-3 opacity-50 ">
                Brave adventurers use programming skills to conquer new type of
                dimension filled with puzzles and obstacles. They discovered the
                puzzles not only challenging but also taught new coding
                techniques. The deeper they went, the more they realized their
                coding skills were as important as their combat skills. The game
                of Dimensions and Coding was born, providing a fun and engaging
                way to learn and practice coding. Are you ready to join the
                adventure and improve your coding skills with Dimensions and
                Coding?
              </p>
              <hr />
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
                            <span className="author">David J.</span>
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
                              "I was skeptical at first about a game that
                              promised to teach me coding, but Dimensions and
                              Coding exceeded my expectations. The puzzles and
                              obstacles in the game are challenging but not
                              impossible, and the game does a great job of
                              introducing new coding concepts in a way that's
                              easy to understand. I also love the adventure
                              aspect of the game, it made me feel like a real
                              code-slinging adventurer. Definitely a must-try
                              for anyone interested in coding."
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-box">
                          <div className="author-test">
                            <span className="author">Elviza H.</span>
                          </div>
                          <img
                            src={require("./img/ElvizaH.png")}
                            alt=""
                            width="65"
                            height="65"
                            style={{ borderRadius: "50%" }}
                            className="d-inline-block align-top mr-2"
                          />
                          <div className="content-test">
                            <p className="description lead">
                              "Dimensions and Coding is a unique game that
                              combines dimension crawling with coding
                              challenges. The retro graphics and 8-bit
                              soundtrack add to the game's charm. It features a
                              tutorial mode for new coders and emphasizes
                              problem-solving and critical thinking. Overall,
                              it's an enjoyable and challenging experience for
                              players of all skill levels."
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-box">
                          <div className="author-test">
                            <span className="author">Jackie L.</span>
                          </div>
                          <img
                            src={require("./img/JackieL.png")}
                            alt=""
                            width="65"
                            height="65"
                            style={{ borderRadius: "50%" }}
                            className="d-inline-block align-top mr-2"
                          />
                          <div className="content-test">
                            <p className="description lead">
                              "Dimensions and Coding is a one-of-a-kind and
                              entertaining game that combines the thrill of
                              dimension exploration with the difficulty of
                              coding. The gameplay is fluid, and the puzzles are
                              well-thought-out, resulting in a fun and engaging
                              experience. The graphics in the game are simple
                              but effective, and the soundtrack is appropriate
                              and enjoyable. Overall, I strongly recommend this
                              game to anyone who enjoys dimension crawlers as
                              well as programming."
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-box">
                          <div className="author-test">
                            <span className="author">Edmund G.</span>
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
                              "Dimension and Coding is an innovative game that
                              brings together the best of both worlds - coding
                              and dimension exploration. The game mechanics are
                              well thought out, and the puzzles are challenging
                              but not impossible to solve. The graphics are
                              basic but serve their purpose, and the soundtrack
                              is fitting for the game's atmosphere. I highly
                              recommend this game to anyone looking for a unique
                              and engaging experience."
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-box">
                          <div className="author-test">
                            <span className="author">Martey.</span>
                          </div>
                          <img
                            src={require("./img/MarteyH.png")}
                            alt=""
                            width="65"
                            height="65"
                            style={{ borderRadius: "50%" }}
                            className="d-inline-block align-top mr-2"
                          />
                          <div className="content-test">
                            <p className="description lead">
                              "I was pleasantly surprised by the depth of
                              gameplay in Dimension and Coding. The coding
                              puzzles were a great addition, and I found myself
                              really enjoying the challenge of figuring them
                              out. The graphics are fantastic and the sound
                              effects are spot-on. This is definitely a game
                              worth checking out."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                  <div
                    id="testimonial-mf"
                    className="owl-carousel owl-theme"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
