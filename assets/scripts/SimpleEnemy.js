cc.Class({
    extends: require('Enemy'),

    properties: {
    },

    update (dt) {
        var speed = getDir(this.node).mul(this.velocity * dt);
        this.detectBoundary();
    }
});
