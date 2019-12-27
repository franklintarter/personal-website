import React from "react";
import { Link } from "gatsby";
// import

import Logo from "../../../static/img/logo.svg";

const NavLink = ({ to, className = "", children }) => (
  <Link
    className={`uppercase font-bold text-gray-700 hover:border-brand-light-gray border-b-2 transition border-transparent ${className}`}
    to={to}
    activeClassName="border-brand"
  >
    {children}
  </Link>
);

export default () => {
  return (
    <nav role="navigation" aria-label="main-navigation">
      <div className="flex justify-center content-center flex-wrap xs:flex-no-wrap xs:justify-between items-center sm:mb-16 mb-12">
        <div className="w-full xs:w-auto text-center">
          <Link className="flex justify-center" to="/">
            <div className="font-bold text-3xl text-brand-gray tracking-wide uppercase font-serif">
              {/* <div>

              </div> */}
              <Logo className="w-12" />
              {/* FT */}
            </div>
          </Link>
        </div>
        {/* <div className="flex justify-center xs:flex-grow-0 flex-grow">
          <NavLink className="mr-4" to="/projects">
            Projects
          </NavLink>
          <NavLink to="/writing">Writing</NavLink>
        </div> */}
      </div>
    </nav>
  );
};
