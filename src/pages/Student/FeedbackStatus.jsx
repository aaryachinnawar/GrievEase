import { useContext } from 'react';
import FeedbackContext from '../../context/FeedbackContext';

const FeedbackStatus = () => {
  const { feedbacks } = useContext(FeedbackContext);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Your Feedback Status</h2>
      <div className="space-y-4">
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="p-4 border rounded">
            <p className="font-semibold">{feedback.category}</p>
            <p className="text-gray-600">{feedback.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className={`px-2 py-1 rounded ${feedback.resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {feedback.resolved ? 'Resolved' : 'Pending'}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(feedback.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackStatus;