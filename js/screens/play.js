game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        me.levelDirector.loadLevel("Test Map");
        //Loads level into the game
        var player = me.pool.pull("player", 0, 300, {});
        me.game.world.addChild(player, 5);
        //adds plaayers into the world
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.W, "jump");
        me.input.bindKey(me.input.KEY.E, "attack");
        me.input.bindKey(me.input.KEY.SHIFT, "cheat");
        me.input.bindKey(me.input.KEY.R, "kamehameha");
        me.input.bindKey(me.input.KEY.I, "ssj1-instantkamehameha");
        me.input.bindKey(me.input.KEY.O, "ssj2-angrykamehameha");
        me.input.bindKey(me.input.KEY.P, "ssj3-dragonfist");
        me.input.bindKey(me.input.KEY.L, "chargeki");
        me.input.bindKey(me.input.KEY.K, "instanttransmition");
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
