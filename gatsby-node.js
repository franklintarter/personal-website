const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

const articleTemplate = path.resolve(`src/templates/article.js`);

// exports.createPages = () => {};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  const result = await graphql(
    `
      query articlesQuery {
        articles: allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
          nodes {
            name
            id
          }
        }
      }
    `
    // { limit: 1000 }
  );

  // if (result.errors) {
  //   throw result.errors;
  // }

  console.log("foo", result.data.articles.nodes);

  result.data.articles.nodes.forEach(({ name, id }) => {
    createPage({ path: name, component: articleTemplate, context: { id } });
  });

  // Create blog post pages.
  // result.data.allMarkdownRemark.edges.forEach(edge => {
  //   createPage({
  //     // Path for this page — required
  //     path: `${edge.node.frontmatter.slug}`,
  //     component: blogPostTemplate,
  //     context: {
  //       // Add optional context data to be inserted
  //       // as props into the page component..
  //       //
  //       // The context data can also be used as
  //       // arguments to the page GraphQL query.
  //       //
  //       // The page "path" is always available as a GraphQL
  //       // argument.
  //     }
  //   });
  // });
};
