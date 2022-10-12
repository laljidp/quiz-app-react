import React, { useEffect, useState } from "react";
import { decodeObject, shuffleArray } from "../Utils/helperFunc";
import styled from "styled-components";

const CategoryText = styled.span`
  font-size: 14px;
  color: grey;
  text-align: left;
`

const OptionButton = styled.button`
  height: 40px;
  width: 45%;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  ${({ isCorrect }) => isCorrect && `
    background-color: black;
    color: #fff
  `}
`

const QuestionAnswer = (props) => {
  const {
    question = {},
    handleNextQuestion,
    currentQuestion,
    saveCurrentAnswer,
    totalQuestion
  } = props

  const {
    correct_answer,
    incorrect_answers,
    category,
    difficulty,
    question: questionTitle
  } = decodeObject(question)

  const [options, setOptions] = useState(
    shuffleArray([correct_answer, ...incorrect_answers]) || []
  )
  const [answer, setAnswer] = useState({
    selectedAnswer: null,
    isAnswered: false,
    isAnswerCorrect: false
  })

  const handleNext = () => {
    saveCurrentAnswer(currentQuestion, answer.isAnswerCorrect)
    setAnswer({
      selectedAnswer: null,
      isAnswered: false,
      isAnswerCorrect: false
    })
    handleNextQuestion()
  }

  useEffect(() => {
    setOptions(
      shuffleArray([correct_answer, ...incorrect_answers]) || []
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])


  const renderDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return <span>&#9733;&#9734;&#9734;</span>
      case 'medium':
        return <span>&#9733;&#9733;&#9734;</span>
      case 'hard':
        return <span>&#9733;&#9733;&#9733;</span>
      default:
        return <span>&#9734;&#9734;&#9734;</span>
    }
  }

  const handleAnswerClick = (e) => {
    const selectedAns = e.target.innerText;
    setAnswer({
      selectedAnswer: selectedAns,
      isAnswered: true,
      isAnswerCorrect: selectedAns === correct_answer
    })
  }

  return (
    <div className="text-left">
      <CategoryText>{category}</CategoryText>
      <p>{renderDifficulty(difficulty)}</p>
      <h5>{questionTitle}</h5>
      <div className="mt-5 d-grid">
        <div className="d-flex justify-content-between mb-4">
          {options.slice(0, 2).map((option) => (
            <OptionButton
              key={option}
              onClick={handleAnswerClick}
              disabled={answer.isAnswered && option !== answer.selectedAnswer}
              isCorrect={answer.isAnswered && (option === correct_answer)}
            >{option}
            </OptionButton>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          {options.slice(2, 4).map((option) => (
            <OptionButton
              key={option}
              onClick={handleAnswerClick}
              isCorrect={answer.isAnswered && option === correct_answer}
              disabled={answer.isAnswered && option !== answer.selectedAnswer}
            >{option}
            </OptionButton>
          ))}
        </div>
        <div className="mt-5 text-center">
          {answer.isAnswered && (
            <>
              <h3>{answer.selectedAnswer === correct_answer ? 'Correct !' : 'Sorry !'}</h3>
              <button className="btn btn-outline-secondary mt-2" onClick={handleNext}>
                {currentQuestion + 1 === totalQuestion ? 'Finish' : 'Next Question'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionAnswer