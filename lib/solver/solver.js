"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Solver {
    constructor({ variables, objective, constraints, maxAttempts = 500 }) {
        this.constraints = [];
        this.variables = [];
        this.solve = () => {
            const { constraints, objective, variables, maxAttempts } = this;
            let metObjective = objective(constraints, variables);
            let currentAttempts = 0;
            console.time("solve");
            while (!metObjective && currentAttempts < maxAttempts) {
                console.log({ currentAttempts, variables });
                variables.forEach(v => v.next());
                metObjective = objective(constraints, variables);
                currentAttempts += 1;
            }
            console.time("solve");
            return { variables, currentAttempts };
        };
        this.variables = variables;
        this.objective = objective;
        this.constraints = constraints;
        this.maxAttempts = maxAttempts;
    }
}
exports.Solver = Solver;
//# sourceMappingURL=solver.js.map