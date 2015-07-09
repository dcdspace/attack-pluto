var snd = new Audio("rocketman.mp3"); // buffers automatically when created
var PlayScreen = me.ScreenObject.extend({
  onDestroyEvent: function() {
    me.gamestat.reset("coins");
  },
  onResetEvent: function() {
    me.levelDirector.loadLevel("1");
    $('#scoreCounter').html('0');
    snd.play();
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    document.getElementById('game_state').innerHTML = "Collect 3 Coins and Find the Rocket to Move on to the Next Level!";
    document.getElementById('instructions').innerHTML = "Arrows to Move and Up to jump.";
  }
});
var TitleScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
    me.input.bindKey(me.input.KEY.UP, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("titleScreen");
      document.getElementById('game_state').innerHTML = "";
      document.getElementById('instructions').innerHTML = "";
      $('#scoreCounter').html('');
    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.PLAY);
    }
    return true;
  },
  draw: function(context){
    context.drawImage(this.title, 0, 0);
  }
});

var DeathScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
    me.input.bindKey(me.input.KEY.UP, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("DiePage");
      document.getElementById('game_state').innerHTML = "";
      document.getElementById('instructions').innerHTML = "";
      $('#scoreCounter').html('');
    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.PLAY);
    }
    return true;
  },
  draw: function(context){
    context.drawImage(me.loader.getImage("DiePage"), 0, 0);
  }
});

var loadingScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("loading");
    }
  },
  draw: function(context){
    context.drawImage(me.loader.getImage("loading"), 0, 0);
  }
});

