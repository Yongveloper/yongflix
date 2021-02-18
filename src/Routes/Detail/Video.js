import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const VideoContainer = styled.div`
  /* width: 480px; */
  height: 300px;
  margin: 0 16px;
`;
const Iframe = styled.iframe`
  width: 450px;
  height: 300px;
`;

const Video = ({ result }) => (
  <>
    {result.videos.results && result.videos.results.length > 0 ? (
      <VideoContainer>
        <Slider {...settings}>
          {result.videos.results.map((video) => (
            <div
              style={{
                width: '480px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Iframe
                key={video.id}
                src={`https://www.youtube.com/embed/${video.key}`}
              ></Iframe>
            </div>
          ))}
        </Slider>
      </VideoContainer>
    ) : (
      '영상 정보가 없습니다.'
    )}
  </>
);

Video.propTypes = {
  result: PropTypes.object,
};

export default Video;
