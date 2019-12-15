const gc = require("graphql-request");

// import { request } from "graphql-request";

const query = `{
        allSitePage {
          nodes {
            path
          }
        }
      }`;

const fs = require("fs");
const path = require("path");

const baseUrl = "http://localhost:8000";
(async () => {
  const data = await gc.request("http://localhost:8000/___graphql", query);
  const paths = data.allSitePage.nodes.map(n => `${baseUrl}${n.path}`);

  fs.writeFileSync(
    path.join(__dirname, "../paths.json"),
    JSON.stringify(paths)
  );
})();
