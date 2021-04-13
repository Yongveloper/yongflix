import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

const Video = ({ result: { videos } }) => (
  <>
    {console.log(videos)}
    <Title>관련 영상</Title>
    {videos.results && videos.results.length > 0 ? (
      <StyledSlider {...settings}>
        {videos.results.map((video) => (
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

Video.propTypes = {
  videos: PropTypes.shape({
    results: PropTypes.array.isRequired,
  }),
};

export default Video;
