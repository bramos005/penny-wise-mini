export const getPercentage = (income: number, budget: number) => {
    
    const budgetPercentage = (budget / income) * 100
    
    return budgetPercentage;
}