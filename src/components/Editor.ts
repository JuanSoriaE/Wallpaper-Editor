import Scene from "./Scene";
import DragAndDropManager from "./editor/DragAndDropManager";

export default class Editor {
  private scene: Scene;
  private dragAndDropManager: DragAndDropManager;

  private addElementButton: HTMLButtonElement;
  private addElementModal: HTMLDivElement;
  private addMountainButton: HTMLButtonElement;
  private addSunButton: HTMLButtonElement;
  
  constructor() {
    this.scene = new Scene(1920, 1080);
    this.dragAndDropManager = new DragAndDropManager(this.scene);

    this.addElementButton = document.getElementById("add-element-button") as HTMLButtonElement;
    this.addElementModal = document.getElementById("add-element-modal") as HTMLDivElement;
    this.addMountainButton = document.getElementById("add-mountain-button") as HTMLButtonElement;
    this.addSunButton = document.getElementById("add-sun-button") as HTMLButtonElement;

    this.initEventListeners();
  }

  private initEventListeners(): void {
    document.body.addEventListener("click", e => {
      if ((e.target as HTMLElement).id == "add-element-button") return;
      this.addElementModal.style.display = "none";
    });

    this.addElementButton.addEventListener("click", () => {
      this.addElementModal.style.display = "flex";
    });

    this.addMountainButton.addEventListener("click", () => {
      this.scene.addElement("mountain");
    });

    this.addSunButton.addEventListener("click", () => {
      this.scene.addElement("sun");
    });
  }
}