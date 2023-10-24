import { Vec2d } from "../../types/types";
import Scene from "../Scene";

export default class DragAndDropManager {
  private scene: Scene;
  private selectedElementIdx: number;
  private dragging: boolean;
  private iniDragPosition: Vec2d;

  constructor(scene: Scene) {
    this.scene = scene;
    this.selectedElementIdx = -1;
    this.dragging = false;
    this.iniDragPosition = {x: -1, y: -1};

    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.scene.getCanvas.addEventListener("mousedown", (e: MouseEvent) => {
      this.startDrag(e);
    });

    this.scene.getCanvas.addEventListener("mouseup", e => {
      this.endDrag();
    });

    this.scene.getCanvas.addEventListener("mousemove", e => {
      if (!this.dragging) return;

      this.drag(e);
    });
  }

  private getSelectedElementIdx(): number {
    for (let i = this.scene.getElements.length - 1; i >= 0; i--) {
      if (this.scene.getElements[i].isInMouse({x: this.iniDragPosition.x, y: this.iniDragPosition.y})) {
        return this.selectedElementIdx = i;
      }
    }

    return -1;
  }

  private startDrag(e: MouseEvent): void {
    this.dragging = true;

    // x & y: 0-1
    const mousePositionX: number = e.offsetX / this.scene.getCanvas.clientWidth,
          mousePositionY: number = 1 - e.offsetY / this.scene.getCanvas.clientHeight;
    
    this.iniDragPosition = {x: mousePositionX, y: mousePositionY};

    this.selectedElementIdx = this.getSelectedElementIdx();

    if (this.selectedElementIdx == -1) this.scene.draw();
    else this.scene.getElements[this.selectedElementIdx].drawOutline();
  }

  private drag(e: MouseEvent): void {
    if (this.selectedElementIdx == -1) return;

    const mousePositionX: number = e.offsetX / this.scene.getCanvas.clientWidth,
          mousePositionY: number = 1 - e.offsetY / this.scene.getCanvas.clientHeight;

    const deltaX = (mousePositionX - this.iniDragPosition.x) * this.scene.getCanvas.width,
          deltaY = (mousePositionY - this.iniDragPosition.y) * this.scene.getCanvas.height;
          
    this.iniDragPosition = {x: mousePositionX, y: mousePositionY};

    this.scene.getElements[this.selectedElementIdx].setPosition = {
      x: deltaX + this.scene.getElements[this.selectedElementIdx].getPostion.x,
      y: deltaY + this.scene.getElements[this.selectedElementIdx].getPostion.y,
    };

    this.scene.draw();
    this.scene.getElements[this.selectedElementIdx].drawOutline();
  }

  private endDrag(): void {
    this.dragging = false;

    this.selectedElementIdx = -1;
  }
}