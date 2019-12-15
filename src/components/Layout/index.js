import React from "react";
import { MDXProvider } from "@mdx-js/react";

import Footer from "./Footer";
import Header from "./Header";
import { MdxComponentMap } from "../Typography";

const Layout = ({ children }) => {
  return (
    <div className="h-full">
      <div className="flex flex-col h-full items-stretch p-4 max-w-2xl mx-auto">
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
