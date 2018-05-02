const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
const {width, height} = canvas;
const elementSize = 20;

class Snake {
  constructor() {
    this.state = {
      velocity: {
        x: 0,
        y: 0
      },
      position: {
        x: 0,
        y: 0
      },
      apple: {
        x: 15,
        y: 15
      },
      trail: [],
      tail: 5
    }

    this.handleKeydown = this.handleKeydown.bind(this);
    this.run = this.run.bind(this);

    this.startGame();
  }

  handleKeydown(e) {
    switch(e.keyCode) {
      case 37:
        this.state.velocity.x = -1;
        this.state.velocity.y = 0;
        break;
      case 38:
        this.state.velocity.x = 0;
        this.state.velocity.y = -1;
        break;
      case 39:
        this.state.velocity.x = 1;
        this.state.velocity.y = 0;
        break;
      case 40:
        this.state.velocity.x = 0;
        this.state.velocity.y = 1;
        break;
    }
  }

  changePosition() {
    if (this.state.position.x < 0) {
      this.state.position.x = width / elementSize - 1;
    }
  
    if (this.state.position.x > width / elementSize - 1) {
      this.state.position.x = 0;
    }
  
    if (this.state.position.y < 0) {
      this.state.position.y = width / elementSize - 1;
    }
  
    if (this.state.position.y > height / elementSize - 1) {
      this.state.position.y = 0;
    }
  }

  drawBackground() {
    context.fillStyle = "#ff5c6a";
    context.fillRect(0, 0, width, height);
  }

  drawSnake() {
    context.fillStyle = "#ffffff";

    this.state.trail.forEach(({x, y}) => {
      context.fillRect(x * elementSize, y * elementSize, elementSize - 2, elementSize - 2);
      
      if (x === this.state.position.x && y === this.state.position.y) {
        this.state.tail = 5;
      }
    });
  
    this.state.trail = [...this.state.trail, {...this.state.position}];
  
    while (this.state.trail.length > this.state.tail) {
      this.state.trail.shift();
    }
  }

  drawApple() {
    if (this.state.apple.x === this.state.position.x && this.state.apple.y === this.state.position.y) {
      this.state.tail++;
      this.state.apple.x = Math.floor(Math.random() * width / elementSize);
      this.state.apple.y = Math.floor(Math.random() * height / elementSize);
    }
  
    context.fillStyle = "#0d0d0d";
    context.fillRect(this.state.apple.x * elementSize, this.state.apple.y * elementSize, elementSize - 2, elementSize - 2);
  };

  run() {
    this.state.position.x += this.state.velocity.x;
    this.state.position.y += this.state.velocity.y;
  
    this.changePosition();
    this.drawBackground();
    this.drawSnake();
    this.drawApple();
  }

  startGame() {
    document.addEventListener("keydown", this.handleKeydown);
    setInterval(this.run, 1000/15);
  }
}

new Snake();