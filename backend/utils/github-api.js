const { repos } = require('../seeders/repos');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.SPARCS_ADMIN_TOKEN });


async function getCommits(user) {
  let total_commits = 0;
  
  for (let repo of repos)
  {
    let res = await octokit.request("GET /repos/sparcs-kaist/{repo}/commits?author={user}&sort=updated&per_page=100", {
      repo: repo,
      user: user,
    });
    
    if (res.data)
      total_commits += res.data.length;
  }
  
  return total_commits;
}


async function getPRs(user) {
  let total_prs = 0;

  for (let repo of repos)
  {
    let res = await octokit.request("GET /repos/sparcs-kaist/{repo}/pulls?state=all&sort=updated&per_page=100", {
      repo: repo,
    });
    
    for (let i of res.data)
    {
      if (i.user.login == user)
      {
        total_prs += 1;
      }
    }
  }

  return total_prs;
}


async function getMyRepos(user) {
  let myRepos = [];

  for (let repo of repos)
  {
    let res = await octokit.request('GET /repos/sparcs-kaist/{repo}/contributors', {
      repo: repo
    });
    
    for (let i of res.data)
    {
      if (i.login == user)
      {
        myRepos.push(repo);
      }
    }
  }

  return myRepos;
}

module.exports = { getCommits, getPRs, getMyRepos };