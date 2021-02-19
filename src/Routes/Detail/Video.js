import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
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
          <VideoContainer>
            <Iframe
              key={video.id}
              src={`https://www.youtube.com/embed/${video.key}`}
            ></Iframe>
          </VideoContainer>
        ))}
      </StyledSlider>
    ) : (
      '영상 정보가 없습니다.'
    )}
  </>
);

Video.propTypes = {
  result: PropTypes.object,
};

export default Video;
