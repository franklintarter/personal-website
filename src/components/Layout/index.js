import React from "react";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/react";

import Footer from "./Footer";
import Header from "./Header";
import { MdxComponentMap } from "../Typography";

const Layout = ({ children }) => {
  return (
    <div className="h-full">
      <Helmet>
        <html lang="en" />
        <meta property="og:type" content="business.business" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        {/* TODO customize color should look good as background color for Mark */}
        <meta name="msapplication-TileColor" content="#126798" />
      </Helmet>
      <div className="flex flex-col h-full items-stretch">
        <Header />
        <div id="body" className="flex-grow">
          <MDXProvider components={MdxComponentMap}>{children}</MDXProvider>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
