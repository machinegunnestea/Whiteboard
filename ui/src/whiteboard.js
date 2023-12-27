import Pencil from "./Pencil";
import Rectangle from "./rectange";

export const Tool = {
  PENCIL: 0,
  RECTANGLE: 1,
  TEXT: 2,
  NO_TOOL: 3,
};

class whiteboard extends EventTarget {
  constructor(canvas) {
    super();
    this.activeTool = Tool.NO_TOOL;
    this.mousePos = { x: 0, y: 0 };
    this.pencil = new Pencil();
    this.rectangle = new Rectangle();
    let mouseDown = false;

    canvas.onmousedown = (e) => {
      this.mousePos = { x: e.clientX, y: e.clientY };
      this.pencil.updateMousePos(this.mousePos);
      this.pencil.paths.push([]);
      this.rectangle.currentRect = {
        pos: this.mousePos,
        width: 0,
        height: 0,
      };
      mouseDown = true;

      setInterval(() => {
        this.dispatchEvent(new Event("state_change"));
      }, 1000);
    };

    canvas.onmouseup = () => {
      mouseDown = false;
      this.rectangle.rects.push(this.rectangle.currentRect);
      this.rectangle.currentRect = undefined;
    };

    document.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        const x = e.clientX;
        const y = e.clientY;
        this.mousePos = { x, y };
        this.pencil.updateMousePos(this.mousePos);
        this.rectangle.updateMousePosition(this.mousePos);
      }
    });
  }

  updateState(state) {
    this.pencil.paths = state.pencil;
    this.rectangle.rects = state.rectangle;
  }

  setTool(tool) {
    this.activeTool = tool;
  }

  draw(ctx) {
    this.pencil.draw(ctx);
    this.rectangle.draw(ctx);
  }
  update() {
    if (this.activeTool === Tool.PENCIL) {
      this.pencil.update();
    }
    if (this.activeTool === Tool.RECTANGLE) {
      this.rectangle.update();
    }
  }
}

export default whiteboard;
