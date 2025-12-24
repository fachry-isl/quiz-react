export const dummyData = [
  {
    id: 1,
    question:
      "What is the primary cause of overfitting in machine learning models?",
    options: [
      {
        key: "A",
        description: "A. Using too little training data",
      },
      {
        key: "B",
        description:
          "B. The model learns noise and details in the training data too well, failing to generalize",
      },
      {
        key: "C",
        description: "C. Setting the learning rate too high",
      },
      {
        key: "D",
        description: "D. Using too many features in the dataset",
      },
    ],
    key_answer: "B",
    hint: "Think about what happens when a model memorizes the training data instead of learning patterns. This affects how well it performs on new, unseen data.",
    explanation:
      "Overfitting occurs when a model learns the training data too well, including its noise and random fluctuations. This causes the model to perform excellently on training data but poorly on new data because it has memorized specific examples rather than learning general patterns. While options A and D can contribute to overfitting, option B describes the core mechanism of what overfitting actually is.",
  },
  {
    id: 2,
    question: "Which of the following is a supervised learning task?",
    options: [
      {
        key: "A",
        description: "A. Clustering customers into groups",
      },
      {
        key: "B",
        description: "B. Predicting house prices based on historical data",
      },
      {
        key: "C",
        description: "C. Dimensionality reduction with PCA",
      },
      {
        key: "D",
        description: "D. Anomaly detection without labels",
      },
    ],
    key_answer: "B",
    hint: "Supervised learning requires labeled data where you know the correct output. Look for the option that uses historical data with known outcomes to make predictions.",
    explanation:
      "Supervised learning requires labeled training data where inputs are paired with correct outputs. Predicting house prices based on historical data is supervised learning because you have past examples with known prices (labels) to train the model. Options A, C, and D are unsupervised learning tasks because they don't require labeled data - clustering discovers patterns without labels, PCA reduces dimensions without supervision, and anomaly detection without labels doesn't have predefined categories.",
  },
  {
    id: 3,
    question: "What is the bias-variance tradeoff in machine learning?",
    options: [
      {
        key: "A",
        description: "A. The tradeoff between training time and model accuracy",
      },
      {
        key: "B",
        description:
          "B. The tradeoff between model complexity and its ability to generalize",
      },
      {
        key: "C",
        description: "C. The tradeoff between precision and recall",
      },
      {
        key: "D",
        description:
          "D. The tradeoff between the number of features and dataset size",
      },
    ],
    key_answer: "B",
    hint: "Consider what happens when you make a model more complex versus keeping it simple. How does this affect its performance on training versus test data?",
    explanation:
      "The bias-variance tradeoff describes the balance between model complexity and generalization ability. High bias (underfitting) occurs with overly simple models that can't capture data patterns, while high variance (overfitting) occurs with overly complex models that fit noise in training data. The goal is to find the right complexity level that minimizes total error. Option C refers to a different concept in classification metrics, while options A and D describe practical considerations but not the bias-variance tradeoff itself.",
  },
];

export const reactDummyData = [
  {
    id: 1,
    question: "What is the primary purpose of the useState hook in React?",
    options: [
      {
        key: "A",
        description: "A. To fetch data from an API",
      },
      {
        key: "B",
        description:
          "B. To manage and update component state in functional components",
      },
      {
        key: "C",
        description: "C. To handle side effects like DOM manipulation",
      },
      {
        key: "D",
        description: "D. To create refs for accessing DOM elements",
      },
    ],
    key_answer: "B",
    hint: "Think about what 'state' means in React. It's data that can change over time and trigger re-renders. Which hook is specifically designed for this purpose in functional components?",
    explanation:
      "The useState hook is React's way of adding state management to functional components. It returns an array with two elements: the current state value and a function to update it. When you call setState (the updater function), React re-renders the component with the new state. Options A and C describe useEffect's functionality, while option D describes useRef. useState is specifically designed for managing local component state that changes over time.",
  },
  {
    id: 2,
    question:
      "When does the useEffect hook run by default (without a dependency array)?",
    options: [
      {
        key: "A",
        description: "A. Only once when the component mounts",
      },
      {
        key: "B",
        description: "B. After every render (both mount and updates)",
      },
      {
        key: "C",
        description: "C. Only when state variables change",
      },
      {
        key: "D",
        description: "D. Before the component renders to the DOM",
      },
    ],
    key_answer: "B",
    hint: "Consider what happens when you don't provide a dependency array. Does React know when to run the effect, or will it run every time? Think about the component lifecycle.",
    explanation:
      "Without a dependency array, useEffect runs after every render—both the initial mount and all subsequent updates. This can cause performance issues if not managed properly. To control when useEffect runs, you use the dependency array: an empty array [] runs only on mount, while an array with dependencies [count, name] runs when those specific values change. Option D is incorrect because useEffect runs after the browser paints, not before, which is why it's called an 'effect' (side effect).",
  },
  {
    id: 3,
    question: "What is the Virtual DOM in React?",
    options: [
      {
        key: "A",
        description: "A. A programming language for building UIs",
      },
      {
        key: "B",
        description:
          "B. A lightweight JavaScript representation of the real DOM that React uses to optimize updates",
      },
      {
        key: "C",
        description: "C. A database for storing component state",
      },
      {
        key: "D",
        description: "D. A CSS framework for styling React components",
      },
    ],
    key_answer: "B",
    hint: "Think of it like a blueprint or draft. React uses this concept to figure out what changed before making expensive updates to the actual browser DOM. It's a performance optimization technique.",
    explanation:
      "The Virtual DOM is a lightweight copy of the actual DOM kept in memory. When state changes, React creates a new Virtual DOM tree, compares it with the previous one (a process called 'reconciliation'), calculates the minimal set of changes needed, and then efficiently updates only those parts in the real DOM. This is like editing a draft document before printing—you make all your changes on the draft (Virtual DOM) and only print (update real DOM) the final version, saving time and resources. Options A, C, and D describe completely unrelated concepts.",
  },
];

const BACKEND_URL = "http://127.0.0.1:8000";

export const generateAIQuiz = async (topic, num, difficulty) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/generate-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: topic,
        num_questions: num,
        difficulty: difficulty,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        JSON.stringify(errorData) || `HTTP error! status ${response.status}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching products: ", err);
    throw err;
  }
};

// Simulation function that mimics API behavior
export const generateQuiz = (topic, num, difficulty) => {
  return new Promise((resolve) => {
    // Simulate network delay (1-2 seconds)
    setTimeout(() => {
      // Clone and modify dummy data to match requested parameters
      const simulatedData = reactDummyData
        .slice(0, num)
        .map((question, index) => ({
          ...question,
          id: index + 1,
          // Optionally modify questions to include topic/difficulty
          question: `[${difficulty.toUpperCase()} - ${topic}] ${
            question.question
          }`,
        }));

      resolve(simulatedData);
    }, 1000); // 1.5 second delay to simulate real API
  });
};
