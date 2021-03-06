import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';

const Container = styled.div`
  position: relative;
  :not(:last-child) {
    margin-bottom: 50px;
  }
  padding: 0 5%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1296,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1120,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 848,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
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

  .slick-dots li button:before {
    color: #fff;
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
