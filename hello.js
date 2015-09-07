if (Meteor.isClient) {
  var getPlayerItemsCallback = null;
  Session.setDefault('playersItems', []);

  getPlayersItemsCallback = Meteor.bindEnvironment(function(err, results) {
    var res = null;
    var _results = [];

    if (!err) {
      res = JSON.parse(results.content).result.items;
      _results = _.map(res, function (item, i) {
        return { _id: item.id, _original_id: item.original_id };
      });
      Session.set('playersItems', _results);
    } else {
      console.log(err);
    }
  });

  Meteor
    .call('getPlayersItems', getPlayersItemsCallback);

  Template.hello.helpers({
    playersItems: function () {
      return Session.get('playersItems');
    }
  });
}

if (Meteor.isServer) {
  var apiURL = 'http://api.steampowered.com/IEconItems_730/GetPlayerItems/v0001/?key=705778F03D8B8B68BEE5A4EB06109A00&SteamID=76561197986025120';

  Meteor.startup(function () {});

  Meteor.methods({
    getPlayersItems: function () { return HTTP.call('GET', apiURL); }
  });
}
