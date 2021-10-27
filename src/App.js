import React, { useEffect, useState } from 'react'
import Question from './components/Questions'

const API_URL =
  'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'

function App() {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }))
        setQuestions(questions)
      })
  }, [])

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1)
      }
    }
    setShowAnswers(true)
  }
  const handleNextQuestion = () => {
    setShowAnswers(false)
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ width: '100vw', height: '100vh' }}
    >
      {questions.length > 0 ? (
        <div className="container d-flex justify-content-center align-items-center">
          {currentIndex >= questions.length ? (
            <div>
              <h1>Game ended</h1>
              <div>
                <span>Your score:</span>
                <span className="font-weight-bold">{score}</span>
              </div>
            </div>
          ) : (
            <Question
              showAnswers={showAnswers}
              data={questions[currentIndex]}
              handleAnswer={handleAnswer}
              handleNextQuestion={handleNextQuestion}
            />
          )}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}

export default App