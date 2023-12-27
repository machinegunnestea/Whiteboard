class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Rectangle {
  constructor() {
    this.rects = [];
    this.isDrawing = false;
    this.isMouseDown = false;
    this.mousePos = { x: 0, y: 0 };
    this.currentRect = undefined;
  }

  updateMousePosition(pos) {
    this.mousePos = pos;
  }

  draw(ctx) {
    ctx.beginPath();
    for (let i = 0; i < this.rects.length; i++) {
      const rect = this.rects[i];
      ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height);
    }
    if (this.currentRect) {
      ctx.rect(
        this.currentRect.pos.x,
        this.currentRect.pos.y,
        this.currentRect.width,
        this.currentRect.height
      );
    }
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (this.currentRect) {
      this.currentRect.width = this.mousePos.x - this.currentRect.pos.x;
      this.currentRect.height = this.mousePos.y - this.currentRect.pos.y;
    }
  }
}

export default Rectangle;
