import React from "react";
import { Link } from "gatsby";

const NavLink = ({ to, className = "", children }) => (
  <Link
    className={`uppercase font-bold text-brand hover:border-brand border-b-2 transition border-transparent ${className}`}
    to={to}
    activeClassName="border-brand"
  >
    {children}
  </Link>
);

export default () => {
  return (
    <nav role="navigation" aria-label="main-navigation">
      <div className="flex justify-center content-center flex-wrap xs:flex-no-wrap xs:justify-between items-center sm:mb-20 mb-12">
        <div className="w-full xs:w-auto text-center">
          <Link className="flex justify-center" to="/">
            <div className="text-gray-700 tracking-wider uppercase">
              Franklin Tarter
            </div>
          </Link>
        </div>
        <div className="flex justify-center xs:flex-grow-0 flex-grow">
          <NavLink className="mr-4" to="/projects">
            Projects
          </NavLink>
          <NavLink to="/writing">Writing</NavLink>
        </div>
      </div>
    </nav>
  );
};
