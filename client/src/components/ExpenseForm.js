import { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: ''
  });

  const { title, amount, category, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      alert('Please fill in all required fields');
      return;
    }
    addExpense({
      title,
      amount: parseFloat(amount),
      category,
      description
    });
    setFormData({
      title: '',
      amount: '',
      category: '',
      description: ''
    });
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title*</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount*</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Category*</label>
          <select name="category" value={category} onChange={onChange} required>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;