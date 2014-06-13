(function(root) {
  "use strict";

  var Asteroids = root.Asteroids = (root.Asteroids || {});;

  var Game = Asteroids.Game = function(context, dim_x, dim_y) {
    var new_asteroid, test_asteroid;
    this.bullets = [];
    this.context = context;
    this.DIM_X = dim_x;
    this.DIM_Y = dim_y;
    this.ship = new Asteroids.Ship({x: dim_x / 2, y: dim_y / 2});
    this.asteroids = [];
    for (var i = 0; i < 20; i++) {
      new_asteroid = Asteroids.Asteroid.randomAsteroid(dim_x, dim_y, this.ship);
      this.asteroids.push(new_asteroid);
    }
  }

  Game.prototype.render = function() {
    var context = this.context
    context.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.ship.render(context);
    this.asteroids.concat(this.bullets).forEach(function (movingObject) {
      movingObject.render(context);
    });
  }

  Game.prototype.moveObjects = function(movingObjects) {
    var that = this;
    movingObjects.forEach(function(movingObject) {
      movingObject.move(that.DIM_X, that.DIM_Y);
    });
    return movingObjects.filter(function (movingObject) {
      return !movingObject.isOffscreen(that.DIM_X, that.DIM_Y);
    });
  }

  Game.prototype.move = function() {
    this.asteroids = this.moveObjects(this.asteroids);
    this.bullets = this.moveObjects(this.bullets);

    this.handleInputs();
    this.ship.move(this.DIM_X, this.DIM_Y);
  }

  Game.prototype.step = function() {
    this.spawnRoids();
    this.move();
    this.render();
    this.checkCollisions();
  }

  Game.prototype.start = function(interval) {
    this.bindKeys();
    this.gameIntervalId = setInterval(this.step.bind(this), interval);
  }

  Game.prototype.checkCollisions = function() {
    var that = this;

    this.asteroids = this.asteroids.filter(function(asteroid) {
      return !that.bullets.some(function(bullet, index) {
        if (bullet.isCollidedWith(asteroid)) {
          that.bullets = that.bullets.slice(0, index).concat(that.bullets.slice(index + 1));
          return true;
        } else {
          return false;
        }
      });
    });

    if (this.asteroids.some(function (asteroid) {
      return asteroid.isCollidedWith(that.ship);
    })) {
      alert("You suck. Realy hard. And the game's over. Okay. Great. Super duper. Stop. Don't.");
      clearInterval(this.gameIntervalId);
    }
  }

  Game.prototype.bindKeys = function() {
    var that = this;
    key("space", function() {
      that.bullets.push(that.ship.fireBullet());
    });
  }

  Game.prototype.handleInputs = function() {
    var ship = this.ship;
    if(key.isPressed("up")) {
      ship.power(0.4);
    }
    if(key.isPressed("down")) {
      ship.power(-0.4);
    }
    if(key.isPressed("left")) {
      ship.heading += 0.1;
    }
    if(key.isPressed("right")) {
      ship.heading -= 0.1;
    }
  }

  Game.prototype.spawnRoids = function() {
    var dim_x = this.DIM_X;
    var dim_y = this.DIM_Y;
    if (this.asteroids.length < 10 || Math.random() < .0004 * this.interval) {
      var new_asteroid = Asteroids.Asteroid.randomAsteroid(dim_x, dim_y, this.ship);
      this.asteroids.push(new_asteroid);
    }
  }

})(this);