import Konva from "konva";
import { BaseShape, Circle, Column } from "../../components";
import { BaseAlgorithm } from "../base-algorithm";
import {
  InsertOperation,
  UpdateOperation,
  InitOperation,
  DeleteOperation,
} from "./operations";

export abstract class ArrayAlgorithm extends BaseAlgorithm<ArrayAlgorithm> {
  data: BaseShape[];
  type: "circle" | "column";
  private paused: boolean = false;
  private resumeSignal: ((value?: unknown) => void) | null = null;
  constructor(layer: Konva.Layer, type: "circle" | "column" = "column") {
    super(layer);
    this.data = [];
    this.type = type;
    this.registerOperation("Insert", new InsertOperation());
    this.registerOperation("Update", new UpdateOperation());
    this.registerOperation("Init", new InitOperation());
    this.registerOperation("Delete", new DeleteOperation());
  }

  addData(value: number) {
    const column =
      this.type == "circle" ? new Circle(value) : new Column(value);
    column.setPosition(this.data.length * (BaseShape.BASE_UNIT + 10), 0);
    this.data.push(column);
  }
  initData(value: number[]) {
    this.data = value.map((item, i) => {
      const newColumn =
        this.type == "circle" ? new Circle(item) : new Column(item);
      newColumn.setPosition(i * (BaseShape.BASE_UNIT + 10), 0);
      return newColumn;
    });
    this.data.forEach((column) => column.addTo(this.layer));
  }
  delete(value: number) {
    const index = this.data.findIndex((item) => item.value == value);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.data.forEach((column, i) => {
        column.setPosition(i * (BaseShape.BASE_UNIT + 10), 0);
      });
    }
  }

  async swap(firstIndex: number, secondIndex: number) {
    new Konva.Tween({
      node: this.data[firstIndex].render,
      duration: this.getDuration(),
      x: this.data[secondIndex].position.x,
      y: this.data[secondIndex].position.y,
    }).play();
    new Konva.Tween({
      node: this.data[secondIndex].render,
      duration: this.getDuration(),
      x: this.data[firstIndex].position.x,
      y: this.data[firstIndex].position.y,
    }).play();
    await this.sleep();

    [this.data[firstIndex], this.data[secondIndex]] = [
      this.data[secondIndex],
      this.data[firstIndex],
    ];
  }

  async highlight(index: number) {
    new Konva.Tween({
      node: this.data[index].shape,
      duration: this.getDuration(),
      fill: "#2ec56a",
    }).play();
    await this.sleep();
  }

  async unhighlight(index: number) {
    this.data[index].setAttrs(BaseShape.BASE_SHAPE_CONFIG);
    await this.sleep();
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    if (this.resumeSignal) {
      this.resumeSignal();
      this.resumeSignal = null;
    }
  }

  protected async checkPause() {
    if (this.paused) {
      await new Promise((resolve) => {
        this.resumeSignal = resolve;
      });
    }
  }
}
