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

  // Effect to load stored expenses and set the current month
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses.map(expense => ({
      ...expense,
      amount: parseFloat(expense.amount)
    })));
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setSelectedMonth(currentMonth);
  }, []);

  // Effect to save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && item && amount && category) {
      const newExpense = { id: Date.now(), date, item, amount: parseFloat(amount), category };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      setDate('');
      setItem('');
      setAmount('');
      setCategory('');
      setFormVisible(false);
    }
  };

  // Filter expenses based on selected month
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return selectedMonth
      ? expenseDate.toLocaleString('default', { month: 'long' }) === selectedMonth
      : true;
  });

  const totalExpenses = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  const totalSavings = totalIncome - totalExpenses;

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
      <div>
        <label>Total Income for {selectedMonth}: </label>
        <input
          type="number"
          value={totalIncome}
          onChange={(e) => setTotalIncome(parseFloat(e.target.value))}
        />
      </div>
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
          <button type="submit">Add Expense</button>
        </form>
      )}
      <h3>Expenses:</h3>
      {filteredExpenses.length === 0 ? (
        <p>No expenses for {selectedMonth}.</p>
      ) : (
        <>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Amount Spent (KES)</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.item}</td>
                  <td>{expense.amount.toFixed(2)}</td>
                  <td>{expense.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total Expenses: KES {totalExpenses.toFixed(2)}</h4>
          <h4>Total Income: KES {totalIncome.toFixed(2)}</h4>
          <h4>Total Savings: KES {totalSavings.toFixed(2)}</h4>
        </>
      )}
      <ExpenseSummary expenses={filteredExpenses} totalIncome={totalIncome} />
    </div>
  );
};

export default ExpenseTracker;