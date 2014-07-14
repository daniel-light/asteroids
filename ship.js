;(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos) {
    Asteroids.MovingObject.call(this, pos, {x: 0, y: 0}, Ship.RADIUS, Ship.COLOR);
    this.heading = (Math.PI / 2);
    this.rotate(0); //TODO having to call this here is weird
  }
  Ship.prototype = Object.create(Asteroids.MovingObject.prototype);

  Ship.RADIUS = 25;
  Ship.COLOR = "lightgreen";

  Ship.prototype.move = function(dimX, dimY) {
    Asteroids.MovingObject.prototype.move.call(this, dimX, dimY);

    this.pos.x = this.pos.x % dimX;
    this.pos.y = this.pos.y % dimY;

    while (this.pos.x < 0) {
      this.pos.x += dimX;
    }

    while(this.pos.y < 0) {
      this.pos.y += dimY;
    }
  };

  Ship.prototype.power = function(impulse) {
    this.vel.x += impulse * Math.cos(this.heading);
    this.vel.y -= impulse * Math.sin(this.heading);
  };

  Ship.prototype.fireBullet = function() {
    var x = this.pos.x + (this.radius + 1) * Math.cos(this.heading);
    var y = this.pos.y - (this.radius + 1) * Math.sin(this.heading);
    var bullet = new Asteroids.Bullet({x: x, y: y}, this.heading);
    return bullet;
  };

  Ship.prototype.rotate = function(rotation) {
    this.heading += rotation;

    var pi = Math.PI,
        centerX = this.pos.x,
        centerY = this.pos.y,
        heading = this.heading,
        radius = this.radius;

    var frontX = radius * Math.cos(heading),
        frontY = -1 * radius * Math.sin(heading),
        leftX = radius * Math.cos(heading + pi * 5 / 4),
        leftY = -1 * radius * Math.sin(heading + pi * 5 / 4),
        rightX = radius * Math.cos(heading + pi * 3 / 4),
        rightY = -1 * radius * Math.sin(heading + pi * 3 / 4);

    this._vertexes = [
      {x: frontX, y: frontY},
      {x: leftX, y: leftY},
      {x: rightX, y: rightY}
    ];
  }

})(this);