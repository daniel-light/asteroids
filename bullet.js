;(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, heading) {
    this.heading = heading;
    var vel = {
      x: 7 * Math.cos(heading),
      y: -7 * Math.sin(heading)
    };
    Asteroids.MovingObject.call(this, pos, vel, 3, "purple");
    this._vertexes = [
      {x: 1, y: 1},
      {x: 1, y: -1},
      {x: -1, y: -1},
      {x: -1, y: 1}
    ];
  }
  Bullet.prototype = Object.create(Asteroids.MovingObject.prototype);

})(this);