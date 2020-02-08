const path = require("path");

module.exports = {
  siteMetadata: {
    siteUrl: "https://franklintarter.com",
    title: "Franklin Tarter",
    image: "/img/logo-bg.png", // Path to your image you placed in the 'static' folder
    description: "Franklin Tarter's personal website",
    twitterUrl: "https://twitter.com/franklintarter",
    linkedInUrl: "https://www.linkedin.com/in/franklintarter",
    githubUrl: "https://github.com/franklintarter"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/content/articles`,
        name: "articles"
      }
    },
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/content/img`,
        name: "content-images"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/templates/page-default.js"),
          "basic-pages": require.resolve("./src/templates/page-basic.js")
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`
          },
          {
            resolve: `gatsby-remark-images`,
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Franklin Tarter's Personal Website",
        short_name: "Franklin Tarter's Website",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#fff",
        // TODO Check favicon here after setting themes https://realfavicongenerator.net/
        display: "standalone",
        icon: "static/img/logo.png",
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /img/
        }
      }
    },
    "gatsby-plugin-react-helmet",
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
              "@id": "https://franklintarter.com/#franklin",
              "url": "https://franklintarter.com/img/franklin.png",
              "caption": "Franklin Tarter"
            }
          }`
      }
    },
    `gatsby-plugin-remove-trailing-slashes`,
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
