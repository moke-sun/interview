/**
 * Created by sunkj on 9/10/2016.
 */


var routeConfig =
  [
    {"path":"/","file":"./routes/index"},
  ];

var routeUse = function(app){
  for(var i in routeConfig){
    var routeFile = require(routeConfig[i].file);
    app.use(routeConfig[i].path, routeFile);
  }
};

var routeObject = {
  init: routeUse
};

module.exports = routeObject;
