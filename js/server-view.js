var ServerView = (function(){
  function create(){
    var serverView = {};
    serverView.dom = {};
    bind(serverView);

    serverView.init();

    return serverView;
  }
  function bind(serverView){
    serverView.init = init.bind(serverView);
    serverView.gatherSelectors = gatherSelectors.bind(serverView);
    serverView.attachEvents = attachEvents.bind(serverView);
    serverView.onStartClick = onStartClick.bind(serverView);
    serverView.onLocationClick = onLocationClick.bind(serverView);
    serverView.onKillClick = onKillClick.bind(serverView);
    serverView.getUserFolder = getUserFolder.bind(serverView);
    serverView.onKill = onKill.bind(serverView);
    serverView.onServerError = onServerError.bind(serverView);
  }
  function init(){
    this.gatherSelectors();
    this.attachEvents();
    chromep.runtime.getBackgroundPage().then(backgroundPage => {
      this.backgroundPage = backgroundPage;
      this.server = backgroundPage.controller.server;
    });
  }
  function gatherSelectors(){
    this.dom.startButton = document.getElementById("btn-start");
    this.dom.locationButton = document.getElementById("btn-location");
    this.dom.killButton = document.getElementById("btn-kill");
    this.dom.serverInfo = document.getElementById("server-info");
    this.dom.ip = document.getElementById("ip");
    this.dom.port = document.getElementById("port");
  }
  function attachEvents(){
    this.dom.startButton.addEventListener("click", this.onStartClick);
    this.dom.locationButton.addEventListener("click", this.onLocationClick);
    this.dom.killButton.addEventListener("click", this.onKillClick);
  }
  function onStartClick(){
    if(!this.dom.ip.value){
      console.log("setup ip first");
      return;
    }
    if(!this.dom.port.value){
      console.log("setup port first");
      return;
    }
    if(!this.fileServer){
      console.log("server not ready or failed to create");
      return;
    }

    this.ip = this.dom.ip.value;
    this.port = this.dom.port.value;
	this.dom.startButton.disabled = true;
	this.dom.killButton.disabled = false;

    if(this.fileServer.isRunning()){
      console.log("already running");
    }else{
      this.fileServer.start(this.ip, this.port);
    }

	this.dom.serverInfo.innerText = this.ip + ":" + this.port;
	this.dom.serverInfo.href = "http://" + this.ip + ":" + this.port;
  }
  function onKill(){
    this.dom.startButton.disabled = false;
	this.dom.killButton.disabled = true;
  }
  function onServerError(error){
    console.error(error);
  }
  function onKillClick(){
    this.dom.startButton.disabled = true;
	this.dom.killButton.disabld = false;
	this.fileServer.kill();
  }

  return {
    create : create
  };
})();
