import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="banner">
        <div className="title">
          <h1>MK-EVENTS</h1>
          <p>Events and Weddings</p>
        </div>
        <div className="tag">
          {/* <label>News Letter</label>
          <div>
            <input type="text" placeholder="E-mail" />
            <button>Subscribe</button>
          </div> */}
       
          <p ><strong>Follow us on Instagram  to stay connected !</strong></p>
          <a href="https://www.instagram.com/_guy.with.dreams_" className="link" >Mk-Events</a>
          
         </div>
      </div>
    </footer>
  );
};

export default Footer;
