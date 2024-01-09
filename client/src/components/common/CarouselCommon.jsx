import React from "react";
import { NavLink } from "react-router-dom";
function Carousel() {
  return (
    <div>
      <section className="slider_section">
        <div className="slider_container">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="detail-box">
                        <h1>
                          Welcome To Our <br />
                          Gift Shop
                        </h1>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Veniam repellat quibusdam iure ullam. Recusandae
                          ipsum corrupti, nemo provident autem rerum in atque
                          quos reiciendis quod, optio odio hic laborum
                          doloremque? Iusto, voluptas aliquid? Alias consectetur
                          incidunt soluta sint culpa. Voluptatum facere
                          doloribus possimus impedit eveniet quas, nemo voluptas
                          fuga est perferendis accusamus maxime nam assumenda
                          quos ex velit! Eos, laboriosam. Dignissimos asperiores
                          suscipit atque perspiciatis nemo quidem corporis
                          ratione quo repudiandae autem amet, perferendis
                          doloribus. Cum cumque temporibus perspiciatis error,
                          sunt veniam ducimus ut, esse ex repellat culpa, dicta
                          est.
                        </p>
                        <NavLink to="/contact">Contact Us</NavLink>
                      </div>
                    </div>
                    <div className="col-md-5 ">
                      <div className="img-box">
                        <img
                          src="images/slider-img.png"
                          alt=""
                          style={{ width: "16.4em" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="detail-box">
                        <h1>
                          Welcome To Our <br />
                          Gift Shop
                        </h1>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Veniam repellat quibusdam iure ullam. Recusandae
                          ipsum corrupti, nemo provident autem rerum in atque
                          quos reiciendis quod, optio odio hic laborum
                          doloremque? Iusto, voluptas aliquid? Alias consectetur
                          incidunt soluta sint culpa. Voluptatum facere
                          doloribus possimus impedit eveniet quas, nemo voluptas
                          fuga est perferendis accusamus maxime nam assumenda
                          quos ex velit! Eos, laboriosam. Dignissimos asperiores
                          suscipit atque perspiciatis nemo quidem corporis
                          ratione quo repudiandae autem amet, perferendis
                          doloribus. Cum cumque temporibus perspiciatis error,
                          sunt veniam ducimus ut, esse ex repellat culpa, dicta
                          est.
                        </p>
                        <NavLink to="/contact">Contact Us</NavLink>
                      </div>
                    </div>
                    <div className="col-md-5 ">
                      <div className="img-box">
                        <img
                          src="/images/1.png"
                          alt=""
                          style={{ width: "22.65rem" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="detail-box">
                        <h1>
                          Welcome To Our <br />
                          Gift Shop
                        </h1>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Veniam repellat quibusdam iure ullam. Recusandae
                          ipsum corrupti, nemo provident autem rerum in atque
                          quos reiciendis quod, optio odio hic laborum
                          doloremque? Iusto, voluptas aliquid? Alias consectetur
                          incidunt soluta sint culpa. Voluptatum facere
                          doloribus possimus impedit eveniet quas, nemo voluptas
                          fuga est perferendis accusamus maxime nam assumenda
                          quos ex velit! Eos, laboriosam. Dignissimos asperiores
                          suscipit atque perspiciatis nemo quidem corporis
                          ratione quo repudiandae autem amet, perferendis
                          doloribus. Cum cumque temporibus perspiciatis error,
                          sunt veniam ducimus ut, esse ex repellat culpa, dicta
                          est. Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Veniam repellat quibusdam iure
                          ullam. Recusandae ipsum corrupti, nemo provident autem
                          rerum in atque quos reiciendis quod, optio odio hic
                          laborum doloremque? Iusto, voluptas aliquid? Alias
                          consectetur incidunt soluta sint culpa. Voluptatum
                          facere doloribus possimus impedit eveniet quas, nemo
                          voluptas fuga est perferendis accusamus maxime nam
                          assumenda quos ex velit! Eos, laboriosam. Dignissimos
                          oluta sint culpa.voluptas fuga est perferendis
                          accusamus maxime nam assumenda quos ex velit! Eos,
                          laboriosam. Dignissimos oluta sint culpa.
                        </p>
                        <NavLink to="/contact">Contact Us</NavLink>
                      </div>
                    </div>
                    <div className="col-md-5 ">
                      <div className="img-box">
                        <img
                          src="images/2.png"
                          alt=""
                          style={{ width: "35rem" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel_btn-box">
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-arrow-left" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <img src="images/line.png" alt="" />
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-arrow-right" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Carousel;
