cc.Class({
    extends: require('Actor'),

    properties: {
        speed: {
            default: cc.Vec2.ZERO,
            tooltip: 'Local translate per second'
        },
    },

    onLoad () {
        this._super();
    },

    onEnable () {
        var tracer = this.getComponent('Tracer');
        if (tracer) {
            tracer.target = G.player.node;
        }
    },

    update (dt) {
        this.node.position = this.node.position.addSelf(this.speed.mul(dt));
    },

    lateUpdate () {
        this.detectBoundary();
    },

    detectBoundary () {
        var RADIUS = 100;
        var screenSize = cc.Canvas.instance.node.getContentSize();
        var screenBottom = -screenSize.height / 2;

        var pos = this.node.position;
        var outsideScreen = (pos.y - RADIUS < screenBottom);
        if (outsideScreen) {
            this.node.destroy();
        }
    },

    onCollisionEnter (other) {
        if (other.node.group === 'player bullet') {
            this.node.destroy();
        }
    }
});
