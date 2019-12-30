import Variable from "../variable/variable";

type TSolverModel = {
  constraints: ((...args: Variable[]) => boolean)[];
  maxAttempts?: number;
  objective: (...variables: Variable[]) => number;
  type: "min" | "max";
  variables: Variable[];
};

export default class Solver {
  constraints: ((...args: Variable[]) => boolean)[] = [];
  currentOutput: number = 0;
  maxAttempts: number;
  objective: (...variables: Variable[]) => number;
  successVars: number[] = [];
  type: "min" | "max" = "min";
  variables: Variable[] = [];

  constructor({
    constraints,
    maxAttempts = 500,
    objective,
    type = "min",
    variables
  }: TSolverModel) {
    this.variables = variables;
    this.objective = objective;
    this.constraints = constraints;
    this.maxAttempts = maxAttempts;
    this.type = type;
    this.currentOutput = type === "min" ? 1000000 : -1;
  }

  solve = () => {
    const { maxAttempts, objective, type, variables } = this;
    let metObjective = false;
    let currentAttempts = 0;
    console.time("solve");
    while (currentAttempts < maxAttempts) {
      variables.forEach(v => v.next());
      let test = this.constraints.reduce((output, con) => {
        return output && con(...this.variables);
      }, true);
      let output = objective(...variables);

      if (type === "min" && test && output <= this.currentOutput) {
        this.currentOutput = output;
        metObjective = true;
        this.successVars = variables.map(v => v.currentVal);
      }

      if (type === "max" && test && output >= this.currentOutput) {
        this.currentOutput = output;
        metObjective = true;
        this.successVars = variables.map(v => v.currentVal);
      }

      currentAttempts += 1;
    }
    console.time("solve");
    return {
      type: this.type,
      solution: this.currentOutput,
      metObjective,
      variables: this.successVars
    };
  };
}
