import { useContext, useState } from 'react';
import FeedbackContext from '../../context/FeedbackContext';

const ManagementDashboard = () => {
  const { feedbacks, resolveFeedback } = useContext(FeedbackContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resolutionText, setResolutionText] = useState('');

  const categories = [
    'all',
    'Infrastructure',
    'Water Facility',
    'Canteen Services',
    'Student Section',
    'Administrative Services',
    'Training & Placement Cell'
  ];

  const filteredFeedbacks = selectedCategory === 'all' 
    ? feedbacks 
    : feedbacks.filter(f => f.category === selectedCategory);

  const handleResolve = (id) => {
    if (resolutionText.trim()) {
      resolveFeedback(id, resolutionText);
      setResolutionText('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredFeedbacks.map(feedback => (
          <div key={feedback.id} className="p-4 border rounded bg-white shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{feedback.category}</h3>
                <p className="text-gray-600">{feedback.description}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(feedback.date).toLocaleDateString()}
              </span>
            </div>
            
            {!feedback.resolved && (
              <div className="mt-4">
                <textarea
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="Enter resolution details..."
                  className="w-full p-2 border rounded mb-2"
                  rows="2"
                />
                <button
                  onClick={() => handleResolve(feedback.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Mark Resolved
                </button>
              </div>
            )}
            
            {feedback.updates.map((update, index) => (
              <div key={index} className="mt-2 p-2 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">{update.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(update.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementDashboard;