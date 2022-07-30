var { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    sparcs_id: String
    github_id: String
    commits: Int
    prs: Int
    reviews: Int
    games: Int
    repos: String
    repos_num: Int
    total_pt: Int
    degree: String
  }
  type Query {
    users: [User]
  }
`);
