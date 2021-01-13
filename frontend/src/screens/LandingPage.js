import React from "react";
import "../css/landingPage.css";

const LandingPage = () => {
  let active = "";

  const toggleHandler = () => {};

  return (
    <>
      <section class={`showcase ${active}`}>
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
          <a href="/">Menu</a>
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

      <div class={`menu ${active}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">What's New</a>
          </li>
          <li>
            <a href="/">Menu</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="/">Contacts</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LandingPage;
