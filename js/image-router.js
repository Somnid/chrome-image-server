var ImageRouter = (function(){

  var defaults = {
  };

  function create(options){
    var router = {};
    bind(router);
    return router;
  }
  function bind(router){
    router.route = route.bind(router);
    router.readFile = readFile.bind(router);
  }
  function route(request){
    return new Promise((resolve, reject) => {
        uri = request.uri;
        uri = FileHelper.removePreceedingSlash(uri);
        uri = FileHelper.removeQueryString(uri);
        if(FileHelper.isDirectory(uri)){
            uri += "index.html";
        }
	});
  }
  return {
    create : create
  };
})();
