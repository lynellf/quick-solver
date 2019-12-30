import { Variable } from "../variable/variable";
declare type TSolverModel = {
    maxAttempts?: number;
    constraints: ((args: Variable[]) => boolean)[];
    objective: <C, V>(cons: C[], vars: V[]) => boolean;
    variables: Variable[];
};
export declare class Solver {
    constraints: ((args: Variable[]) => boolean)[];
    objective: <C, V>(cons: C[], vars: V[]) => boolean;
    variables: Variable[];
    maxAttempts: number;
    constructor({ variables, objective, constraints, maxAttempts }: TSolverModel);
    solve: () => {
        variables: Variable[];
        currentAttempts: number;
    };
}
export {};
