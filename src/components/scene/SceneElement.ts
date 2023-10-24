import { Vec2d } from "../../types/types";

export default class SceneElement {
  protected key: string;
  protected position: Vec2d;
  protected color: string;
  protected ctx: CanvasRenderingContext2D;
  protected width: number;
  protected height: number;

  constructor(
    key: string,
    position: Vec2d,
    color: string,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    this.key = key;
    this.position = position;
    this.color = color;
    this.ctx = ctx;
    this.width = width || 0;
    this.height = height || 0;
  }

  
  public set setPosition(position: Vec2d) {
    this.position = position;
  }

  
  public get getPostion(): Vec2d {
    return this.position;
  }
  
  
  public isInMouse(mousePosition: Vec2d): boolean {
    return !(mousePosition.x < this.position.x || mousePosition.x > this.position.x + this.width 
          || mousePosition.y < this.position.y || mousePosition.y > this.position.y + this.height);
  }

  public drawOutline(): void {
    
  }

  public draw(): void {
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
