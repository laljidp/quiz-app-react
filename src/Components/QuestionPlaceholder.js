import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import QuestionAnswer from './QuestionAnswer'
import ScoreProgress from './ScoreProgress'
import styled from 'styled-components'
import questionJson from '../questions.json'

const Placeholder = styled.div`
  width: 75%;
  margin: 0 auto;
`

const ScorePlaceholder = styled.div`
  position: absolute;
  bottom: 25px;
  width: inherit;
`

const QuestionPlaceholder = () => {

  const [questions, setQuestions] = useState(questionJson)
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState({
    currentScore: 0,
    maxScore: 100,
    lowestScore: 0
  })

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setIsQuizFinished(true)
    }
    setCurrentQuestion(currentQuestion + 1)
  }

  const calculateProgress = () => {
    const totalCorrectAns = questions.filter(o => o.isAnswerCorrect).length || 0
    const totalQuestion = questions.length
    const totalAttempt = currentQuestion
    const currentScore = (totalCorrectAns / totalAttempt) * 100
    const maxScore = ((totalCorrectAns + (totalQuestion - totalAttempt)) / totalQuestion) * 100
    const lowestScore = (totalCorrectAns / totalQuestion) * 100
    setScore({
      currentScore: Math.round(currentScore) || 0,
      maxScore: Math.round(maxScore),
      lowestScore: Math.round(lowestScore)
    })
  }

  const handleSaveAnswer = (index, isAnswerCorrect) => {
    const tempQuestions = questions.slice()
    tempQuestions[index] = {
      ...tempQuestions[index],
      isAnswerCorrect
    }
    setQuestions(tempQuestions)
  }

  useEffect(() => {
    calculateProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions])

  return (
    <>
      <div>
        <ProgressBar width={(currentQuestion / questions.length) * 100} />
      </div>
      <Placeholder className='p-4'>
        {isQuizFinished && (
          <div className='mt-5'>
            <h4>Quiz Finished</h4>
            <p>
              <h5>Your score: {score.currentScore} %</h5>
            </p>
            <button onClick={() => window.location.reload()} className='btn btn-outline-secondary'>
              Restart Quiz
            </button>
          </div>
        )
        }
        {!isQuizFinished && (
          <>
            <h4 className='text-left'>{`Question ${currentQuestion + 1} of ${questions.length}`}</h4>
            {
              questions.length > 0 && (
                <QuestionAnswer
                  handleNextQuestion={handleNextQuestion}
                  question={questions[currentQuestion]}
                  currentQuestion={currentQuestion}
                  saveCurrentAnswer={handleSaveAnswer}
                  totalQuestion={questions.length}
                />
              )
            }
          </>
        )}

      </Placeholder>
      <ScorePlaceholder>
        <ScoreProgress currentScore={score.currentScore} maxScore={score.maxScore} lowestScore={score.lowestScore} />
      </ScorePlaceholder>
    </>
  )
}

export default QuestionPlaceholder