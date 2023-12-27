import Socket from "socket.io-client";
import Whiteboard, { Tool } from "./whiteboard";

const canvas = document.createElement("canvas");
const pencil = document.getElementById("pencil");
const rectangle = document.getElementById("rect");

const rooms_id = location.search.split("=")[1];

const io = Socket("http://localhost:3000");

io.emit("join_room", rooms_id);

document.body.append(canvas);

canvas.width = window.innerWidth;
canvas.height = window.outerHeight;

const ctx = canvas.getContext("2d");

const whiteboard = new Whiteboard(canvas);

io.on("state_change", (state) => {
  whiteboard.updateState(state);
});

pencil?.addEventListener("click", () => {
  whiteboard.setTool(Tool.PENCIL);
});

rectangle?.addEventListener("click", () => {
  whiteboard.setTool(Tool.RECTANGLE);
});

whiteboard.addEventListener("state_change", (e) => {
  const state = {
    pencil: whiteboard.pencil.paths,
    rectangle: whiteboard.rectangle.rects,
  };
  io.emit("state_change", {
    state,
    room_id: rooms_id,
  });
});

const animationLoop = () => {
  if (ctx) {
    ctx.clearRect(0, 0, 0, 0);
    whiteboard.draw(ctx);
    whiteboard.update();
  }
  requestAnimationFrame(animationLoop);
};

animationLoop();
