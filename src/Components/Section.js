import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const StyledSlider = styled(Slider)`
  .slick-slide {
    width: 95%;
    margin: 0 auto;
  }

  .slick-slide div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <StyledSlider {...settings}>{children}</StyledSlider>
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
