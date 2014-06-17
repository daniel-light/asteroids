;(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos) {
    Asteroids.MovingObject.call(this, pos, {x: 0, y: 0}, Ship.RADIUS, Ship.COLOR);
    this.heading = (Math.PI / 2);
  }
  Ship.prototype = Object.create(Asteroids.MovingObject.prototype);

  Ship.RADIUS = 25;
  Ship.COLOR = "lightgreen";

  Ship.prototype.render = function(context) {
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();

    var x = this.pos.x + (this.radius - 3) * Math.cos(this.heading);
    var y = this.pos.y - (this.radius - 3) * Math.sin(this.heading);

    context.fillStyle = "red"
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI, true);
    context.fill();
  }

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
  }

  Ship.prototype.power = function(impulse) {
    this.vel.x += impulse * Math.cos(this.heading);
    this.vel.y -= impulse * Math.sin(this.heading);
  }

  Ship.prototype.fireBullet = function() {
    var x = this.pos.x + (this.radius + 1) * Math.cos(this.heading);
    var y = this.pos.y - (this.radius + 1) * Math.sin(this.heading);
    var bullet = new Asteroids.Bullet({x: x, y: y}, this.heading);
    return bullet;
  }

})(this);