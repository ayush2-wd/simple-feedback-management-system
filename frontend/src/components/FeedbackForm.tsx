import React, { useState, useEffect } from 'react';
import './FeedbackForm.css'; // Import CSS file for styling

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState<{ name: string, feedback: string }[]>([]);
  const [error, setError] = useState<string>('');

  // Fetch feedbacks from the server
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks.');
      }
      const data = await response.json();
      setFeedbackList(data);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback.');
      }

      setName('');
      setFeedback('');
      setError('');

      // Fetch feedbacks again after submitting new feedback
      fetchFeedbacks();
    } catch (error: any) {
      setError(error.message);
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="feedback-form-container">
      <h2 className="form-title">Share Your Feedback</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback" className="form-label">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            id="feedback"
            placeholder="Share your thoughts..."
            className="form-textarea"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
      <div className="feedback-list">
        <h2 className="list-title">Feedback List</h2>
        <ul>
          {feedbackList.map((feedbackItem, index) => (
            <li key={index} className="feedback-item">
              <strong>{feedbackItem.name}:</strong> {feedbackItem.feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackForm;
