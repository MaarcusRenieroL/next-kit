import { Installer } from "@/types/global.js";
import { addPackageDependency } from "@/utils/add-package-dependency.js";
import fs from "fs-extra";
import path from "path";

export const graphqlInstaller: Installer = ({ targetDir, projectName, scopedAppName, empty }) => {
  const projectDir = targetDir ? path.join(targetDir, projectName) : projectName;

  if (!projectDir) {
    throw new Error("Project directory is required");
  }

  addPackageDependency({
    projectDir,
    dependencies: ["graphql", "graphql-yoga"],
    devMode: false,
  });

  if (empty) return;

  const base = path.join(projectDir, scopedAppName === "src" ? "src" : "");

  const routeContent = `// @ts-nocheck
import { createSchema, createYoga } from "graphql-yoga";

const schema = createSchema({
  typeDefs: /* GraphQL */ \`
    type Query {
      hello: String!
    }
  \`,
  resolvers: {
    Query: {
      hello: () => "Hello from GraphQL Yoga!",
    },
  },
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS };
`;

  const routeDest = path.join(base, "app/api/graphql/route.ts");
  fs.mkdirSync(path.dirname(routeDest), { recursive: true });
  fs.writeFileSync(routeDest, routeContent);
};
