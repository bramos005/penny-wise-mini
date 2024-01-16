import { Budget } from "@prisma/client";

export const getBudgetBarValues = (budgets: Budget[]) => {
    if (budgets) {
         const barValues = budgets.map((budget: Budget) => {
        let { name, amount, frequency } = budget;
        if (frequency === "weekly") {
            amount = amount * 4;
        }
        return {
            name,
            amount
        };
         });
        return barValues;
    }
   
 
    
}
