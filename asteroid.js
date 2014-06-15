(function(root) {
  "use strict";
  var Asteroids = root.Asteroids = (root.Asteroids || {});;

  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);
  }
  Asteroid.prototype = Object.create(Asteroids.MovingObject.prototype);

  Asteroid.COLOR = "pink";
  Asteroid.RADIUS = 45;
  Asteroid.MIN_RADIUS = 5;

  Asteroid.prototype.split = function() {
    if (this.radius < Asteroid.MIN_RADIUS)
      return [];

    var chunks = _(2).times(function (n) {
      return new Asteroid(this.pos, this.vel, this.radius / 2, "red");
    }.bind(this));
    // change the chunk velocities
    console.log(chunks)
    return chunks;
  }

  Asteroid.randomAsteroid = function(dimX, dimY, ship) {
    var pos = {x: Math.random() * dimX, y: Math.random() * dimY};
    var vel = {x: 4 - Math.random() * 5, y: 4 - Math.random() * 5};
    var newAsteroid = new Asteroid(pos, vel, Asteroid.RADIUS, Asteroid.COLOR);

    if(ship.isCollidedWith(newAsteroid)) {
      return Asteroid.randomAsteroid(dimX, dimY, ship);
    } else {
      return newAsteroid;
    }
  };

})(this);