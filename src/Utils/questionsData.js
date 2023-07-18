const questions = [
  {
    id: 1,
    question: 'How satisfied are you with our products?',
    type: 'rating',
    ratingRange: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    question: 'How fair are the prices compared to similar retailers?',
    type: 'rating',
    ratingRange: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    question: 'How satisfied are you with the value for money of your purchase?',
    type: 'rating',
    ratingRange: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    question: 'On a scale of 1-10 how would you recommend us to your friends and family?',
    type: 'rating',
    ratingRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 5,
    question: 'What could we do to improve our service?',
    type: 'text',
  },
];

export default questions;
