interface FeedbackEntry {
    name: string;
    feedback: string;
  }
  
  const feedbackEntries: FeedbackEntry[] = [];
  
  export const getFeedbackEntries = () => feedbackEntries;
  
  export const addFeedbackEntry = (entry: FeedbackEntry) => {
    feedbackEntries.push(entry);
    return entry;
  };
  