import { Vec2d } from "../../types/types";
import Scene from "../Scene";

export default class DragAndDropManager {
  public static EVENT_DRAG_START: string = "startdrag";
  public static EVENT_DRAG: string = "drag";
  public static EVENT_DRAG_END: string = "enddrag";

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

    this.scene.getCanvas.addEventListener("mouseup", (e: MouseEvent) => {
      this.endDrag();
    });

    this.scene.getCanvas.addEventListener("mousemove", (e: MouseEvent) => {
      this.hover(e);
      
      if (this.dragging) this.drag(e);
    });
  }

  private getSelectedElementIdx(mousePosition: Vec2d): number {
    for (let i = this.scene.getElements.length - 1; i >= 0; i--) {
      if (this.scene.getElements[i].isInMouse({x: mousePosition.x, y: mousePosition.y})) {
        return i;
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

    this.selectedElementIdx = this.getSelectedElementIdx(this.iniDragPosition);

    // Custom Event to listen in Editor
    const startDragCustomEvent = new CustomEvent(DragAndDropManager.EVENT_DRAG_START, {
      detail: {
        selectedElementIdx: this.selectedElementIdx,
      }
    });
    this.scene.getCanvas.dispatchEvent(startDragCustomEvent);

    this.scene.draw();
    if (this.selectedElementIdx != -1) this.scene.getElements[this.selectedElementIdx].drawOutline();
  }

  private drag(e: MouseEvent): void {
    if (this.selectedElementIdx == -1) return;

    const mousePositionX: number = e.offsetX / this.scene.getCanvas.clientWidth,
          mousePositionY: number = 1 - e.offsetY / this.scene.getCanvas.clientHeight;

    const deltaX = (mousePositionX - this.iniDragPosition.x) * this.scene.getCanvas.width,
          deltaY = (mousePositionY - this.iniDragPosition.y) * this.scene.getCanvas.height;
          
    this.iniDragPosition = {x: mousePositionX, y: mousePositionY};

    this.scene.getElements[this.selectedElementIdx].setPosition = {
      x: deltaX + this.scene.getElements[this.selectedElementIdx].getPosition.x,
      y: deltaY + this.scene.getElements[this.selectedElementIdx].getPosition.y,
    };
  }

  private endDrag(): void {
    this.dragging = false;
  }

  private hover(e: MouseEvent): void {
    // x & y: 0-1
    const mousePositionX: number = e.offsetX / this.scene.getCanvas.clientWidth,
          mousePositionY: number = 1 - e.offsetY / this.scene.getCanvas.clientHeight;

    const hoveredElementIdx = this.getSelectedElementIdx({
      x: mousePositionX,
      y: mousePositionY,
    });

    this.scene.draw();
    if (hoveredElementIdx != -1) this.scene.getElements[hoveredElementIdx].drawOutline();
    if (this.selectedElementIdx != -1) this.scene.getElements[this.selectedElementIdx].drawOutline();
  }
}