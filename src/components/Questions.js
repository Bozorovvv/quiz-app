import React from 'react'

function Question({
  showAnswers,
  handleNextQuestion,
  handleAnswer,
  data: { question, answers, correct_answer },
}) {
  return (
    <div className="container">
      <div>
        <h1
          className="p-4 m-0 bg-white"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="answers">
        {answers.map((answer, index) => {
          const textColor = showAnswers
            ? answer === correct_answer
              ? 'bg-warning text-dark'
              : 'bg-light text-secondary'
            : 'bg-white border border-secondary'
          return (
            <button
              key={index}
              className={`${textColor} btn`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          )
        })}
      </div>
      {showAnswers && (
        <button className="btn bg-info text-white" onClick={handleNextQuestion}>
          Next question
        </button>
      )}
    </div>
  )
}

export default Question