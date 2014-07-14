;(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});;

  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);

    this._vertexes = _(7).times(function(n) {
      var distance = Math.random() * this.radius * 2 / 3 + this.radius * 1 / 3;
      var heading = Math.PI * 2 / 7 * n;
      return {x: distance * Math.cos(heading), y: distance * Math.sin(heading)};
    }.bind(this));
  };
  Asteroid.prototype = Object.create(Asteroids.MovingObject.prototype);

  Asteroid.COLOR = "pink";
  Asteroid.RADIUS = 64;
  Asteroid.MIN_RADIUS = 16;

  Asteroid.prototype.split = function() {
    if (this.radius < Asteroid.MIN_RADIUS)
      return [];

    var chunks = _(2).times(function (n) {
      return new Asteroid(
        this.pos,
        Asteroid.randomVelocity(this.vel),
        this.radius / 2, "red"
      );
    }.bind(this));

    return chunks;
  };

  Asteroid.prototype.render = function(context) {
    context.strokeStyle = 'white';
    context.strokeWidth = 2;

    context.moveTo(
      this.pos.x + _.last(this._vertexes).x,
      this.pos.y + _.last(this._vertexes).y
    );

    this._vertexes.forEach(function(vertex) {
      context.lineTo(this.pos.x + vertex.x, this.pos.y + vertex.y);
    }.bind(this));

    context.stroke();
  };

  Asteroid.randomAsteroid = function(dimX, dimY, ship) {
    var pos = {x: Math.random() * dimX, y: Math.random() * dimY};
    var vel = Asteroid.randomVelocity();
    var newAsteroid = new Asteroid(pos, vel, Asteroid.RADIUS, Asteroid.COLOR);

    if(ship.isCollidedWith(newAsteroid)) {
      return Asteroid.randomAsteroid(dimX, dimY, ship);
    } else {
      return newAsteroid;
    }
  };

  Asteroid.randomVelocity = function(base_vel) {
    var vel = {x: 2 - Math.random() * 4, y: 2 - Math.random() * 4};
    if (base_vel) {
      vel.x += base_vel.x;
      vel.y += base_vel.y;
    }
    return vel;
  };

})(this);