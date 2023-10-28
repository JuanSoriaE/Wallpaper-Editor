import { Vec2d } from "../../types/types";
import SceneElement from "./SceneElement";

export default class Sun extends SceneElement {
  private radius: number;
  private bloomRadius: number;
  private bloomSteps: number;
  private bloomOpacity: number;

  constructor(
    key: string,
    position: Vec2d,
    radius: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    bloomRadius?: number,
    bloomSteps?: number,
    bloomOpacity?: number,
  ) {
    super(
      key,
      position,
      color,
      ctx,
      2 * radius, 2 * radius,
    );

    this.radius = radius;
    this.bloomRadius = bloomRadius || 0;
    this.bloomSteps = bloomSteps || 0;
    this.bloomOpacity = bloomOpacity || 0;
  }

  public override isInMouse(mousePosition: Vec2d): boolean {
    // mousePosition X & Y (0 - 1)
    const mouseScenePostion: Vec2d = {
      x: mousePosition.x * this.ctx.canvas.width,
      y: mousePosition.y * this.ctx.canvas.height,
    };

    const distance: number = Math.sqrt(
      Math.pow(mouseScenePostion.x - this.position.x, 2)
      + Math.pow(mouseScenePostion.y - this.position.y, 2)
    );

    return distance <= this.radius;
  }

  public override drawOutline(): void {
    this.ctx.strokeStyle = "#0077d6";
    this.ctx.lineWidth = 7;
    this.ctx.setLineDash([20, 10]);

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  public override draw(): void {
    this.ctx.fillStyle = this.color;

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    if (this.bloomRadius == 0) return;

    // Bloom by radial gradient
    if (this.bloomSteps == 0) {
      const bloomHexOpacity: string = this.bloomOpacity.toString(16).padStart(2, '0')
      const radialGradient: CanvasGradient = this.ctx.createRadialGradient(
        this.position.x, this.position.y, this.radius,
        this.position.x, this.position.y, this.bloomRadius
      );

      radialGradient.addColorStop(0, this.color + bloomHexOpacity);
      radialGradient.addColorStop(1, this.color + "00");
      
      this.ctx.fillStyle = radialGradient;
      this.ctx.fillRect(
        this.position.x - this.bloomRadius,
        this.position.y - this.bloomRadius,
        2 * this.bloomRadius, 2 * this.bloomRadius
      );

      return;
    }

    // Bloom by steps
    const bloomStepRadiusDelta: number = (this.bloomRadius - this.radius) / this.bloomSteps;
    const bloomStepOpacity: string = Math.floor(this.bloomOpacity / this.bloomSteps).toString(16).padStart(2, '0');
    this.ctx.fillStyle = this.color + bloomStepOpacity;

    for (let i = 1; i <= this.bloomSteps; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.position.x, this.position.y, this.radius + i * bloomStepRadiusDelta, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}