
var asynclib = require('async');

module.exports = {
    getStory: function(req, res) {
        res.status('200').json({'success': 'getStory ok'});
    },
    updateStory: function(req, res) {
      res.status('200').json({'success': 'updateStory ok'});
    },
    setStory : function(req, res){
      res.status('200').json({'success': 'setStory ok'});
    }

}
