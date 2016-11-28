var Bullet = require('Bullet');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        G.bullets = this;
        this._bullets = [];
        this._pool = new cc.NodePool('Bullet');
    },

    update (dt) {
        // update bullets
        var BLEED = 50;
        var screenSize = cc.Canvas.instance.node.getContentSize();
        var top = screenSize.height / 2 + BLEED;
        var bottom = -top;
        var left = - screenSize.width / 2 - BLEED;
        var right = -left;

        var bullets = this._bullets;
        for (var i = bullets.length - 1; i >= 0; i--) {
            var bullet = bullets[i];
            var pos = bullet.node.position;
            pos.addSelf(bullet.speed.mul(dt));
            // detect boundary
            var outScreen = pos.x < left || pos.x > right || pos.y < bottom || pos.y > top;
            if (outScreen) {
                bullet.node.active = false;
                this.remove(bullet);
                continue;
            }
            // move bullet
            bullet.node.position = pos;
        }
    },

    remove (bullet) {
        cc.js.array.remove(this._bullets, bullet);
        this._pool.put(bullet.node);
    },

    add (prefab, position) {
        // spawn
        var bulletNode = this._pool.get();
        if (!bulletNode) {
            bulletNode = cc.instantiate(prefab);
        }
        bulletNode.active = true;
        var bullet = bulletNode.getComponent('Bullet');
        this._bullets.push(bullet);

        // convert position to local space
        position.subSelf(this.node.parent.position);
        bullet.node.position = position;
        // add to scene
        bullet.node.parent = this.node;
    }
});
