cc.Class({
    extends: require('Actor'),

    properties: {
        normalSprite: {
            default: null,
            type: cc.SpriteFrame
        },
        leftSprite: {
            default: null,
            type: cc.SpriteFrame
        },
        rightSprite: {
            default: null,
            type: cc.SpriteFrame
        },
        maxSpeed: 10,
        flame: cc.Node,
        minFlameScale: -1,
        maxFlameScale: -2,
    },

    onLoad () {
        this._super();
        G.player = this;
        this._dest = this.node.position;

        var canvas = cc.find('Canvas');
        this.on(canvas, cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
        this.on(canvas, cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    },

    // onDestroy () {
    //     this._super();
    // },

    onTouchMove (event) {
        var touches = event.getTouches();
        var delta = touches[0].getDelta();
        this._dest.addSelf(delta);
    },

    onTouchEnd (event) {
        this._dest = this.node.position;
    },

    lateUpdate (dt) {
        var pos = this.node.position;
        var delta = this._dest.sub(pos);
        var distanceSqr = delta.magSqr();
        var maxSpeedPerFrame = this.maxSpeed * dt;

        if (distanceSqr > maxSpeedPerFrame * maxSpeedPerFrame) {
            // clamp speed
            delta.normalizeSelf();
            delta.mulSelf(maxSpeedPerFrame);
        }

        this.move(delta);
        this.updateRenderer(delta);

        // keep in screen
        var screenSize = cc.Canvas.instance.node.getContentSize();
        this.node.x = cc.clampf(this.node.x, - screenSize.width / 2, screenSize.width / 2);
        this.node.y = cc.clampf(this.node.y, - screenSize.height / 2, screenSize.height / 2);

        // update flame
        var flameFactor = cc.clampf(delta.y, 0, 8) / 8;
        this.flame.scaleY = cc.lerp(this.minFlameScale, this.maxFlameScale, flameFactor);
    },

    move (delta) {
        this.node.position = this.node.position.add(delta);
    },

    updateRenderer (delta) {
        var THRETHOLD = 5;
        if (this.sprite.spriteFrame === this.leftSprite) {
            if (delta.x > - THRETHOLD / 3) {
                this.sprite.spriteFrame = this.normalSprite;
            }
        }
        else if (this.sprite.spriteFrame === this.normalSprite) {
            if (delta.x < - THRETHOLD) {
                this.sprite.spriteFrame = this.leftSprite;
            }
            else if (delta.x > THRETHOLD) {
                this.sprite.spriteFrame = this.rightSprite;
            }
        }
        else {
            if (delta.x < THRETHOLD / 3) {
                this.sprite.spriteFrame = this.normalSprite;
            }
        }
    },

    onCollisionEnter (other) {
        if (other.node.group === 'enemy') {
            this.node.destroy();
        }
    }
});
