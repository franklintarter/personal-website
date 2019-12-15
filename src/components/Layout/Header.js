import React from "react";
import { Link } from "gatsby";
import Logo from "../../../static/img/logo.svg";
import { Section } from "../UI";

const NavLink = ({ to, className = "", children }) => (
  <Link
    className={`py-2 px-2 uppercase tracking-wide border-b-2 border-transparent border-solid hover:border-brand transition ${className}`}
    to={to}
    activeClassName="border-brand"
  >
    {children}
  </Link>
);

export default () => {
  return (
    <nav role="navigation" aria-label="main-navigation">
      <Section>
        <div className="flex justify-center content-center pt-2 pb-2 md:pb-4 flex-wrap xs:flex-no-wrap xs:justify-between items-center">
          <div className="w-full xs:w-auto text-center">
            <Link className="flex justify-center" to="/">
              <Logo className="xs:w-16 w-12 h-auto xs:mr-6 pb-2 xs:pb-0" />
            </Link>
          </div>
          <div className="flex justify-center xs:flex-grow-0 flex-grow">
            <NavLink className="mr-4" to="/">
              Home
            </NavLink>
            <NavLink className="mr-4" to="/about">
              About
            </NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/style-guide">Style GUide</NavLink>
          </div>
        </div>
      </Section>
    </nav>
  );
};
