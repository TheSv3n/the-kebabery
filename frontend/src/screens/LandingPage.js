import React, { useState } from "react";
import "../css/landingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container } from "react-bootstrap";
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
      setShowMobileMenu(false);
    }
  };

  return (
    <>
      <section className={`showcase ${menuActive} fixed-top`}>
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
        <Container>
          <div className="overlay"></div>
          <div className={`text ${menuActive}`}>
            <h2>Fine Quality Food</h2>
            <h3>Just for You</h3>
            <p>
              We are a family run takeaway based in Liverpool, specialising in
              fine quality delicious kebabs, pizzas and burgers.
            </p>
            <p>Order online for delivery or collection or come and see us.</p>
          </div>

          <Row
            className={`footer ${menuActive === "active" ? " " : "mt-auto"}`}
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
          </Row>
          {showMobileMenu ? (
            <Row className="d-flex d-md-none">
              <LinkContainer to="/" className="mx-auto">
                <div className="mob menu-item">
                  <i class="fas fa-utensils"></i>
                </div>
              </LinkContainer>
              <LinkContainer to="/contacts" className="mx-auto">
                <div className="mob menu-item">
                  <i class="fas fa-phone"></i>
                </div>
              </LinkContainer>
              <LinkContainer to="/basket" className="mx-auto">
                <div className="mob menu-item">
                  <i class="fas fa-shopping-basket"></i>
                  {basketItems.length > 0 ? `(${basketItems.length})` : ""}
                </div>
              </LinkContainer>
              {userInfo ? (
                <LinkContainer to="/profile" className="mx-auto">
                  <div
                    className="mob menu-item"
                    onClick={() => toggleHandler("menu")}
                  >
                    <i class="fas fa-user"></i>
                  </div>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login" className="mx-auto">
                  <div
                    className="mob menu-item"
                    onClick={() => toggleHandler("menu")}
                  >
                    <i class="fas fa-sign-in-alt"></i>
                  </div>
                </LinkContainer>
              )}
            </Row>
          ) : (
            ""
          )}
        </Container>
      </section>
    </>
  );
};

export default LandingPage;
