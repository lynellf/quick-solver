# quick-solver

Possibly the worst solver of all time?

## Problem: I needed a solver

I've tried many solvers over the past few weeks and I didn't like any of them. jsLPSolver, SciPy, NLopt, etc...

So... I made my own

This solver falls into the realm of a "Brute Force" technique. So it's not performant by any means. However, this apporach may be all that I need given how small the scope of my initial problem is.

**Intergers only.**

## API

The solver takes one parameter, the model object.

The model is comprised of the following properties:

```typescript
type TSolverModel = {
  constraints: ((...args: Variable[]) => boolean)[];
  maxAttempts?: number;
  objective: (...variables: Variable[]) => number;
  type: "min" | "max";
  variables: Variable[];
};
```

**Constraints:** Provide a list of functions which all take a variable amount of 'Variables' as arguments

**Max Attempts:** How many times should the solver try to crack our problem?

**Objective:** A function which also takes a variable amount of 'Variables' and returns a numeric value

**Type:** Do we want the highest possible solution available or the lowest?

**Variables:** A list of "Variables"

**What is a "Variable"**

```typescript
type TVariable = {
  currentVal: number;
  max?: number;
  min?: number;
};
```

**Current Value:** The starting value of our variable.

**Min and Max:** The variable object has two optional parameters, min and max, which will define the upper and lower bounds.

> You run a small custom furniture shop and make custom tables and dressers.
> Each week you're limited to 300 square feet of wood, 110 hours of labor, and 400 square feet of storage.
> A table uses 30sf of wood, 5 hours of labor, requires 30sf of storage and has a gross profit of $1,200. A dresser uses 20sf of wood, 10 hours of work to put together, requires 50 square feet to store and has a gross profit of $1,600.
> How much of each do you produce to maximize profit, given that partial furniture aren't allowed in this dumb world problem?

```typescript
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
  maxAttempts: 15000,
  objective,
  type: "max",
  variables
};
const optimizer = new Solver(model);
const result = optimizer.solve();

/**
 * { type: 'max',
      solution: 14400,
      metObjective: true,
      variables: [ 8, 3 ] }
 */
```
