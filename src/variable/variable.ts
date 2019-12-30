import generateID from "../utils/utils";

type TVariable = {
  currentVal: number;
  max?: number;
  min?: number;
};

export default class Variable {
  currentVal = 0;
  private min = 0;
  private max = 1000;
  private attempts: number[] = [];
  id: string;
  constructor({ currentVal, max = 1000, min = 0 }: TVariable) {
    this.id = generateID();
    this.attempts = [];
    this.min = min;
    this.max = max;
    this.currentVal = currentVal !== undefined ? currentVal : min;
    this.generateRange();
  }

  private generateRange = () => {
    const { min, max } = this;
    const output = [];
    for (let i = min + 1; i < max; i++) {
      output.push(i);
    }
    this.attempts = output;
  };

  next = () => {
    this.attempts = this.attempts.sort(() => Math.random() - 0.5);
    const output = this.attempts[0];
    this.currentVal = output;
  };
}
