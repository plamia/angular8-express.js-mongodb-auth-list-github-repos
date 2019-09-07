const request = require('request');

module.exports = {
   getPinnedRepos: function () {
        return new Promise((resolve, reject) => {
            request.post({
                url: 'https://api.github.com/graphql',
                json: { "query": "query { organization(login: \"vmware\") { pinnedRepositories(first: 100) { edges { node { url name licenseInfo { name } ref(qualifiedName: \"master\") { target { ... on Commit { history { totalCount } } } } refs(first: 0, refPrefix: \"refs/heads/\") { totalCount } collaborators(first:0) { totalCount } releases(first:0) { totalCount } } } } } }" },
                headers: {
                    'user-agent': 'express.js',
                    'Authorization': 'Bearer 6822eeacdbc82f6bfe6cf51268eb11e9311ef095'
                },
                method: 'POST'
            }, (error, response, body) => {
                
                if (error) {
                    reject(error)
                } else {
                    resolve(response);
                }
            });
        });
    },
    getRepoGeneralInfo: function (repoName) {
        return new Promise((resolve, reject) => {
            request.post({
                url: 'https://api.github.com/graphql',
                json: {"query": "query { repository(owner: \"vmware\", name: \"" + repoName + "\") { object(expression: \"master:README.md\") { ... on Blob { text } } } }"},
                headers: {
                    'user-agent': 'express.js',
                    'Authorization': 'Bearer 6822eeacdbc82f6bfe6cf51268eb11e9311ef095'
                },
                method: 'POST'
            }, (error, response, body) => {
                
                if (error) {
                    reject(error)
                } else {
                  
                    resolve(response);
                }
            });
        });
    },
    getRepoCommits: function (repoName) {
        return new Promise((resolve, reject) => {
            request.post({
                url: 'https://api.github.com/graphql',
                json:{
                    "query": "query { repository(name: \"clarity\", owner: \"vmware\") { ref(qualifiedName: \"master\") { target { ... on Commit { id history(first: 50) { edges { node { url messageHeadline oid message author { name email date } } } } } } } } }"},
                headers: {
                    'user-agent': 'express.js',
                    'Authorization': 'Bearer 6822eeacdbc82f6bfe6cf51268eb11e9311ef095'
                },
                method: 'POST'
            }, (error, response, body) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(response);
                }
            });
        });
    },
    getPatch: function(repoName, commitId) {
        return new Promise((resolve, reject) => {
            request.get({
                url: `https://github.com/vmware/${repoName}/commit/${commitId}.patch`,
                headers: {
                    'user-agent': 'express.js',
                    'Authorization': 'Bearer 6822eeacdbc82f6bfe6cf51268eb11e9311ef095'
                }
            }, (error, response, body) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(response);
                }
            });
        });
    }
}
