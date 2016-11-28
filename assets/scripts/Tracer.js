var getDir = require('Utils').getDir;

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        velocity: 5,
        angleVelocity: 5
    },

    update (dt) {
        if (this.target && this.target.isValid && this.target.active) {
            // look at target
            var targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
            var targetPosInLocal = this.node.parent.convertToNodeSpaceAR(targetPos);
            var selfPos = this.node.position;
            var expectedDir = targetPosInLocal.sub(selfPos).normalizeSelf();
            var selfDir = getDir(this.node);
            var isLeft = selfDir.cross(expectedDir) > 0;
            if (isLeft) {
                this.node.rotation += this.angleVelocity * dt;
            }
            else {
                this.node.rotation -= this.angleVelocity * dt;
            }

            // move forward
            var speed = getDir(this.node).mul(this.velocity * dt);
            this.node.position = selfPos.add(speed);
        }
    }
});
