const dummyData = [
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
  },
];

export default dummyData;
