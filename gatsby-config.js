const path = require("path");

module.exports = {
  siteMetadata: {
    siteTitle: "Mortar Labs Starter",
    siteUrl: "https://gatsby-starter-mortar-labs.franklintarter.now.sh", // TODO This should be the production site, generates the correct robots.txt, no trailing slash
    title: "Mortar Labs Starter",
    image: "/img/mark.png", // Path to your image you placed in the 'static' folder
    description: "A Gatsby starter site"
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
        name: "Site Name", // TODO
        short_name: "Short Name", // TODO
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
        id: "YOUR_GOOGLE_TAGMANAGER_ID" // TODO
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
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [
          `${__dirname}/src/pages/privacy-policy/index.mdx`,
          `${__dirname}/src/pages/terms-of-use/index.mdx`
        ],
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages/privacy-policy/index.mdx`,
        name: "basic-pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/content/global.mdx`,
        name: "global"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages/terms-of-use/index.mdx`,
        name: "basic-pages"
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
      // TODO update
      resolve: "gatsby-plugin-seo",
      options: {
        siteName: "Example Company",
        defaultSiteImage: "/img/logo.png",
        siteUrl: "https://example.com",
        twitterCreator: "@twitterhandle",
        twitterSite: "@twitterhandle",
        globalSchema: `{
            "@type": "WebSite",
            "@id": "https://example.com/#website",
            "url": "https://example.com/",
            "name": "Example Site Title",
            "publisher": {
              "@id": "https://example.com/about/#organization"
            },
            "image": {
              "@type": "ImageObject",
              "@id": "https://example.com/#logo",
              "url": "https://example.com/img/logo.png",
              "caption": "Example Company Logo"
            }
          }`
      }
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        // develop: true, // Activates purging in npm run develop
        content: [
          path.join(process.cwd(), "src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}")
        ],
        tailwind: true,
        purgeOnly: ["src/styles/global.css"] // applies purging only on the bulma css file
      }
    } // must be after other CSS plugins
  ]
};
