var { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Quiz {
    question: String,
    answers: String,
    multiple_correct_answers: String
  }

  type Answer {
    correct_answers: String,
    correct_answer: String,
    explanation: String
  }

  type Query {
    getQuizes: String
    getQuiz(quizes: String, index: Int): Quiz
    getAnswer(index: Int): String
  }
`);
