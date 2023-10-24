import { Vec2d } from "../../types/types";
import SceneElement from "./SceneElement";

export default class Mountain extends SceneElement {
  private peaks: Array<Vec2d>;
  private maxDisplacement: number;
  private displacementReduction: number = 0.5;

  constructor(
    key: string,
    position: Vec2d,
    numPeaks: number,
    maxDisplacement: number,
    color: string,
    width: number,
    ctx: CanvasRenderingContext2D,
  ) {
    super(
      key,
      { x: 0, y: position.y },
      color,
      ctx,
      width, 0,
    );

    this.key = key;
    this.peaks = new Array<Vec2d>(numPeaks);
    this.initPeaksArray();

    this.maxDisplacement = maxDisplacement;
    this.color = color;

    this.generatePeaks();
  }

  public initPeaksArray(): void {
    const deltaX: number = this.width / this.peaks.length;

    for (let i = 0; i < this.peaks.length; i++) {
      this.peaks[i] = {x: i * deltaX, y: -1};
    }
  }

  private midpointDisplacement(leftPeakIdx: number, rightPeakIdx: number, maxCurDisplacement: number): void {
    const curPeakIdx: number = Math.floor((leftPeakIdx + rightPeakIdx) / 2);
    if (this.peaks[curPeakIdx].y != -1) return;

    const displacement: number = Math.random() * maxCurDisplacement * (Math.random() < 0.5 ? 1 : -1);
    const leftPeak: Vec2d | null = this.peaks[leftPeakIdx], rightPeak: Vec2d | null = this.peaks[rightPeakIdx];

    const xPosition: number = leftPeak.x + (rightPeak.x - leftPeak.x) / 2;
    const yPosition: number = leftPeak.y + (rightPeak.y - leftPeak.y) / 2 + displacement;
    this.peaks[curPeakIdx] = { x: xPosition, y: yPosition };

    this.midpointDisplacement(leftPeakIdx, curPeakIdx, maxCurDisplacement * this.displacementReduction);
    this.midpointDisplacement(curPeakIdx, rightPeakIdx, maxCurDisplacement * this.displacementReduction);
  }

  public generatePeaks(): void {
    this.peaks[0] = { x: 0, y: 0 };
    this.peaks[this.peaks.length - 1] = { x: this.width, y: 0 };

    this.midpointDisplacement(0, this.peaks.length - 1, this.maxDisplacement);
  }

  public override isInMouse(mousePosition: Vec2d): boolean {
    // mousePosition X & Y (0 - 1)
    const mouseScenePostion: Vec2d = {
      x: mousePosition.x * this.ctx.canvas.width,
      y: mousePosition.y * this.ctx.canvas.height,
    };
    
    const deltaX: number = this.ctx.canvas.width / this.peaks.length;
    const leftNearestPeakIdx: number = Math.floor((mouseScenePostion.x - this.position.x) / deltaX);
    const rightNearestPeakIdx: number = Math.min(leftNearestPeakIdx + 1, this.peaks.length - 1);
    
    const slope: number = (this.peaks[rightNearestPeakIdx].y - this.peaks[leftNearestPeakIdx].y)
                        / (this.peaks[rightNearestPeakIdx].x - this.peaks[leftNearestPeakIdx].x);

    // _/\
    //    O
    //    |\
    //    x \
    const mountainYPositionAtMouse: number = slope * (leftNearestPeakIdx + 0.5) 
                                            + this.peaks[leftNearestPeakIdx].y + this.position.y; 

    return mouseScenePostion.y <= mountainYPositionAtMouse;
  }

  public override drawOutline(): void {
    this.ctx.strokeStyle = "#0077d6";
    this.ctx.lineWidth = 7;
    this.ctx.setLineDash([20, 10]);

    this.ctx.beginPath();
    this.ctx.moveTo(this.peaks[0].x + this.position.x, this.peaks[0].y + this.position.y);

    for (let i = 1; i < this.peaks.length; i++) {
      this.ctx.lineTo(this.peaks[i].x + this.position.x, this.peaks[i].y + this.position.y);
    }

    this.ctx.lineTo(this.width + this.position.x, 0);
    this.ctx.lineTo(this.position.x, 0);
    this.ctx.lineTo(this.position.x, this.position.y);

    this.ctx.stroke();
  }

  public override draw(): void {
    this.ctx.fillStyle = this.color;

    this.ctx.beginPath();
    this.ctx.moveTo(this.peaks[0].x + this.position.x, this.peaks[0].y + this.position.y);

    for (let i = 1; i < this.peaks.length; i++) {
      this.ctx.lineTo(this.peaks[i].x + this.position.x, this.peaks[i].y + this.position.y);
    }

    this.ctx.lineTo(this.width + this.position.x, 0);
    this.ctx.lineTo(this.position.x, 0);
    this.ctx.lineTo(this.position.x, this.position.y);

    this.ctx.fill();
  }
}