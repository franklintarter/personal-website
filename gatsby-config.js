const path = require("path");

module.exports = {
  siteMetadata: {
    siteUrl: "https://franklintarter.com",
    title: "Franklin Tarter",
    image: "/img/mark.png", // Path to your image you placed in the 'static' folder
    description: "Franklin Tarter's personal website",
    twitterUrl: "https://twitter.com/franklintarter"
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/templates/page-default.js"),
          "basic-pages": require.resolve("./src/templates/page-basic.js")
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Franklin Tarter's Personal Website",
        short_name: "Franklin Tarter's Website",
        start_url: "/",
        background_color: "#fff", // TODO ensure color works well as background for Mark Color
        theme_color: "#6b37bf", // TODO ensure color works well as background for Mark
        // TODO Check favicon here after setting themes https://realfavicongenerator.net/
        display: "standalone",
        icon: "static/img/mark.png", // TODO replace with Project asset should be 50:50 high quality ratio
        legacy: true,
        include_favicon: true,
        crossOrigin: ``
      }
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KQG5W65"
      }
    },
    {
      resolve: "@rhysforyou/gatsby-plugin-safari-site-icon",
      options: {
        icon: "./static/img/logo.svg", // TODO using main logo by default change to mark if needed
        color: "#5bbad5" // Apple Default
      }
    },
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/style-guide"]
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /img/
        }
      }
    },
    {
      resolve: "gatsby-plugin-seo",
      options: {
        siteName: "Franklin Tarter",
        defaultSiteImage: "/img/logo.png",
        siteUrl: "https://franklintarter.com",
        twitterCreator: "@franklintarter",
        twitterSite: "@franklintarter",
        globalSchema: `{
            "@type": "WebSite",
            "@id": "https://franklintarter.com/#website",
            "url": "https://franklintarter.com/",
            "name": "Franklin Tarter's Personal Website",
            "image": {
              "@type": "ImageObject",
              "@id": "https://example.com/#logo",
              "url": "https://example.com/img/logo.png",
              "caption": "Franklin Tarter Logo"
            }
          }`
      }
    },
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        content: [
          path.join(process.cwd(), "src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}")
        ],
        tailwind: true,
        purgeOnly: ["src/styles/global.css"]
      }
    } // must be after other CSS plugins
  ]
};
