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

export default dummyData;
