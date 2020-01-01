import Variable from "./variable/variable";
import Solver from "./solver/solver";

describe("A solver which doesn't self-destruct", () => {
  it("minimizes", () => {
    const varA = new Variable({ currentVal: 0, max: 30 });
    const varB = new Variable({ currentVal: 0, max: 30 });
    const vars = [varA, varB];
    const eq = (a: Variable, b: Variable) =>
      2 * a.currentVal + 3 * b.currentVal === 50;
    const ineqB = (a: Variable, b: Variable) =>
      10 - a.currentVal + 4 * b.currentVal <= 100;
    const constraintA = (a: Variable, b: Variable) =>
      a.currentVal + b.currentVal < 30;
    const constraints = [eq, ineqB, constraintA];

    const objective = (a: Variable, b: Variable) => a.currentVal + b.currentVal;

    const model = {
      constraints,
      maxAttempts: 10000,
      objective,
      targetVarIndex: 1,
      type: "min" as "min",
      variables: vars
    };

    const optimizer = new Solver(model);
    const result = optimizer.solve();
    expect(result.metObjective).toBe(true);
  });

  it("maximizes", () => {
    const varA = new Variable({ currentVal: 0, max: 30 });
    const varB = new Variable({ currentVal: 0, max: 30 });
    const vars = [varA, varB];
    const eq = (a: Variable, b: Variable) =>
      2 * a.currentVal + 3 * b.currentVal === 50;
    const ineqB = (a: Variable, b: Variable) =>
      10 - a.currentVal + 4 * b.currentVal <= 100;
    const constraintA = (a: Variable, b: Variable) =>
      a.currentVal + b.currentVal < 30;
    const constraints = [eq, ineqB, constraintA];

    const objective = (a: Variable, b: Variable) => a.currentVal + b.currentVal;

    const model = {
      constraints,
      maxAttempts: 10000,
      objective,
      targetVarIndex: 1,
      type: "max" as "max",
      variables: vars
    };

    const optimizer = new Solver(model);
    const result = optimizer.solve();
    expect(result.metObjective).toBe(true);
  });

  it("solves a furniture shop problem", () => {
    const tables = new Variable({ currentVal: 0, max: 100 });
    const dressers = new Variable({ currentVal: 0, max: 100 });

    const woodConstraint = (tables: Variable, dressers: Variable) =>
      tables.currentVal * 30 + dressers.currentVal * 20 <= 300;
    const laborConstraint = (tables: Variable, dressers: Variable) =>
      tables.currentVal * 5 + dressers.currentVal * 10 <= 110;
    const storageConstraint = (tables: Variable, dressers: Variable) =>
      tables.currentVal * 30 + dressers.currentVal * 50 <= 400;

    const constraints = [woodConstraint, laborConstraint, storageConstraint];
    const objective = (tables: Variable, dressers: Variable) =>
      tables.currentVal * 1200 + dressers.currentVal * 1600;
    const variables = [tables, dressers];

    const model = {
      constraints,
      maxAttempts: 200000,
      objective,
      type: "max" as "max",
      variables
    };
    const optimizer = new Solver(model);
    const result = optimizer.solve();
    console.log(result);
    expect(result.metObjective).toBe(true);
  });
});
