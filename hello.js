if (Meteor.isClient) {

  Template.hello.helpers({
    curInv: function () {
      var res;
      Meteor.call('s', function(err, results) {
        if(err) {
          console.log(err);
        } else {
          res = JSON.parse(results.content).result.items;
          var newResult = [];
          for(var i = 0; i < res.length; i++) {
            newResult[i] = {
              _id          : res[i].id,
              _original_id : res[i].original_id
            }
          }
          console.log(newResult);
          return newResult;
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });

  Meteor.methods({
    s:function() {
      var result = HTTP.call('GET','http://api.steampowered.com/IEconItems_730/GetPlayerItems/v0001/?key=705778F03D8B8B68BEE5A4EB06109A00&SteamID=76561197986025120');
      return result;
    }
  })
}
