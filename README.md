**DESCRIPTION**
-
This project creates a unified GraphQL schema from the following GraphQL APIs:

1. Contentful
2. Magento

This gives us the benefit of reducing multiple data queries for our data in a single request from one schema.

<img src="./diagram.png" height="450">

---
**Installation**
-

`git@github.com:rukh93/apollo-server-schema-merging.git`\
`cd apollo-server-schema-merging`\
`cp .env.example .env`\
`npm install`\
`npm run dev`

---

**API KEY**
-

In the .env.example file you can see example of API_KEY.\
This key is used only in production mode to disable unauthorized access to the schema. See: `src/server.js`\
You need to pass it from your web application to the server in the request headers as `'api-key': YOUR_API_KEY`

---

**Contentful**
-
Following this link you can find information about the token and the space id:
https://www.contentful.com/developers/docs/references/authentication/

Following this link you can find information regarding graphql:
https://www.contentful.com/developers/docs/references/graphql/

Example of the contentful graphql endpoint:
https://graphql.contentful.com/content/v1/spaces/{SPACE}

Contentful .env file has key *CONTENTFUL_EXTENSION*.\
This extension renames your graphql objects in case if you have in two different schemas the same object names.\
Keep it empty if you don't have the same object names in two different schemas.\
For more information: https://www.graphql-tools.com/docs/schema-wrapping

---

**Magento**
-

.env file has key *MAGENTO_EXTENSION*.\
This extension renames your graphql objects in case if you have in two different schemas the same object names.\
Keep it empty if you don't have the same object names in two different schemas.\
For more information: https://www.graphql-tools.com/docs/schema-wrapping

---

**Apollo Server**
-

Following this link you can find information regarding Apollo Server:
https://www.apollographql.com/docs/apollo-server

---