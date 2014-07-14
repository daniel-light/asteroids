;(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = { x: pos.x, y: pos.y };
    this.vel = { x: vel.x, y: vel.y };
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.isOffscreen = function(dimX, dimY) {
      if (   this.pos.x < this.radius * -1
          || this.pos.x > dimX + this.radius
          || this.pos.y < this.radius * -1
          || this.pos.y > dimY + this.radius) {
        return true
      } else {
        return false;
      }
  }

  MovingObject.prototype.move = function(dimX, dimY) {
    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;
  }

  MovingObject.prototype.render = function(context) {
    context.strokeStyle = 'white';
    context.strokeWidth = 2;
    context.beginPath();

    context.moveTo(
      this.pos.x + _.last(this._vertexes).x,
      this.pos.y + _.last(this._vertexes).y
    );

    this._vertexes.forEach(function(vertex) {
      context.lineTo(this.pos.x + vertex.x, this.pos.y + vertex.y);
    }.bind(this));

    context.stroke();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {

    var xDiff = Math.pow(this.pos.x - otherObject.pos.x, 2);
    var yDiff = Math.pow(this.pos.y - otherObject.pos.y, 2);
    var radiiSum = this.radius + otherObject.radius;
    var distance = Math.sqrt(xDiff + yDiff);

    return distance < radiiSum;
  }

})(this);