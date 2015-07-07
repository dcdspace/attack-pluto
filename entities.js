var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(4, 10);
    this.gravity = this.gravity / 3
  },
  update: function() {
    if (me.input.isKeyPressed('left')) { this.move(true); }
    else if (me.input.isKeyPressed('right')) { this.move(false); }
    else { this.vel.x = 0; };
    if (me.input.isKeyPressed('jump')) { this.doJump(); }
    me.game.collide(this);
    this.updateMovement();
    if (this.bottom > 900){ this.gameOver(); }
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  playerJump: function () {
    this.doJump();
  },
  gameOver: function() {
    me.state.change(me.state.MENU);
  },
  nextLevel: function () {
    me.gamestat.updateValue("currentLevel", 1);
    me.levelDirector.loadLevel("level2");
    me.gamestat.updateValue("coins", 0);
    me.gamestat.updateValue("totalCoins", 3);

  },
  youWin: function() {
    me.state.change(me.state.MENU);
    document.getElementById('game_state').innerHTML = "You Win!";
    document.getElementById('instructions').innerHTML = "";
  },
  move: function(moveLeft) {
    this.flipX(moveLeft);
    this.vel.x += moveLeft ? -0.1 : 0.1;
  }
});

var RocketEntity = me.ObjectEntity.extend( {
  init: function(x, y, settings) {
    this.parent(x, y, settings);

  }
});
var CoinEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    me.gamestat.updateValue("coins", 1);
    this.collidable = false;
    me.game.remove(this);
    if(me.gamestat.getItemValue("coins") === me.gamestat.getItemValue("totalCoins")){
      if (me.gamestat.getItemValue("currentLevel") == 2) {
        obj.gameOver();
      }
      else
      {
        obj.nextLevel();
      }
    }
  }
});
var EnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    //settings.image = "badguy";
    //settings.spritewidth = 16;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(4);
    this.collidable = true;
  },
  onCollision: function(res, obj) {
    console.log("player: " + obj.bottom + "snake: " + this.top);
    if (obj.bottom < this.top + 3) {
      obj.forceJump();
      me.game.remove(this);
    }
    else {
      obj.gameOver();
    }
  },
  update: function() {
    if (!this.visible){
      return true;
    }
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      }
      else if (!this.walkLeft && this.pos.x >= this.endX){
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    }
    else { this.vel.x = 0; }
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});
