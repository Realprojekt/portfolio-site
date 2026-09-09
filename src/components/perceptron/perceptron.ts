export type Label = 1 | -1;

export interface TrainingExample {
  inputs: [number, number, number]; // x, y, bias
  target: Label;
}

export const LINE_SLOPE = 2;
export const LINE_INTERCEPT = 1;

export function trueLineY(x: number): number {
  return LINE_SLOPE * x + LINE_INTERCEPT;
}

export function generateExample(): TrainingExample {
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;
  const target: Label = y > trueLineY(x) ? 1 : -1;
  return { inputs: [x, y, 1], target };
}

export class Perceptron {
  weights: number[];
  learningRate: number;

  constructor(numInputs: number, learningRate = 0.1) {
    this.weights = Array.from({ length: numInputs }, () => Math.random() * 6 - 3);
    this.learningRate = learningRate;
  }

  activate(sum: number): Label {
    return sum >= 0 ? 1 : -1;
  }

  guess(inputs: number[]): Label {
    const total = inputs.reduce((sum, v, i) => sum + v * this.weights[i], 0);
    return this.activate(total);
  }

  train(inputs: number[], target: Label): void {
    const guess = this.guess(inputs);
    const error = target - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.learningRate * error * inputs[i];
    }
  }

  accuracy(sampleSize: number): number {
    let correct = 0;
    for (let i = 0; i < sampleSize; i++) {
      const { inputs, target } = generateExample();
      if (this.guess(inputs) === target) correct++;
    }
    return correct / sampleSize;
  }
}
