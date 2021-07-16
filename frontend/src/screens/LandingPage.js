import React, { useState } from "react";
import "../css/landingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { toggleMenuActive } from "../actions/landingActions";

const LandingPage = () => {
  const dispatch = useDispatch();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const menuToggle = useSelector((state) => state.menuToggle);
  const { menuActive } = menuToggle;

  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toggleHandler = (type) => {
    if (type === "menu") {
      dispatch(toggleMenuActive(true));
    } else if (type === "logo") {
      dispatch(toggleMenuActive(false));
    }
  };

  return (
    <>
      <section className={`showcase ${menuActive}`}>
        <header className={`${menuActive === "active" ? "d-none" : ""}`}>
          <h2 className={`logo ${menuActive}`}>The Kebabery</h2>
        </header>

        <video
          src="/video/grill.mp4"
          muted=""
          loop="true"
          autoplay=""
          className={`${menuActive}`}
        ></video>
        <div className="container">
          <div className="overlay"></div>
          <div className={`text ${menuActive}`}>
            <h2>The finest kebabs</h2>
            <h3>in all of Kebabdom</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
              tempora laboriosam, voluptatibus maxime beatae corporis quae
              molestiae recusandae ea quas!
            </p>
          </div>

          <div
            className={`row footer ${
              menuActive === "active" ? " " : "mt-auto"
            }`}
          >
            <h2
              className={`bottom-logo ${menuActive}`}
              onClick={() => toggleHandler("logo")}
            >
              The Kebabery
            </h2>

            <div
              className="menu-item mx-auto text d-block d-md-none"
              onClick={() => {
                toggleHandler("menu");
                setShowMobileMenu(!showMobileMenu);
              }}
            >
              <i className="fas fa-bars"></i>
            </div>

            <LinkContainer to="/" className="d-none d-md-block text">
              <div className="menu-item" onClick={() => toggleHandler("menu")}>
                Menu
              </div>
            </LinkContainer>
            <LinkContainer to="/contacts" className="d-none d-md-block text">
              <div className="menu-item" onClick={() => toggleHandler("menu")}>
                Contact Us
              </div>
            </LinkContainer>
            <LinkContainer to="/basket" className="d-none d-md-block text">
              <div className="menu-item" onClick={() => toggleHandler("menu")}>
                Your Order{" "}
                {basketItems.length > 0 ? `(${basketItems.length})` : ""}
              </div>
            </LinkContainer>
            {userInfo ? (
              <LinkContainer to="/profile" className="d-none d-md-block text">
                <div
                  className="menu-item"
                  onClick={() => toggleHandler("menu")}
                >
                  Profile
                </div>
              </LinkContainer>
            ) : (
              <LinkContainer to="/login" className="d-none d-md-block text">
                <div
                  className="menu-item"
                  onClick={() => toggleHandler("menu")}
                >
                  Login
                </div>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin ? (
              <LinkContainer
                to="/admin/orders"
                className="d-none d-md-block text"
              >
                <div
                  className="menu-item"
                  onClick={() => toggleHandler("menu")}
                >
                  Admin Options
                </div>
              </LinkContainer>
            ) : (
              ""
            )}
          </div>
          {showMobileMenu ? <div className="row">Menu</div> : ""}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
