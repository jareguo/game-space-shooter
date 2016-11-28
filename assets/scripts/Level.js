cc.Class({
    extends: cc.Component,

    properties: {
        enemy: cc.Prefab,
        enemys: cc.Node,
        interval: 2,
    },

    onLoad: function () {

    },

    onEnable () {
        this.schedule(this.spawn, this.interval);
    },

    onDisable () {
        this.unschedule(this.spawn);
    },

    spawn () {
        var enemyNode = cc.instantiate(this.enemy);
        enemyNode.active = true;
        enemyNode.parent = this.enemys;
        enemyNode.x = cc.lerp(-300, 300, Math.random());
        enemyNode.y = 540;
    }
});
