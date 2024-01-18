export default async function getReport(req: Request) {
  const { income, budgets } = await req.json();
  type Expenses = {
    [key: string]: number;
  };
  interface Budget {
    name: string;
    frequency: string;
    category: string;
    amount: number;
    userId: string;
    id: string;
  }
  let totalMonthlyExpenses = 0;
  let expensesByCategory: Expenses = {};
  let savingsInvestments = 0;

  const generatePositiveFeedback = (
    savingsRate: number,
    savingsInvestments: number
  ) => {
    let feedback = "";
    if (savingsInvestments > 0) {
      feedback += "Great job on contributing to your savings and investments! ";
    }

    if (savingsRate > 20) {
      feedback += "You're saving a healthy portion of your income. Keep it up!";
    } else if (savingsRate > 10) {
      feedback +=
        "You have a decent savings rate. Consider if you can optimize your expenses further to boost savings.";
    } else {
      feedback +=
        "You're on the right track with your savings. Every bit counts, so keep looking for ways to increase your savings rate.";
    }

    return feedback;
  };

  const generateImprovementTips = (expenses: any, income: number) => {
    let tips = "";
    // High housing costs
    if (expenses["housing"] && expenses["housing"] / income > 0.3) {
      tips +=
        "- Consider options to reduce your housing costs, which are a large part of your budget.\n";
    }

    // High food expenses
    if (expenses["food"] && expenses["food"] / income > 0.15) {
      tips +=
        "- You might be spending quite a bit on food. Look for ways to economize your grocery and dining expenses.\n";
    }

    // High shopping expenses
    if (expenses["shopping"] && expenses["shopping"] / income > 0.1) {
      tips +=
        "- Your shopping expenses are notable. Try to prioritize needs over wants and look for discounts and deals.\n";
    }

    // High entertainment costs
    if (
      expenses["entertainment"] &&
      expenses["entertainment"] / income > 0.05
    ) {
      tips +=
        "- Entertainment is essential, but you could save by finding more affordable or free activities.\n";
    }

    // High transportation costs
    if (
      expenses["transportation"] &&
      expenses["transportation"] / income > 0.1
    ) {
      tips +=
        "- Consider more cost-effective transportation options, like public transit or carpooling.\n";
    }

    // High education expenses
    if (expenses["education"] && expenses["education"] / income > 0.1) {
      tips +=
        "- Education expenses are significant. Explore scholarships, grants, or alternative learning resources.\n";
    }

    // Miscellaneous expenses
    if (expenses["miscellaneous"] && expenses["miscellaneous"] / income > 0.1) {
      tips +=
        "- Miscellaneous expenses can add up. Review these to see where you can cut back.\n";
    }

    if (tips === "") {
      tips =
        "Your budget seems well-balanced. Continue to monitor your expenses to maintain your financial health.\n";
    }

    return tips;
  };

  try {
    budgets.forEach((budget: Budget) => {
      let monthlyAmount = budget.amount;

      // Convert weekly amounts to monthly
      if (budget.frequency === "weekly") {
        monthlyAmount *= 4.33;
      }

      if (budget.category === "savings&investments") {
        savingsInvestments += monthlyAmount;
      } else {
        totalMonthlyExpenses += monthlyAmount;
      }

      if (!expensesByCategory[budget.category]) {
        expensesByCategory[budget.category] = 0;
      }
      expensesByCategory[budget.category] += monthlyAmount;
    });

    const totalSavings = income - totalMonthlyExpenses + savingsInvestments;
    const savingsRate = (totalSavings / income) * 100;

    let report = `Monthly Income: $${income}\nTotal Monthly Expenses (Excluding Savings & Investments): $${totalMonthlyExpenses.toFixed(
      2
    )}\n`;

    for (const category in expensesByCategory) {
      if (category !== "savings&investments") {
        report += `Expenses in ${category}: $${expensesByCategory[
          category
        ].toFixed(2)}\n`;
      }
    }

    report += `Contributions to Savings & Investments: $${savingsInvestments.toFixed(
      2
    )}\n`;
    report += `Total Savings (Including Savings & Investments): $${totalSavings.toFixed(
      2
    )}\n`;
    report += `Savings Rate: ${savingsRate.toFixed(2)}%\n`;

    if (totalSavings >= 0) {
      report += generatePositiveFeedback(savingsRate, savingsInvestments);
    } else {
      report += "Monthly Deficit: $" + Math.abs(totalSavings).toFixed(2) + "\n";
      report += "Tips for Improvement:\n";
      report += generateImprovementTips(expensesByCategory, income);
    }
    console.log(report);

    return new Response(JSON.stringify({ report: report }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    });
  }
}
