cc.Class({
    extends: require('AutoOff'),

    properties: {
        maxHp: 1,
        hp: 1,
    },

    onEnable () {
        this.hp = this.maxHp;
    },

    onLoad () {
        this._super();
        this.sprite = this.getComponent(cc.Sprite);
    }
});
