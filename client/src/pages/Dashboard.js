import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/ExpenseChart';

const Dashboard = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/expenses', {
        headers: { 'x-auth-token': token }
      });
      setExpenses(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to fetch expenses');
      setLoading(false);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/expenses', expense, {
        headers: { 'x-auth-token': token }
      });
      setExpenses([res.data, ...expenses]);
      toast.success('Expense added successfully');
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to add expense');
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/expenses/${id}`, updatedExpense, {
        headers: { 'x-auth-token': token }
      });
      setExpenses(
        expenses.map((expense) =>
          expense._id === id ? { ...expense, ...res.data } : expense
        )
      );
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/expenses/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
      toast.success('Expense deleted successfully');
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to delete expense');
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>
      <div className="dashboard-content">
        <div className="dashboard-form">
          <ExpenseForm addExpense={addExpense} />
        </div>
        <div className="dashboard-stats">
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
      <div className="dashboard-list">
        <ExpenseList
          expenses={expenses}
          loading={loading}
          deleteExpense={deleteExpense}
          updateExpense={updateExpense}
        />
      </div>
    </div>
  );
};

export default Dashboard;