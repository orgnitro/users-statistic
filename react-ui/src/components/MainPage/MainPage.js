import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import './MainPage.scss'
import PhoneImg from '../../assets/images/mobile.png'
import BlockImg1 from '../../assets/images/image-block1.png'
import BlockImg2 from '../../assets/images/image-block2.png'
import BlockImg3 from '../../assets/images/image-block3.png'


const MainPage = () => {
  return (
    <Fragment>
      <section className='header wrapper'>
        <h2><span>Brainstorming</span> for desired perfect Usability</h2>
        <p>Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!</p>
        <Link to="/userslist">
          <button>Views Stats</button>
        </Link>
        <div className="phone-outer">
              <img src={PhoneImg} alt="" />
        </div>
      </section>

      <section className="main wrapper">
        <h3>Why <span>small business owners love</span> AppCo?</h3>
        <p className="description">
          Our design projects are fresh and simple and will benefit your business greatly.
          Learn more about our work!
        </p>
        <div className="images-block">
          <div className="image-block-item">
            <img src={BlockImg1} alt="" />
            <h4>Clean Design</h4>
            <p className="description">Increase sales by showing true dynamics of your website.</p>
          </div>

          <div className="image-block-item">
            <img src={BlockImg2} alt="" />
            <h4>Secure Data</h4>
            <p className="description">Build your online store’s trust using Social Proof & Urgency.</p>
          </div>

          <div className="image-block-item">
            <img src={BlockImg3} alt="" />
            <h4>Retina Ready</h4>
            <p className="description">Realize importance of social proof in customer’s purchase decision.</p>
          </div>
        </div>
      </section>

      <section className="footer wrapper">
        <form action="#">
          <div className="form-inputs">
            <input type="text" name="text" placeholder="Enter your email..." />
            <button type="submit">Subscribe</button>
          </div>
        </form>
        <h3>App Co</h3>
      </section>
    </Fragment>
  )
}

export default MainPage
