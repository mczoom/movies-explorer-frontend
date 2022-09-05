import React from 'react';
import Promo from '../Promo/Promo';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main() {
     
      
    return (
        <div>
          <Header />
          <Promo />
          <NavTab />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Footer />
        </div>
    );
}

export default Main;