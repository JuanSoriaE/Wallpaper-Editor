import Mountain from "../core/scene/Mountain";
import Sun from "../core/scene/Sun";

export default class UIManager {
  private generalSettingsPanel: HTMLDivElement;

  // Mountain
  private mountainSettingsPanel: HTMLDivElement;
  private mountainXInput: HTMLInputElement;
  private mountainYInput: HTMLInputElement;
  private mountainWInput: HTMLInputElement;
  private mountainHInput: HTMLInputElement;
  private mountainColInput: HTMLInputElement;
  private mountainColTextInput: HTMLInputElement;
  private mountainColOpInput: HTMLInputElement;
  private mountainNumPeaksInput: HTMLInputElement;
  private mountainMaxDisInput: HTMLInputElement;

  constructor() {
    this.generalSettingsPanel = document.getElementById("general-settings") as HTMLDivElement;

    this.mountainSettingsPanel = document.getElementById("mountain-settings-panel") as HTMLDivElement;
    this.mountainXInput = document.getElementById("mountain-x") as HTMLInputElement;
    this.mountainYInput = document.getElementById("mountain-y") as HTMLInputElement;
    this.mountainWInput = document.getElementById("mountain-w") as HTMLInputElement;
    this.mountainHInput = document.getElementById("mountain-h") as HTMLInputElement;
    this.mountainColInput = document.getElementById("mountain-col") as HTMLInputElement;
    this.mountainColTextInput = document.getElementById("mountain-col-text") as HTMLInputElement;
    this.mountainColOpInput = document.getElementById("mountain-col-op") as HTMLInputElement;
    this.mountainNumPeaksInput = document.getElementById("mountain-num-peaks") as HTMLInputElement;
    this.mountainMaxDisInput = document.getElementById("mountain-max-dis") as HTMLInputElement;
  }

  public updateSettingsPanel(selectedElementIdx: number, element: Mountain | Sun | null): void {
    if (selectedElementIdx == -1) {
      this.generalSettingsPanel.style.display = "block";
      return;
    }

    this.generalSettingsPanel.style.display = "none";

    if (element instanceof Mountain) {
      this.mountainSettingsPanel.style.display = "block";

      this.mountainXInput.value = element.getPosition.x.toFixed(2).toString();
      this.mountainYInput.value = element.getPosition.y.toFixed(2).toString();
      this.mountainWInput.value = element.getWidth.toString();
      this.mountainHInput.value = element.getHeight.toString();
      this.mountainColInput.value = element.getColor;
      this.mountainColTextInput.value = element.getColor;
      this.mountainColOpInput.value = "100";
      this.mountainNumPeaksInput.value = element.getNumPeaks.toString();
      this.mountainMaxDisInput.value = element.getMaxDisplacement.toString();
    }
  }
}