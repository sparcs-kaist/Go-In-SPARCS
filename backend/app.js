const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sequelize = require('./utils/sequelize');
const http = require('http');
const app = express();
const server = http.createServer(app);
const api_auth = require('./routes/auth');
const api_test = require('./routes/apitest')
const api_id = require('./routes/id');
const api_github_id = require('./routes/github-id');
const authNeeded = require('./middlewares/auth-api');

const { graphqlHTTP } = require('express-graphql');
const user_schema = require('./schema/user_schema')
const user_resolver = require('./resolver/user_resolver')
/* const { ApolloServer, gql } = require("apollo-server");

// apollo
const aserver = new ApolloServer({ typeDefs, resolvers });


aserver.listen().then(({ url }) => {
    console.log(`🚀 Apollo Server ready at ${url}`);
});
 */
//middleware
app.use(bodyParser.json())
app.use((err, req, res, next) => {
    console.log(err);
    if (!res.headersSent) {
        res.status(500).send('500ISE T_T');
    }
});

app.get('/api/id', authNeeded, api_id);
app.post('/api/auth', api_auth);
app.get('/api/githubid', authNeeded, api_github_id)
app.get('/api/test', api_test)
app.use('/api/graphql/user', authNeeded, graphqlHTTP({
    schema: user_schema,
    rootValue: user_resolver,
}));



app.get('/', (req, res) => {
    res.status(419).json({
        ok: true,
        me: 'teapot'
    });
});

(async () => {
    await sequelize.sync();
    const port = parseInt(process.env.PORT || '3008');
    server.listen(port);

    console.log("Backend listening from " + port);
})();

