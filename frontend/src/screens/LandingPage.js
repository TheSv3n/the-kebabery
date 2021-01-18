import React from "react";
import "../css/landingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { toggleMenuActive } from "../actions/landingActions";

const LandingPage = () => {
  const dispatch = useDispatch();

  const menuToggle = useSelector((state) => state.menuToggle);
  const { menuActive } = menuToggle;

  const toggleHandler = () => {
    dispatch(toggleMenuActive(menuActive));
  };

  return (
    <>
      <section className={`showcase ${menuActive}`}>
        <header>
          <h2 className="logo">The Kebabery</h2>
          <div className="toggle" onClick={toggleHandler}></div>
        </header>

        <video src="/video/grill.mp4" muted="" loop="true" autoplay=""></video>
        <div className="overlay"></div>
        <div className="text">
          <h2>The finest kebabs</h2>
          <h3>in all of Kebabdom</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
            tempora laboriosam, voluptatibus maxime beatae corporis quae
            molestiae recusandae ea quas!
          </p>
          <LinkContainer to="/">
            <a href="/">Menu</a>
          </LinkContainer>
        </div>

        <footer>
          <h2 className="logo">The Kebabery</h2>

          <div className="menu-item">Home</div>

          <div className="menu-item">What's New</div>
          <LinkContainer to="/">
            <div className="menu-item">Menu</div>
          </LinkContainer>
          <div className="menu-item">Blog</div>
          <LinkContainer to="/contacts">
            <div className="menu-item">Contacts</div>
          </LinkContainer>
        </footer>
      </section>

      <div className={`menu ${menuActive}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">What's New</a>
          </li>
          <LinkContainer to="/">
            <li>
              <a href="/">Menu</a>
            </li>
          </LinkContainer>
          <li>
            <a href="/">Blog</a>
          </li>
          <LinkContainer to="/contacts">
            <li>
              <a href="/">Contacts</a>
            </li>
          </LinkContainer>
        </ul>
      </div>
    </>
  );
};

export default LandingPage;
