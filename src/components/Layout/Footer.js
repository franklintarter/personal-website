import React from "react";
import { Link } from "gatsby";
import Twitter from "../../img/svg/brands/twitter.svg";
import { Section } from "../UI";

import { useMetadata } from "../../hooks";

export default () => {
  const { twitterUrl } = useMetadata();
  return (
    <footer className="border-t border-gray-400">
      <Section>
        <div className="py-6">
          <div className="flex items-center justify-center">
            <p className="text-sm text-white text-gray-700 pr-6">
              Let&apos;s connect
            </p>
            <a
              title="Twitter"
              className="mr-4 p-2 text-center hover:cursor-pointer text-white bg-gray-800 hover:text-gray-300 text-gray-400 hover:bg-gray-700 transition"
              href={twitterUrl}
            >
              <Twitter className="fill-current w-6 h-6" />
            </a>
            <a
              title="Twitter"
              className="mr-4 p-2 text-center hover:cursor-pointer text-white bg-gray-800 hover:text-gray-300 text-gray-400 hover:bg-gray-700 transition"
              href={twitterUrl}
            >
              <Twitter className="fill-current w-6 h-6" />
            </a>
            <a
              title="Twitter"
              className="mr-4 p-2 text-center hover:cursor-pointer text-white bg-gray-800 hover:text-gray-300 text-gray-400 hover:bg-gray-700 transition"
              href={twitterUrl}
            >
              <Twitter className="fill-current w-6 h-6" />
            </a>
          </div>
        </div>
      </Section>
    </footer>
  );
};
