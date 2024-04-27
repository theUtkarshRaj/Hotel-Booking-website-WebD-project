import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="shadow bg-slate-200">
      <div className="container py-5">
        <div className="row justify-content-between">
          <div className="col-auto">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img alt="logo" src="./images/logo.png" width="30px" />
              <span className="ms-3 h5 font-weight-bold">EaseStay</span>
            </a>
            <div className="mt-5">
              <a href="/" className="btn btn-dark btn-floating me-2" role="button">
                <FaFacebookF />
              </a>
              <a href="/" className="btn btn-dark btn-floating me-2" role="button">
                <FaTwitter />
              </a>
              <a href="/" className="btn btn-dark btn-floating" role="button">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="col-auto">
            <h5 className="mb-4 font-weight-bold">EaseStay</h5>
            <ul className="list-unstyled">
              <li><a href="/destination">Destination</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">Blog</a></li>
            </ul>
          </div>
          <div className="col-auto">
            <h5 className="mb-4 font-weight-bold">Products</h5>
            <ul className="list-unstyled">
              <li><a href="/">Windframe</a></li>
              <li><a href="/">Loop</a></li>
              <li><a href="/">Contrast</a></li>
            </ul>
          </div>
          <div className="col-auto">
            <h5 className="mb-4 font-weight-bold">Help</h5>
            <ul className="list-unstyled">
              <li><a href="/">Support</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Log In</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col text-center">
            <small>&copy; EaseStay, 2024. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
