import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BasicInfo from './BasicInfo';
import Credits from './Credits';
import Video from './Video';
import Seasons from './Seasons';

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
  border-radius: 8px;
  border-top-left-radius: ${(props) => (props.current === 0 ? '0px' : '8px')};
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

const DetailTaps = ({ result, credits, isMovie }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = ['기본 정보', '제작/출연', '영상클립', '시리즈'];
  return (
    <Container>
      <Ul>
        <Li
          current={currentTab === 0}
          onClick={() => {
            setCurrentTab(0);
          }}
        >
          {tabs[0]}
        </Li>
        <Li
          current={currentTab === 1}
          onClick={() => {
            setCurrentTab(1);
          }}
        >
          {tabs[1]}
        </Li>
        <Li
          current={currentTab === 2}
          onClick={() => {
            setCurrentTab(2);
          }}
        >
          {tabs[2]}
        </Li>

        {!isMovie && (
          <Li
            current={currentTab === 3}
            onClick={() => {
              setCurrentTab(3);
            }}
          >
            {tabs[3]}
          </Li>
        )}
      </Ul>
      <ContentContainer current={currentTab}>
        {currentTab === 0 && <BasicInfo result={result} />}
        {currentTab === 1 && <Credits result={result} credits={credits} />}
        {currentTab === 2 && <Video result={result} />}
        {currentTab === 3 && <Seasons result={result} />}
      </ContentContainer>
    </Container>
  );
};

DetailTaps.propTypes = {
  result: PropTypes.object,
  credits: PropTypes.object,
  isMovie: PropTypes.bool.isRequired,
};

export default DetailTaps;
