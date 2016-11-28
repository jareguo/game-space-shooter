cc.Class({
    extends: cc.Component,

    onLoad () {
        this._autoOffListeners = [];
    },

    onDestroy () {
        this.offAll();
    },

    offAll () {
        for (var i = 0; i < this._autoOffListeners.length; i++) {
            var { target, event, callback } = this._autoOffListeners[i];
            target.off(event, callback, this);
        }
    },

    on (target, event, callback) {
        target.on(event, callback, this);
        this._autoOffListeners.push({ target, event, callback });
    },
});
