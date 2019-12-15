import React from "react";
import { SEO } from "gatsby-plugin-seo";

import { Banner } from "../../components/Pages/About";
import Layout from "../../components/Layout";
import { Section } from "../../components/UI";
import { H1, P, UL, LI, H2, H3, BlockQuote } from "../../components/Typography";

const title = "About";
const description = "This is the description of the page.";

export default () => {
  return (
    <Layout>
      <SEO title={title} description={description} pagePath="/about" />
      <Banner />

      <Section className="py-12">
        <H1>About Us</H1>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{" "}
        </P>
        <H2>Interesting Things</H2>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </P>
        <H2>Other Interesting Things</H2>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </P>
        <H3> List of Things</H3>
        <UL>
          <LI>First Thing</LI>
          <LI>
            Second Thing | Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod
          </LI>
          <LI>Third Thing</LI>
        </UL>
        <H2>What Do Our Customers Say?</H2>
        <BlockQuote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </BlockQuote>
      </Section>
    </Layout>
  );
};
