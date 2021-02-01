import React from "react";
import "../css/landingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { toggleMenuActive } from "../actions/landingActions";

const LandingPage = () => {
  const dispatch = useDispatch();

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
        <header>
          <h2 className={`logo ${menuActive}`}>The Kebabery</h2>
        </header>

        <video
          src="/video/grill.mp4"
          muted=""
          loop="true"
          autoplay=""
          className={`${menuActive}`}
        ></video>
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

        <footer>
          <h2
            className={`bottom-logo ${menuActive}`}
            onClick={() => toggleHandler("logo")}
          >
            The Kebabery
          </h2>
          <LinkContainer to="/">
            <div className="menu-item" onClick={() => toggleHandler("menu")}>
              Menu
            </div>
          </LinkContainer>
          <div className="menu-item" onClick={() => toggleHandler("menu")}>
            What's New
          </div>
          <LinkContainer to="/contacts">
            <div className="menu-item" onClick={() => toggleHandler("menu")}>
              Contact Us
            </div>
          </LinkContainer>
          <LinkContainer to="/basket">
            <div className="menu-item" onClick={() => toggleHandler("menu")}>
              Your Order{" "}
              {basketItems.length > 0 ? `(${basketItems.length})` : ""}
            </div>
          </LinkContainer>
          {userInfo ? (
            <LinkContainer to="/profile">
              <div className="menu-item" onClick={() => toggleHandler("menu")}>
                Profile
              </div>
            </LinkContainer>
          ) : (
            <LinkContainer to="/login">
              <div className="menu-item" onClick={() => toggleHandler("menu")}>
                Login
              </div>
            </LinkContainer>
          )}
        </footer>
      </section>
    </>
  );
};

export default LandingPage;
