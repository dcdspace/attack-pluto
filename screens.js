var PlayScreen = me.ScreenObject.extend({
  onDestroyEvent: function() {
    me.gamestat.reset("coins");
  },
  onResetEvent: function() {
    me.levelDirector.loadLevel("1");
    //me.audio.playTrack("rocketman");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    document.getElementById('game_state').innerHTML = "Collect all of the coins!";
    document.getElementById('instructions').innerHTML = "Arrows to move and Space/Up to jump.";
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
    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.PLAY);
      //me.audio.playTrack("rocketman.mp3");
    }
    return true;
  },
  draw: function(context){
    context.drawImage(this.title, 0, 0);
  }
});

var HUD = me.Container.extend({

  init: function() {
    // call the constructor
    this._super(me.Container, 'init');

    // persistent across level change
    this.isPersistent = true;

    // make sure we use screen coordinates
    this.floating = true;

    // make sure our object is always draw first
    this.z = Infinity;

    // give a name
    this.name = "HUD";

    // add our child score object at the right-bottom position
    this.addChild(new game.HUD.ScoreItem(630, 440));
  }
});

/**
 * a basic HUD item to display score
 */

game.HUD.ScoreItem = me.Renderable.extend({

  /**
   * constructor
   */
  init: function(x, y) {

    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);


    // local copy of the global score
    this.score = -1;
  },

  /**
   * update function
   */
  update : function (dt) {
    // we don't do anything fancy here, so just
    // return true if the score has been updated
    if (this.score !== game.data.score) {
      this.score = game.data.score;
      return true;
    }
    return false;
  },

  /**
   * draw the score
   */
  draw : function (renderer) {
    // draw it baby !
  }
});
