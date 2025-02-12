import { useState, useContext } from 'react';
import FeedbackContext from '../../context/FeedbackContext';
import { toast } from 'react-hot-toast';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
  });
  const { addFeedback } = useContext(FeedbackContext);

  const categories = [
    'Infrastructure',
    'Water Facility',
    'Canteen Services',
    'Student Section',
    'Administrative Services',
    'Training & Placement Cell'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addFeedback(formData);
    setFormData({ category: '', description: '' });
    toast.success('Feedback submitted successfully!');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Describe your feedback..."
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;