import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './ExpenseTracker.css';
import ExpenseSummary from './ExpenseSummary';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses).map(expense => ({
      ...expense,
      amount: parseFloat(expense.amount)
    })) : [];
  });
  
  const [date, setDate] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [budgetLimits, setBudgetLimits] = useState(() => {
    const savedBudgetLimits = localStorage.getItem('budgetLimits');
    return savedBudgetLimits ? JSON.parse(savedBudgetLimits) : {};
  });
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [alert, setAlert] = useState(null);

  const categories = [
    'Rent',
    'Electricity',
    'Internet and Phone Bill',
    'Groceries',
    'Insurance',
    'Transport',
    'Emergency',
    'Clothes',
    'Repair and Maintenance',
    'Hair and Beauty',
    'Miscellaneous and fun',
    'Savings',
  ];

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses.map(expense => ({
      ...expense,
      amount: parseFloat(expense.amount)
    })));
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setSelectedMonth(currentMonth);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budgetLimits', JSON.stringify(budgetLimits));
  }, [budgetLimits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && item && amount && category) {
      const newExpense = { id: Date.now(), date, item, amount: parseFloat(amount), category };

      if (editingExpenseId) {
        setExpenses(expenses.map(expense =>
          expense.id === editingExpenseId ? newExpense : expense
        ));
        setEditingExpenseId(null);
      } else {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      }

      // Check budget limit and show alert
      const categoryTotal = getCategoryTotal(category) + parseFloat(amount);
      const limit = budgetLimits[category] || 0;
      const remaining = Math.max(0, limit - categoryTotal);

      setAlert({
        message: `Budget for ${category}: KES ${limit.toFixed(2)}
                  Amount spent: KES ${categoryTotal.toFixed(2)}
                  Remaining: KES ${remaining.toFixed(2)}`,
        type: remaining > 0 ? 'info' : 'warning'
      });

      setDate('');
      setItem('');
      setAmount('');
      setCategory('');
      setFormVisible(false);
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return selectedMonth
      ? expenseDate.toLocaleString('default', { month: 'long' }) === selectedMonth
      : true;
  });

  const totalExpenses = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  const totalSavings = totalIncome - totalExpenses;

  const handleEdit = (expense) => {
    setDate(expense.date);
    setItem(expense.item);
    setAmount(expense.amount);
    setCategory(expense.category);
    setEditingExpenseId(expense.id);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleBudgetLimitChange = (category, limit) => {
    setBudgetLimits(prevLimits => ({
      ...prevLimits,
      [category]: parseFloat(limit) || 0
    }));
  };

  const getCategoryTotal = (category) => {
    return filteredExpenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getBudgetStatus = (category) => {
    const total = getCategoryTotal(category);
    const limit = budgetLimits[category] || 0;
    if (limit === 0) return 'no-limit';
    if (total > limit) return 'over-budget';
    if (total > limit * 0.8) return 'near-limit';
    return 'within-budget';
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    setShowBudgetForm(true);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    setShowBudgetForm(false);
  };

  return (
    <div className="expense-tracker">
      <Navbar />
      <h2>Monthly Spending Log</h2>
      <label htmlFor="month-selector">Select Month: </label>
      <select
        id="month-selector"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">All Months</option>
        {Array.from({ length: 12 }, (_, index) => {
          const date = new Date();
          date.setMonth(index);
          return date.toLocaleString('default', { month: 'long' });
        }).map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <form onSubmit={handleIncomeSubmit}>
        <label>Total Income for {selectedMonth}: </label>
        <input
          type="number"
          value={totalIncome}
          onChange={(e) => setTotalIncome(parseFloat(e.target.value))}
          required
        />
        <button type="submit">Set Income</button>
      </form>

      {showBudgetForm && (
        <div className="budget-form-overlay">
          <div className="budget-form">
            <h3>Set Budget Limits for {selectedMonth}</h3>
            <form onSubmit={handleBudgetSubmit}>
              {categories.map((cat) => (
                <div key={cat} className="budget-limit-item">
                  <label>{cat}:</label>
                  <input
                    type="number"
                    value={budgetLimits[cat] || ''}
                    onChange={(e) => handleBudgetLimitChange(cat, e.target.value)}
                    placeholder="Set limit"
                  />
                </div>
              ))}
              <button type="submit">Save Budget Limits</button>
            </form>
          </div>
        </div>
      )}

      <button onClick={() => setFormVisible((prev) => !prev)}>
        {isFormVisible ? 'Cancel' : 'Add Expense'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Item:</label>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount Spent:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">{editingExpenseId ? 'Update Expense' : 'Add Expense'}</button>
        </form>
      )}

      {alert && (
        <div className={`alert ${alert.type}`}>
          <pre>{alert.message}</pre>
          <button onClick={() => setAlert(null)}>Dismiss</button>
        </div>
      )}

      <h3>Expenses:</h3>
      {filteredExpenses.length === 0 ? (
        <p>No expenses for {selectedMonth}.</p>
      ) : (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Amount Spent (KES)</th>
              <th>Category</th>
              <th>Budget Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className={getBudgetStatus(expense.category)}>
                <td>{expense.date}</td>
                <td>{expense.item}</td>
                <td>{expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>{getBudgetStatus(expense.category)}</td>
                <td>
                  <button onClick={() => handleEdit(expense)}>Edit</button>
                  <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h4>Total Expenses: KES {totalExpenses.toFixed(2)}</h4>
      <h4>Total Income: KES {totalIncome.toFixed(2)}</h4>
      <h4>Total Savings: KES {totalSavings.toFixed(2)}</h4>
      <ExpenseSummary expenses={filteredExpenses} totalIncome={totalIncome} />
    </div>
  );
};

export default ExpenseTracker;