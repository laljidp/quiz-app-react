import React, { useEffect, useState } from "react";
import { decodeString, shuffleArray } from "../helperFunc";
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

  const [options, setOptions] = useState(
    shuffleArray([question.correct_answer, ...question.incorrect_answers]) || []
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
      shuffleArray([question.correct_answer, ...question.incorrect_answers]) || []
    )
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
      isAnswerCorrect: selectedAns === decodeString(question.correct_answer)
    })
  }

  return (
    <div className="text-left">
      <CategoryText>{decodeString(question.category)}</CategoryText>
      <p>{renderDifficulty(question.difficulty)}</p>
      <h5>{decodeString(question.question)}</h5>
      <div className="mt-5 d-grid">
        <div className="d-flex justify-content-between mb-4">
          {options.slice(0, 2).map((option) => (
            <OptionButton
              onClick={handleAnswerClick}
              disabled={answer.isAnswered && decodeString(option) !== answer.selectedAnswer}
              isCorrect={answer.isAnswered && decodeString(option) === decodeString(question.correct_answer)}
            >{decodeString(option)}
            </OptionButton>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          {options.slice(2, 4).map((option) => (
            <OptionButton
              onClick={handleAnswerClick}
              isCorrect={answer.isAnswered && decodeString(option) === decodeString(question.correct_answer)}
              disabled={answer.isAnswered && decodeString(option) !== answer.selectedAnswer}
            >{decodeString(option)}
            </OptionButton>
          ))}
        </div>
        <div className="mt-5 text-center">
          {answer.isAnswered && (
            <>
              <h3>{answer.selectedAnswer === decodeString(question.correct_answer) ? 'Correct !' : 'Sorry !'}</h3>
              <button className="btn btn-outline-secondary mt-2" onClick={handleNext}>
                {currentQuestion + 1 === totalQuestion ? 'Finish': 'Next Question'}
                </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionAnswer