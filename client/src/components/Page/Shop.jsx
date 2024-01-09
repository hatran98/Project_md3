import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";
import "/Users/harefx/Desktop/Project_MD3/client/public/css/Shop.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
function Shop() {
  const [status, setStatus] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const baseUrl = "http://localhost:3001/api/v1";
  const getProduct = () => {
    axios
      .get(`${baseUrl}/product`)
      .then((res) => setListProduct(res.data.product))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handleUpdateFavourites = (quantity, productId, userId) => {
    if (parseInt(quantity) > 0) {
      const newUpdate = {
        productId: productId,
        userId: userId,
        quantity: quantity,
      };
      try {
        axios
          .post(`${baseUrl}/favourites`, newUpdate)
          .then((res) => {
            setStatus(!status);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleUpdate = (quantity, productId, userId) => {
    if (parseInt(quantity) > 0) {
      const newUpdate = {
        productId: productId,
        userId: userId,
        quantity: quantity,
      };
      try {
        axios
          .post(`${baseUrl}/cart`, newUpdate)
          .then((res) => {
            setStatus(!status);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Header status={status} />
      <div>
        <div className="row">
          <div className="col-md-2" style={{ marginTop: "14.5%" }}>
            <div
              className="sidebar-vertical2"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4>Filter by Price:</h4>
              <button
                style={{ marginBottom: "1em", backgroundColor: "#ffb0bd" }}
              >
                $0 - $150
              </button>
              <button
                style={{ marginBottom: "1em", backgroundColor: "#ffb0bd" }}
              >
                $151 - $300
              </button>
              <button style={{ backgroundColor: "#ffb0bd" }}>
                $301 - $500
              </button>
            </div>
          </div>
          <div className="col-md-10">
            <section className="shop_section layout_padding">
              <div className="container">
                <div className="heading_container heading_center">
                  <h2 style={{ color: "#ffb0bd" }}>All Products</h2>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="sidebar">
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Hàng mới
                      </div>
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Hàng bán chạy
                      </div>
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Hàng giảm giá
                      </div>
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Gấu bông
                      </div>
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Gối đầu chữ U
                      </div>
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Đồ Chơi
                      </div>
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Bình nước
                      </div>
                      <div
                        className="sidebar-item"
                        onClick={() => {
                          // Xử lý khi nhấn vào mục trong sidebar
                        }}
                      >
                        Phụ Kiện
                      </div>

                      <div>
                        <nav className="navbar bg-body-tertiary">
                          <div className="container-fluid">
                            <form
                              className="d-flex"
                              role="search"
                              style={{ width: "20rem" }}
                            >
                              <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                              />
                              <button
                                style={{ marginLeft: "1rem" }}
                                className="btn btn-outline-dark nav_search-btn"
                                type="submit"
                              >
                                <i
                                  className="fa fa-search"
                                  aria-hidden="true"
                                />
                              </button>
                            </form>
                          </div>
                        </nav>
                      </div>
                      {/* Thêm các mục khác tại đây */}
                    </div>
                  </div>
                  {listProduct &&
                    listProduct.map((product) => (
                      <div
                        key={product.productId}
                        className="col-sm-6 col-md-4 col-lg-3"
                      >
                        <div className="box">
                          <NavLink to={`/product/${product.productId}`}>
                            <div className="img-box">
                              <img
                                src={product.image}
                                alt=""
                                style={{ width: "100%" }}
                              />
                            </div>
                          </NavLink>
                          <div className="detail-box">
                            <h6 className="product-title">
                              {product.title.length > 25
                                ? `${product.title.substring(0, 10)}...`
                                : product.title}
                            </h6>

                            <div className="price-and-button">
                              <h6 className="product-price">
                                Price: <span>${+product.price}</span>
                              </h6>
                              <div style={{ display: "flex" }}>
                                <button
                                  className="favourites"
                                  onClick={() =>
                                    handleUpdateFavourites(
                                      1,
                                      product.productId,
                                      user.userId
                                    )
                                  }
                                >
                                  <svg
                                    className="empty"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={32}
                                    height={32}
                                  >
                                    <path fill="none" d="M0 0H24V24H0z" />
                                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z" />
                                  </svg>
                                  <svg
                                    className="filled"
                                    height={32}
                                    width={32}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M0 0H24V24H0z" fill="none" />
                                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" />
                                  </svg>
                                </button>
                                <button
                                  class="btn-cart"
                                  onClick={() =>
                                    handleUpdate(
                                      1,
                                      product.productId,
                                      user.userId
                                    )
                                  }
                                >
                                  <svg
                                    class="icon-cart"
                                    viewBox="0 0 24.38 30.52"
                                    height="30.52"
                                    width="24.38"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <title>icon-cart</title>
                                    <path
                                      transform="translate(-3.62 -0.85)"
                                      d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                                    ></path>
                                  </svg>
                                  <span class="quantity"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                          {product.news == "1" && (
                            <div className="new">
                              <span>New</span>
                            </div>
                          )}
                          {product.promotion == "1" && (
                            <div className="promotion">
                              <span>Sale off</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
