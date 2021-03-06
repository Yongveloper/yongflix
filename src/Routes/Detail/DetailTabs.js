import React, { useState } from 'react';
import styled from 'styled-components';
import BasicInfo from 'Routes/Detail/BasicInfo';
import Credits from 'Routes/Detail/Credits';
import Video from 'Routes/Detail/Video';

const Container = styled.div`
  height: 79%;
  margin-top: 26px;
  @media screen and (max-width: 1024px) {
    height: 500px;
    margin-bottom: 30px;
  }
`;

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li`
  font-size: 20px;
  font-weight: 300;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.current ? 'rgba(0, 0, 0, 0.4)' : 'none'};
  border-top-left-radius: ${(props) => (props.current !== 0 ? '10px' : 'none')};
  border-top-right-radius: ${(props) =>
    props.current !== 0 ? '10px' : 'none'};
  @media screen and (max-width: 479px) {
    font-size: 16px;
  }
`;

const ContentContainer = styled.div`
  display: ${(props) => (props.current === 1 ? 'flex' : 'block')};
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: ${(props) => (props.current === 0 ? '20px 25px;' : '20px 45px;')};
  overflow: auto;
  border-radius: 10px;
  border-top-left-radius: ${(props) => (props.current === 0 ? '0px' : '10px')};
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.7);
    background-clip: padding-box;
    border-radius: 20px;
    border: 5px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const DetailTaps = ({ result, credits }) => {
  const [currentTap, setCurrentTap] = useState(0);
  const tabs = ['기본 정보', '제작/출연', '영상클립'];

  return (
    <Container>
      <Ul>
        <Li
          current={currentTap === 0}
          onClick={() => {
            setCurrentTap(0);
          }}
        >
          {tabs[0]}
        </Li>
        <Li
          current={currentTap === 1}
          onClick={() => {
            setCurrentTap(1);
          }}
        >
          {tabs[1]}
        </Li>
        <Li
          current={currentTap === 2}
          onClick={() => {
            setCurrentTap(2);
          }}
        >
          {tabs[2]}
        </Li>
      </Ul>
      <ContentContainer current={currentTap}>
        {currentTap === 0 && <BasicInfo result={result} />}
        {currentTap === 1 && <Credits result={result} credits={credits} />}
        {currentTap === 2 && <Video result={result} />}
      </ContentContainer>
    </Container>
  );
};

export default DetailTaps;
