import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { TitleStyle } from './DetailTabStyleVariable';
const Title = styled.div`
  ${TitleStyle}
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const StyledSlider = styled(Slider)`
  .slick-slide div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const VideoContainer = styled.div``;
const Iframe = styled.iframe`
  width: 100%;
  height: 380px;
`;

const Video = ({ result }) => (
  <>
    <Title>관련 영상</Title>
    {result.videos.results && result.videos.results.length > 0 ? (
      <StyledSlider {...settings}>
        {result.videos.results.map((video) => (
          <VideoContainer key={video.id}>
            <Iframe src={`https://www.youtube.com/embed/${video.key}`} />
          </VideoContainer>
        ))}
      </StyledSlider>
    ) : (
      '등록된 영상이 없습니다.'
    )}
  </>
);

export default Video;
