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
      <section class={`showcase ${menuActive}`}>
        <header>
          <h2 class="logo">The Kebabery</h2>
          <div class="toggle" onClick={toggleHandler}></div>
        </header>

        <video src="/video/grill.mp4" muted="" loop="true" autoplay=""></video>
        <div class="overlay"></div>
        <div class="text">
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

        <ul class="social">
          <li>
            <a href="/">
              <img src="./images/facebook.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="./images/twitter.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="./images/instagram.png" alt="" />
            </a>
          </li>
        </ul>
      </section>

      <div class={`menu ${menuActive}`}>
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
