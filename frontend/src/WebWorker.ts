// webWorker.ts
// eslint-disable-next-line no-restricted-globals
self.onmessage = async () => {
    try {
      const response = await fetch('/api/feedback');
      const feedback = await response.json();
      postMessage(feedback);
    } catch (error) {
      console.error('Error fetching feedback', error);
    }
  };
  
  export {};
  