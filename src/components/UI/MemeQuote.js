import React from "react";
import Tolstoy from "./Tolstoy";

export default () => {
  return (
    <>
      <div className="flex items-center xs:flex-no-wrap flex-wrap justify-center">
        <p className="text-2xl sm:text-3xl text-gray-800 tracking-wide leading-none font-light mb-4 font-serif quotation">
          Good software projects are all alike; every bad software project is
          bad in its own way.{" "}
        </p>
        <div className="text-center">
          <Tolstoy />
          <p className="font-serif text-xs text-gray-800 font-light leading-tighter">
            Leo Tolstoy, 1877
          </p>
        </div>
      </div>
      <div className="flex items-center xs:flex-no-wrap flex-wrap justify-center">
        <p className="text-2xl sm:text-3xl text-gray-800 tracking-wide leading-none font-light mb-4 font-serif quotation">
          We are an Agile team so we must do it this way.
        </p>
        <div className="text-center">
          <Tolstoy />
          <p className="font-serif text-xs text-gray-800 font-light leading-tighter">
            A Scrum Master, Modern Day
          </p>
        </div>
      </div>
    </>
  );
};
