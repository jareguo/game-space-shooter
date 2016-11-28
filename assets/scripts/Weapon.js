cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Prefab,
        interval: 0.1,
    },

    onEnable () {
        this.schedule(this.fire, this.interval);
    },

    onDisable () {
        this.unschedule(this.fire);
    },

    fire () {
        G.bullets.add(this.bullet, this.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
    }
});
