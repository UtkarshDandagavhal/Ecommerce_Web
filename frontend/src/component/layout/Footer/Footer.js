import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "../Footer/Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; Utkarsh Dandagavhal</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/utkarshsonar___/">Instagram</a>
        <a href="https://www.youtube.com/@utkarshdandagavhal2878">Youtube</a>
        <a href="http://facebook.com/utkarsh.msonar.3">Facebook</a>
      </div>
    </footer>

  )
}

export default Footer
