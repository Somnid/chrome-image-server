var ImageServer = (function(){
  function create(options){
    var imageServer = {};
    bind(imageServer);
    imageServer.setup(options);
    return imageServer;
  }
  function bind(imageServer){
    imageServer.init = init.bind(imageServer);
    imageServer.start = start.bind(imageServer);
    imageServer.kill = kill.bind(imageServer);
    imageServer.onRequest = onRequest.bind(imageServer);
    imageServer.isRunning = isRunning.bind(imageServer);
    imageServer.setupRouter = setupRouter.bind(imageServer);
  }
  function onRequest(request){
    console.log("File Server: processing request for: ", request.uri);
    if(!this.router){
      console.log("Router was not set yet");
      return;
    }
    return this.router.route(request);
  }
  function setupRouter(){
    this.router = ImageRouter.create();
  }
  function isRunning(){
    return this.httpServer.running;
  }
  function start(ip, port){
    this.httpServer.start({
      ip : ip,
      port : port
    });
  }
  function kill(){
    this.httpServer.kill();
  }
  function init(options){
    this.options = options;
    this.httpServer = HttpServer.create({
      onStart : options.onStart,
      onKill : options.onKill,
      onRequest : this.onRequest,
      onError : options.onError,
      autoStart : !!options.ip && !!options.port && !!options.fsRoot,
      port : options.port,
      ip : options.ip
    });
    this.setupRouter();
  }

  return {
    create : create
  };
})();
