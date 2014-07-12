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
    var pi = Math.PI,
        centerX = this.pos.x,
        centerY = this.pos.y,
        heading = this.heading,
        radius = this.radius;

    var frontX = centerX + radius * Math.cos(heading),
        frontY = centerY - radius * Math.sin(heading),
        leftX = centerX + radius * Math.cos(heading + pi * 5 / 4),
        leftY = centerY - radius * Math.sin(heading + pi * 5 / 4),
        rightX = centerX + radius * Math.cos(heading + pi * 3 / 4),
        rightY = centerY - radius * Math.sin(heading + pi * 3 / 4);

    context.strokeStyle = 'white';
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(frontX, frontY);
    context.lineTo(leftX, leftY);
    context.lineTo(rightX, rightY);
    context.lineTo(frontX, frontY);
    context.stroke();
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