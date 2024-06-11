import React, { useEffect, useState } from 'react';

interface Feedback {
  name: string;
  feedback: string;
}

const FeedbackList: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/api/feedback');
        if (!response.ok) {
          throw new Error(`Failed to fetch feedbacks: ${response.statusText}`);
        }
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Feedback List</h2>
      <ul>
        {feedback.map((entry, index) => (
          <li key={index}>
            <strong>{entry.name}:</strong> {entry.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
