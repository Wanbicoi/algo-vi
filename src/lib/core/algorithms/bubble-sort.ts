import { IBaseAlgorithm } from "../base-algorithm";
import { SortingAlgorithm } from "../sorting-algorithm";

export class BubbleSort extends SortingAlgorithm implements IBaseAlgorithm {
  async run() {
    let n = this.data.length;
    for (let i = 0; i < n - 1; i++) {
      await this.highlight(i);
      for (let j = i + 1; j < n; j++) {
        await this.highlight(j);
        if (this.data[i].value > this.data[j].value) {
          await this.swap(i, j);
        }
        await this.unhighlight(j);
      }
      await this.unhighlight(i);
    }
  }
}
