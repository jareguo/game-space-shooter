// setup engine and editor
cc.view.enableAntiAlias(false);

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad () {
        G.game = this;
        this.state = G.States.Playing;

        cc.director.getCollisionManager().enabled = true;
    },

    changeState (newState) {
        this.state = newState;
        switch (newState) {
            case G.States.Playing:
                break;
            case G.States.Paused:
                break;
            case G.States.Stopped:
                break;
        }
    }
});
