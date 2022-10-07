import React from "react";
import styled from "styled-components";

const Section = styled.div`
  width: 75%;
  margin: 0 auto;
`

const ProgreeBar = styled.div`
  position: relative;
  height: 35px;
  border: 1px solid #dedede;
  width: 100%;   
  border-radius: 4px;
`

const Bar = styled.div`
  position: absolute;
  background-color: ${({ bgColor }) => bgColor};
  width: ${({ width }) => width}%;
  height: inherit;
  opacity: .7;
`

const ScoreProgress = ({ currentScore, maxScore, lowestScore }) => {
  return (
    <Section>
      <div className="d-flex justify-content-between">
        <span className="text-left bold">Score: {currentScore}%</span>
        <span className="text-left">Max Score: {maxScore}%</span>
      </div>
      <ProgreeBar>
        <Bar width={maxScore} bgColor='lightgray' />
        <Bar width={currentScore} bgColor='darkgrey' />
        <Bar width={lowestScore} bgColor='black' />
      </ProgreeBar>
    </Section>
  )
}

export default ScoreProgress