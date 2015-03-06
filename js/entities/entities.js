game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }

            }]);
        this.body.setVelocity(5, 0);
        //sets the key to move right
    },
    update: function(delta) {
        if (me.imput.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            //allows player to move right
        } else {
            this.body.vel.x = 0;

        }
        this.body.update(delta);
        return true;
    }
});