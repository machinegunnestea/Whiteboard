class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Pencil {
  constructor() {
    this.mousePos = new Pos(0, 0);
    this.paths = [];
    this.pencilThickness = 2;
  }

  updateMousePos(pos) {
    this.mousePos = pos;
  }

  draw(ctx) {
    ctx.strokeStyle = this.pencilThickness + "px";
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      if (this.paths[i].length > 0) {
        ctx.moveTo(path[0].x, path[0].y);
        for (let j = 1; j < path.length; j++) {
          ctx.lineTo(path[j].x, path[j].y);
        }
      }
      ctx.stroke();
    }
  }

  update() {
    this.paths[this.paths.length - 1] &&
      this.paths[this.paths.length - 1].push(this.mousePos);
  }
}

export default Pencil;
