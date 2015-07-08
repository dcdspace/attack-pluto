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
    if (this.bottom > 1000){ this.gameOver(); }
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
    me.gamestat.setValue("currentLevel", 1);
    me.gamestat.setValue("coins", 0);
    me.state.change(me.state.MENU);
    $('#scoreCounter').html('');

  },
  nextLevel: function () {
    var currentLevel = me.gamestat.getItemValue('currentLevel');
    console.log("current level: " + currentLevel)
    me.gamestat.setValue("currentLevel",currentLevel + 1);
    console.log("new current level: " +  me.gamestat.getItemValue('currentLevel'))
    me.levelDirector.loadLevel(me.gamestat.getItemValue('currentLevel'));
    me.gamestat.setValue("coins", 0);
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

var RocketEntity = me.CollectableEntity.extend( {
  init: function(x, y, settings) {
    this.parent(x, y, settings);

  },
  onCollision: function (res, obj) {
    if(me.gamestat.getItemValue("coins") >= me.gamestat.getItemValue("totalCoins")) {
      //advance to next level
      obj.nextLevel();
    }
    else {
      alert ('please collect at least 3 coins to proceed!');
      console.log("coins: " + me.gamestat.getItemValue('coins') + "total: " + me.gamestat.getItemValue('totalCoins'));
      this.collidable = false;
    }
  }
});
var CoinEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    me.gamestat.updateValue("coins", 1);
    console.log("coins: " + me.gamestat.getItemValue('coins'));
    RocketEntity.collidable = true;
    this.collidable = false;
    me.game.remove(this);
    //if(me.gamestat.getItemValue("coins") === me.gamestat.getItemValue("totalCoins")){
    //  if (me.gamestat.getItemValue("currentLevel") == 3) {
    //    obj.gameOver();
    //  }
    //  else
    //  {
    //    obj.nextLevel();
    //  }
    //}

    $('#scoreCounter').html(me.gamestat.getItemValue('coins') * 100);
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
    var snakeTop = this.bottom - 3
    console.log("player: " + obj.pos.y + "snake: " + this.pos.y);
    if (obj.pos.y < this.pos.y) {
      obj.forceJump();
      me.game.remove(this);
    }
    else {
      console.log('you died');
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