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
        this.body.setVelocity(5, 20);
        this.facing = "right";

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            //allows player to move right
        } else if (me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
        } else {
            this.body.vel.x = 0;
            this.flipX(true);
        }

        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets the current animation to attack and once its done it goes to idle
                this.renderable.setCurrentAnimation("attack", "idle");
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }



        if (me.input.isKeyPressed("jump")) {

            if (!this.body.jumping) {
                this.body.vel.y = -this.body.accel.y * me.timer.tick;

            }
        }
        if (me.input.isKeyPressed("cheat")) {
            me.input.unbindKey(me.input.KEY.CTRL);
            var code = prompt("Enter Code");

            if (code === "Bill Gates") {
                confirm("You Now Have More Money Than You Know What To Do With");

            }

            if (code === "Max Ki") {
                confirm("You Have Maxed Out Your Ki");


            }
            
            if (code === "KameHameHa") {
                confirm("You Have Unlocked The KameHameHa");

            }
            
            if (code === "KaioKen") {
                confirm("You Have Doubled Your Damage");

            }
            
            if (code === "Senzu Bean") {
                confirm("You Have Restored All Your Health");

            }
            

            this.body.vel.y += this.body.accel.y * me.timer.tick;
            me.input.bindKey(me.input.KEY.CTRL, "cheat");

        }
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;
            
            console.log("xdif" + xdif + "ydif" + ydif);
            
            if(xdif>-35 && this.facing==='right'){
                this.body.vel.x = 0;
                this.pos.x = this.pos.x - 1;
            }else if(xdif<57 && this.facing==='left')
                this.body.vel.x = 0;
                this.pos.x = this.pos.x + 1;
        }
    }
});

game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
        this.broken = false;
        this.heatlh = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "PlayerBaseEntity";
    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;

        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }

});

game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
        this.broken = false;
        this.heatlh = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "EnemyBaseEntity";
    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;

        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }

});