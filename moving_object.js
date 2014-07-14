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
    var p1 = new SAT.Polygon(
      new SAT.Vector(this.pos.x, this.pos.y),
      this._vertexes.map(function(vertex) {
        return new SAT.Vector(vertex.x, vertex.y);
      })
    );
    var p2 = new SAT.Polygon(
      new SAT.Vector(otherObject.pos.x, otherObject.pos.y),
      otherObject._vertexes.map(function(vertex) {
        return new SAT.Vector(vertex.x, vertex.y);
      })
    );

    return SAT.testPolygonPolygon(p1, p2);
  };

})(this);