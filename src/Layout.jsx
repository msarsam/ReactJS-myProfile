
import React from "react";
import Login from "./Comp/Login"
import News from "./Comp/News";
import Contact from "./Comp/Contact";
import Tech from "./Comp/Tech";

import $ from 'jquery'


window.jQuery = window.$ = $
//API.fetchData();

function Layout() {
  var getYear = function () {
    return new Date().getFullYear();
  }

  React.useEffect(() => {
    const script = document.createElement('script');       
          script.src = "./js/customCode.js";
          script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <>
      <div id="copy">&copy;{getYear()}, www.neu38.com - MUHIB SARSAM</div>
      <div id="barcode">react.neu38.com</div>
      <div id="jp"></div>

      <div className="overlay"></div>
      <div className="main-cnt">
        <div className="lrg block" title="REACT.NEU">REACT<span className="grey">.NEU</span></div>
        <div className="sml block sub-head">REACT.JS based portal - personal profile</div>
        <div className="profile">
                  <div><span className="block profile-name">__ME__</span> — __DESIGNATION__
          </div><br />
          __PROFILE__
         </div>

        <div className="controls">
          <Login></Login>
          <News></News>
          <Contact></Contact>
          <Tech></Tech>   
        </div>
      </div>
    </>
  )
}

export default Layout
