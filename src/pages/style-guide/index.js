import React, { useState } from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../../components/Layout";

import { Section, Button, TextInput } from "../../components/UI";
import {
  HeroTitle,
  HeroSubtitle,
  H1,
  H2,
  H3,
  H4,
  P,
  A,
  Lead,
  BlockQuote
} from "../../components/Typography";

export default () => {
  const [value, setValue] = useState("");

  return (
    <Layout pageTitle="Style Guide">
      <SEO
        pagePath="/style-guide"
        title="Style Guide"
        description="A style guide for website colors, UI components and typography."
      />

      <Section className="py-12 bg-gray-300">
        <div className="flex">
          <div className="m-2 w-24 h-24 bg-brand" />
          <div className="m-2 w-24 h-24 bg-white" />
          <div className="m-2 w-24 h-24 bg-black" />
        </div>
      </Section>
      <Section className="py-12 bg-gray-400">
        <div className="flex justify-between flex-wrap">
          <Button className="mb-2">Standard Button</Button>
          <Button className="mb-2" to="/">
            Gatsby Link
          </Button>
          <Button className="mb-2" href="/style-guide">
            External Link
          </Button>
          <Button className="mb-2" buttonStyle="outlined">
            Outlined Button
          </Button>
          <Button className="mb-2" buttonStyle="outlined-white">
            Outlined White
          </Button>
        </div>
      </Section>
      <Section className="py-12">
        <div className="flex pt-6">
          <TextInput
            label="Your Email"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="mr-4"
          />
          <Button type="submit">Submit</Button>
        </div>
        <div className="flex pt-6">
          <TextInput
            isValid={false}
            validationMessage="This field is not valid somehow"
            label="Other Field"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="mr-4"
          />
          <Button type="submit">Submit</Button>
        </div>
      </Section>
      <Section className="py-12">
        <HeroTitle>Hero Title</HeroTitle>
        <HeroSubtitle>Hero Subtitle - X but for Y&apos;s.</HeroSubtitle>
      </Section>
      <Section className="py-12">
        <H1>First Heading - This Heading Will Used Somehow</H1>
        <H2>Second Heading - This Heading is Going To Be Used Somehow</H2>
        <H3>Third Heading - This Heading is Going To Be Used Somehow</H3>
        <H4>Fourth Heading - This Heading is Going To Be Used Somehow</H4>
        <Lead>This is a leading line that is going to be used somewhere.</Lead>
        <P>
          Welcome to <strong>our</strong> website. Never <em>ever</em> say this
          when you{" "}
          <A to="/" title="Something">
            start something
          </A>
          . This demonstrates what a paragraph of text will look like on the
          site. Check the overall feel, line-height, and pairing before deciding
          on the font.
        </P>
        <BlockQuote>
          This is a very long line that will still be quoted properly when it
          wraps. Keep writing to make sure this is long enough to actually wrap
          for everyone.
        </BlockQuote>
      </Section>
    </Layout>
  );
};
