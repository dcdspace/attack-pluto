var jsApp = {
  onload: function() {
    if (!me.video.init('jsapp', 600, 550, true, 1.0)) {
      alert("html 5 canvas is not supported by this browser.");
      return;
    }
    //if (me.game.HASH.debug === true) {
    //  window.onReady(function () {
    //    me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
    //  });
    //}
    me.audio.init("mp3,ogg");
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(resources);
    me.state.change(me.state.LOADING);
    me.gamestat.add("coins", 0);
    me.gamestat.add("totalCoins", 3);
    me.gamestat.add("currentLevel", 1);
  },
  loaded: function() {
    me.entityPool.add("player", PlayerEntity);
    me.entityPool.add("coin", CoinEntity);
    me.entityPool.add("rocket", RocketEntity);
    me.entityPool.add("EnemyEntity", EnemyEntity);
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.set(me.state.MENU, new TitleScreen());
    me.state.transition("fade", "#00000", 250);
    me.state.change(me.state.MENU);
  }
};
window.onReady(function() {
  jsApp.onload();
});
