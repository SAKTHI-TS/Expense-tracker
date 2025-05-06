import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement
Modal.setAppElement('#root');

const ExpenseList = ({ expenses, loading, deleteExpense, updateExpense }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: ''
  });

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setEditFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      description: expense.description || ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(currentExpense._id, editFormData);
      setIsEditModalOpen(false);
      toast.success('Expense updated successfully');
    } catch (err) {
      toast.error('Failed to update expense');
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (loading) {
    return <div>Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return <div>No expenses found. Add some expenses to get started!</div>;
  }

  return (
    <div className="expense-list">
      <h2>Your Expenses</h2>
      
      {/* Edit Expense Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Expense"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>Edit Expense</h3>
          <button onClick={closeEditModal} className="modal-close-btn">
            &times;
          </button>
        </div>
        <form onSubmit={handleEditSubmit} className="modal-form">
          <div className="form-group">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleEditFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount*</label>
            <input
              type="number"
              name="amount"
              value={editFormData.amount}
              onChange={handleEditFormChange}
              required
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Category*</label>
            <select
              name="category"
              value={editFormData.category}
              onChange={handleEditFormChange}
              required
            >
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
              value={editFormData.description}
              onChange={handleEditFormChange}
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              onClick={closeEditModal}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Expenses Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleEditClick(expense)}
                  className="btn btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;