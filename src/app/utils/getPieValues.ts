import { Budget } from "@prisma/client";

export const getPieValues = (budgets: Budget[]) => {
  let savingsInvestments = 0;
  let housing = 0;
  let food = 0;
  let shopping = 0;
  let entertainment = 0;
  let transportation = 0;
  let education = 0;
  let miscellaneous = 0;

  budgets?.forEach((budget) => {
    const { category, amount } = budget;
    if (category === "savings&investments") {
      savingsInvestments += amount;
    } else if (category === "housing") {
      housing += amount;
    } else if (category === "food") {
      food += amount;
    } else if (category === "shopping") {
      shopping += amount;
    } else if (category === "entertainment") {
      entertainment += amount;
    } else if (category === "transportation") {
      transportation += amount;
    } else if (category === "education") {
      education += amount;
    } else if (category === "miscellaneous") {
      miscellaneous += amount;
    }
  });

  const pieData = [
    { name: "Savings & Investments", value: savingsInvestments },
    { name: "Housing", value: housing },
    { name: "Food", value: food },
    { name: "Shopping", value: shopping },
    { name: "Entertainment", value: entertainment },
    { name: "Transportation", value: transportation },
    { name: "Education", value: education },
    { name: "Miscellaneous", value: miscellaneous },
  ];

  return pieData;
};
