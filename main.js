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
    me.gamestat.add("totalCoins", 1);
    me.gamestat.add("currentLevel", 1);
    me.gamestat.setValue("currentLevel", 1);
    me.gamestat.setValue("totalCoins", 2);


  },
  loaded: function() {
    me.entityPool.add("player", PlayerEntity);
    me.entityPool.add("coin", CoinEntity);
    me.entityPool.add("rocket", RocketEntity);
    me.entityPool.add("EnemyEntity", EnemyEntity);
    me.entityPool.add("higherJump", BootJumpEntity);
    me.entityPool.add("fasterRun", BootFastEntity);
    me.entityPool.add("slowerSpeed", BootSlowEntity);
    me.entityPool.add("invinsibility", InvinsibilityEntity);
    me.entityPool.add("growth", GrowEntity);
    me.entityPool.add("shrink", ShrinkEntity);
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.set(me.state.MENU, new TitleScreen());
    me.state.set(me.state.LOADING, new loadingScreen());
    me.state.set(me.state.GAMEOVER, new DeathScreen());
    me.state.transition("fade", "#00000", 250);
    me.state.change(me.state.MENU);
  }
};
window.onReady(function() {
  jsApp.onload();
  var myVideo = document.getElementById("aerosmith");
  $('#aerosmith').hide('slow');
  $('#restart').click(function() {
    $('#aerosmith').hide('slow');
    myVideo.load();
  });
});

