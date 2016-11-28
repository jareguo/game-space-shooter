function getDir (node) {
    var degree_cw = node.rotation;
    var degree_ccw = -degree_cw;
    var down = new cc.Vec2(0, -1);
    return down.rotateSelf(degree_ccw * Math.PI / 180);
}

module.exports = {
    getDir
};
