import { Budget } from "@prisma/client"
export const getBudget = (budgets: Budget[]) => {
    let sum = 0;
    budgets.forEach(budget => {
        let { amount, frequency } = budget;
        if (frequency === "weekly") {
            amount *= 4;
        }
        sum += amount;
    })
    return sum;
}