import create from "./createBudget";
import read from "./getBudgets";
import destroy from "./deleteBudget";

const budget = {
    create,
    read,
    destroy
};

export default budget