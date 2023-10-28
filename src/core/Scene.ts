import Mountain from "./scene/Mountain";
import Sun from "./scene/Sun";

export default class Scene {
  private width: number;
  private height: number;
  private elements: Array<Mountain | Sun>;
  private mountainCount: number;
  private sunCount: number;
  private backgroundColor: string | CanvasGradient;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.elements = new Array<any>();
    this.mountainCount = 0;
    this.sunCount = 0;
    this.backgroundColor = "#FFFFFF";

    this.canvas = document.getElementById("cnv") as HTMLCanvasElement;
    this.initCanvas();
    
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.transform(1, 0, 0, -1, 0, height);
    
    this.drawBackground();
  }
  
  public get getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  
  public get getElements(): Array<Mountain | Sun> {
    return this.elements;
  }
  

  private initCanvas(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  public addElement(elementType: string): void {
    if (elementType == "mountain")
      this.elements.push(new Mountain(
        "mountain" + this.mountainCount.toString(),
        {x: 0, y: this.height / 5},
        300, 300,
        "#252525",
        this.width,
        this.ctx,
      ));
    else if (elementType == "sun")
      this.elements.push(new Sun(
        "sun" + this.sunCount,
        {x: 80 + 50, y: this.height - 80 - 50},
        80,
        "#f9fa47",
        this.ctx,
        
      ));
    
    this.draw();
  }

  public drawBackground(): void {
    const gradient: CanvasGradient = this.ctx.createLinearGradient(this.width / 2, this.height, this.width / 2, 0);
    gradient.addColorStop(0, "#132f70")
    gradient.addColorStop(0.3, "#b382a4");
    gradient.addColorStop(0.8, "#ff8108");
    this.backgroundColor = gradient;
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.drawBackground();

    for (const element of this.elements) {
      element.draw();
    }
  }
}