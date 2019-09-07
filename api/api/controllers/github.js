let request = require('../requests');
let NodeCache = require('node-cache');
let cache = new NodeCache({ stdTTL: 120, checkPeriod: 240 });

let showdown = require('showdown')
let converter = new showdown.Converter();


module.exports.getPinnedRepos = function(req, res) {
    request.getPinnedRepos().then((data) => {
       const dataBody = data.body.data.organization.pinnedRepositories.edges;
        cache.set('/pinnedRepos', dataBody, 240);
        res.status(200).json(dataBody);
    }).catch((error) => res.send(error));
},

module.exports.getRepoGeneralInfo = function (req, res) {
    request.getRepoGeneralInfo(req.params.nameId).then((data) => {
        const dataBody = { "response": converter.makeHtml(data.body.data.repository.object.text) };
        cache.set(`/generalInfo/${req.params.nameId}`, dataBody, 240);
        res.status(200).json(dataBody);
    }).catch((error) => res.send(error));
        
},
module.exports.getRepoCommits = function (req, res) {
    request.getRepoCommits(req.params.nameId).then((data) => {
        const dataBody = data.body.data.repository.ref.target.history.edges;
        cache.set(`/commits/${req.params.nameId}`, dataBody, 120);
        res.status(200).json(dataBody);
    }).catch((error) => res.send(error));
          
},
module.exports.getPatch = function(req, res) {
    request.getPatch(req.params.nameId, req.params.patchId).then((data) => {
        const dataBody = {"response": data.body};
        cache.set(`/patch/${req.params.nameId}/${req.params.patchId}`, dataBody, 240);
        res.status(200).json(dataBody);
    }).catch((error) => res.send(error));
}


