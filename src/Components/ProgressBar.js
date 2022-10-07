import React from "react";
import styled from "styled-components";

const ProgressSection = styled.div`
    height: 25px;
    width: 100%;
`

const ProgressFill = styled.div`
    height: inherit;
    width: ${({ width }) => width}%;
    background-color: #a8a2a8;
`

const ProgressBar = ({ width }) => {
    return (
        <ProgressSection>
            <ProgressFill width={width || 0} />
        </ProgressSection>
    )
}

export default ProgressBar