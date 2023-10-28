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

  // Setters
  public set setKey(key: string) {
    this.key = key;
  }
  
  public set setPosition(position: Vec2d) {
    this.position = position;
  }

  public set setColor(color: string) {
    this.color = color;
  }

  public set setWidth(width: number) {
    this.width = width;
  }

  public set setHeight(height: number) {
    this.height = height;
  }
  
  // Getters
  public get getKey(): string {
    return this.key;
  }
  
  public get getPosition(): Vec2d {
    return this.position;
  }

  public get getColor(): string {
    return this.color;
  }

  public get getWidth(): number {
    return this.width;
  }

  public get getHeight(): number {
    return this.height;
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
