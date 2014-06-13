(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function() {
    this.pos.x = pos.x + vel.x
    this.pos.y = pos.y + vel.y
  }

  MovingObject.prototype.render = function(context) {
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
    context.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {

    var xDiff = Math.pow(this.pos.x - otherObject.pos.x, 2);
    var yDiff = Math.pow(this.pos.y - otherObject.pos.y, 2);
    var radiiSum = this.radius + otherObject.radius;
    var distance = Math.sqrt(xDiff + yDiff);

    return distance < radiiSum;
  }

})(this);