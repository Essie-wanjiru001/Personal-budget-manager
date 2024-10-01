import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseSummary({ expenses, totalIncome }) {
  const categories = [...new Set(expenses.map((expense) => expense.category)), 'Savings'];
  
  const categoryTotals = categories.reduce((acc, category) => {
    if (category === 'Savings') {
      const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
      acc[category] = Math.max(totalIncome - totalExpenses, 0);
    } else {
      acc[category] = expenses
        .filter((expense) => expense.category === category)
        .reduce((total, expense) => total + expense.amount, 0);
    }
    return acc;
  }, {});

  const totalExpenses = Object.values(categoryTotals).reduce((a, b) => a + b, 0) - categoryTotals['Savings'];

  const data = {
    labels: categories,
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#7DFF50', '#A9A9A9', '#FFD700', '#C71585',
          '#20B2AA', '#8B4513',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: KES ${value.toFixed(2)} (${percentage}%)`;
          }
        }
      },
      legend: {
        position: 'right',
      }
    }
  };

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>
      <div className="summary-container">
        <div className="chart-container" style={{ height: '400px', width: '60%' }}>
          <Pie data={data} options={options} />
        </div>
        <div className="table-container">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount (KES)</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => {
                const amount = categoryTotals[category];
                const percentage = ((amount / totalIncome) * 100).toFixed(2);
                return (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{amount.toFixed(2)}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="summary-footer">
        <p>Total Income: KES {totalIncome.toFixed(2)}</p>
        <p>Total Expenses: KES {totalExpenses.toFixed(2)}</p>
        <p>Savings: KES {categoryTotals['Savings'].toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ExpenseSummary;