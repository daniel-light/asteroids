;(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, heading) {
    this.heading = heading;
    var vel = {
      x: 7 * Math.cos(heading),
      y: -7 * Math.sin(heading)
    }
    Asteroids.MovingObject.call(this, pos, vel, 3, "purple");
  }
  Bullet.prototype = Object.create(Asteroids.MovingObject.prototype);

})(this);