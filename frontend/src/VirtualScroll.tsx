import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Feedback {
  name: string;
  feedback: string;
}

const VirtualScroll: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/feedback');
        if (!response.ok) {
          throw new Error(`Failed to fetch feedbacks: ${response.statusText}`);
        }
        const data: Feedback[] = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback', error);
      }
    };

    fetchData();
  }, []);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        // Logic to fetch or render additional items
        console.log('Load more items');
      }
    }
  }, []);

  return (
    <div>
      <h2>Feedback List </h2>
      <div
        ref={containerRef}
        style={{
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
        }}
        onScroll={handleScroll}
      >
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {feedback.map((item, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                backgroundColor: '#f9f9f9',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            >
              <strong>{item.name}:</strong> {item.feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VirtualScroll;
