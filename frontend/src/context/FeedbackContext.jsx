import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedbacks = localStorage.getItem('feedbacks');
    if (storedFeedbacks) setFeedbacks(JSON.parse(storedFeedbacks));
  }, []);

  const addFeedback = (feedback) => {
    const newFeedback = { 
      ...feedback, 
      id: Date.now(),
      date: new Date().toISOString(),
      resolved: false,
      updates: []
    };
    
    setFeedbacks(prev => {
      const updated = [newFeedback, ...prev];
      localStorage.setItem('feedbacks', JSON.stringify(updated));
      return updated;
    });
    
    toast.success('Feedback submitted!');
    // Simulate department notification
    console.log(`Notified ${feedback.category} department`);
  };

  const resolveFeedback = (id, resolution) => {
    setFeedbacks(prev => {
      const updated = prev.map(f => f.id === id ? { 
        ...f, 
        resolved: true,
        updates: [...f.updates, {
          date: new Date().toISOString(),
          message: resolution
        }]
      } : f);
      localStorage.setItem('feedbacks', JSON.stringify(updated));
      return updated;
    });
    
    toast.success('Feedback resolved!');
    // Simulate student notification
    console.log(`Notified student about resolution of feedback ${id}`);
  };

  const generateReport = () => {
    const report = feedbacks.reduce((acc, f) => {
      acc[f.category] = acc[f.category] || { total: 0, resolved: 0 };
      acc[f.category].total++;
      if (f.resolved) acc[f.category].resolved++;
      return acc;
    }, {});
    
    return Object.entries(report).map(([category, stats]) => ({
      category,
      ...stats
    }));
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, resolveFeedback, generateReport }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;