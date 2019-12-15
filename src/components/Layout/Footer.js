import React from "react";
import { Link } from "gatsby";
import Twitter from "../../img/svg/brands/twitter.svg";
import Instagram from "../../img/svg/brands/instagram.svg";
import { Section } from "../UI";

import { useGlobalContent } from "../../hooks";

export default () => {
  const { siteName, twitterUrl, instagramUrl } = useGlobalContent();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900">
      <Section>
        <div className="flex flex-col-reverse xs:flex-row justify-between items-center border-b border-gray-800 pt-6 pb-4">
          <p className="mt-2 xs:mt-0 text-center text-gray-500 text-sm pr-2">
            © {year} {siteName}. All rights reserved.
          </p>
          <div className="flex-row justify-center text-center xs:text-left flex sm:flex-row xs:flex-col">
            <Link
              to="/privacy-policy"
              className="py-1 sm:py-0 text-sm underline text-gray-500 transition hover:text-gray-400 mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-use"
              className="py-1 sm:py-0 text-sm underline text-gray-500 transition hover:text-gray-400"
            >
              Terms of Use
            </Link>
          </div>
        </div>
        <div className="py-6">
          <div className="flex items-center justify-center">
            <p className="text-sm text-white text-gray-500 pr-6">
              Connect with us
            </p>
            <a
              title="Twitter"
              className="mr-4 p-2 text-center hover:cursor-pointer text-white bg-gray-800 hover:text-gray-300 text-gray-400 hover:bg-gray-700 transition"
              href={twitterUrl}
            >
              <Twitter className="fill-current w-6 h-6" />
            </a>
            <a
              title="Instagram"
              className="p-2 text-center hover:cursor-pointer hover:text-gray-300 text-gray-400 bg-gray-800 hover:bg-gray-700 transition"
              href={instagramUrl}
            >
              <Instagram className="fill-current w-6 h-6" />
            </a>
          </div>
        </div>
      </Section>
    </footer>
  );
};
