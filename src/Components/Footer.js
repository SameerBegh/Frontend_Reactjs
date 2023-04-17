import React from "react";
import "../App.css"

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer >
        <div className="footer_info">
          <p>{`© Tournament  ${year}`} </p>
          <p>Created by : Sameer Begh A</p>
          <p>Contact Email : sameerbegha@gmail.com</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
