"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variable_1 = __importDefault(require("./variable/variable"));
const solver_1 = __importDefault(require("./solver/solver"));
describe("A solver which doesn't self-destruct", () => {
    it("minimizes", () => {
        const varA = new variable_1.default({ currentVal: 0, max: 30 });
        const varB = new variable_1.default({ currentVal: 0, max: 30 });
        const vars = [varA, varB];
        const eq = (a, b) => 2 * a.currentVal + 3 * b.currentVal === 50;
        const ineqB = (a, b) => 10 - a.currentVal + 4 * b.currentVal <= 100;
        const constraintA = (a, b) => a.currentVal + b.currentVal < 30;
        const constraints = [eq, ineqB, constraintA];
        const objective = (a, b) => a.currentVal + b.currentVal;
        const model = {
            constraints,
            maxAttempts: 10000,
            objective,
            targetVarIndex: 1,
            type: "min",
            variables: vars
        };
        const optimizer = new solver_1.default(model);
        const result = optimizer.solve();
        expect(result.metObjective).toBe(true);
    });
    it("maximizes", () => {
        const varA = new variable_1.default({ currentVal: 0, max: 30 });
        const varB = new variable_1.default({ currentVal: 0, max: 30 });
        const vars = [varA, varB];
        const eq = (a, b) => 2 * a.currentVal + 3 * b.currentVal === 50;
        const ineqB = (a, b) => 10 - a.currentVal + 4 * b.currentVal <= 100;
        const constraintA = (a, b) => a.currentVal + b.currentVal < 30;
        const constraints = [eq, ineqB, constraintA];
        const objective = (a, b) => a.currentVal + b.currentVal;
        const model = {
            constraints,
            maxAttempts: 10000,
            objective,
            targetVarIndex: 1,
            type: "max",
            variables: vars
        };
        const optimizer = new solver_1.default(model);
        const result = optimizer.solve();
        expect(result.metObjective).toBe(true);
    });
    it("solves a furniture shop problem", () => {
        const tables = new variable_1.default({ currentVal: 0, max: 100 });
        const dressers = new variable_1.default({ currentVal: 0, max: 100 });
        const woodConstraint = (tables, dressers) => tables.currentVal * 30 + dressers.currentVal * 20 <= 300;
        const laborConstraint = (tables, dressers) => tables.currentVal * 5 + dressers.currentVal * 10 <= 110;
        const storageConstraint = (tables, dressers) => tables.currentVal * 30 + dressers.currentVal * 50 <= 400;
        const constraints = [woodConstraint, laborConstraint, storageConstraint];
        const objective = (tables, dressers) => tables.currentVal * 1200 + dressers.currentVal * 1600;
        const variables = [tables, dressers];
        const model = {
            constraints,
            maxAttempts: 200000,
            objective,
            type: "max",
            variables
        };
        const optimizer = new solver_1.default(model);
        const result = optimizer.solve();
        console.log(result);
        expect(result.metObjective).toBe(true);
    });
});
//# sourceMappingURL=solver.test.js.map