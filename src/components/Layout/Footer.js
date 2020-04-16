import React from "react";
import Twitter from "../../img/svg/brands/twitter.svg";
import LinkedIn from "../../img/svg/brands/linkedin-in.svg";
import Github from "../../img/svg/brands/github.svg";
import { Section, Profile } from "../UI";

import { useMetadata } from "../../hooks";

export default () => {
  const { twitterUrl, linkedInUrl, githubUrl } = useMetadata();
  return (
    <footer className="mt-16">
      <Section>
        <div className="py-6">
          <div className="flex items-center mb-4 justify-center">
            <div className="mr-4">
              <Profile />
            </div>
            <p className="w-64 text-sm text-white text-gray-700 pr-6 font-sans">
              I&apos;m a developer in Vancouver, WA. <br />
              Let&apos;s connect.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <a
              title="Twitter"
              className="mr-4 p-2 text-center hover:cursor-pointer bg-gray-200 hover:text-gray-800 text-gray-700 hover:bg-gray-300 transition"
              href={twitterUrl}
            >
              <Twitter className="fill-current w-6 h-6" />
            </a>
            <a
              title="Github"
              className="mr-4 p-2 text-center hover:cursor-pointer bg-gray-200 hover:text-gray-800 text-gray-700 hover:bg-gray-300 transition"
              href={githubUrl}
            >
              <Github className="fill-current w-6 h-6" />
            </a>
            <a
              title="LinkedIn"
              className="mr-4 p-2 text-center hover:cursor-pointer bg-gray-200 hover:text-gray-800 text-gray-700 hover:bg-gray-300 transition"
              href={linkedInUrl}
            >
              <LinkedIn className="fill-current w-6 h-6" />
            </a>
          </div>
        </div>
      </Section>
    </footer>
  );
};
