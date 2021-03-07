import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';

const Item = styled.span``;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
  margin-bottom: 20px;
  + div {
    margin-bottom: 20px;
  }
`;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CompaineContainer = styled.div``;

const CompanyImage = styled.img`
  width: 120px;
  height: 50px;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
`;

const CastContainer = styled.div``;

const CastImage = styled.img`
  width: 120px;
  height: 150px;
`;

const Credits = ({ result, credits }) => (
  <>
    {result.production_companies && result.production_companies.length > 0 && (
      <CompaineContainer>
        <Title>제작</Title>
        <StyledSlider {...settings}>
          {result.production_companies.map((company) => (
            <>
              <CompanyImage
                src={
                  company.logo_path
                    ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                    : require('../../assets/noPosterSmall.png').default
                }
              />
              <Item>{company.name}</Item>
            </>
          ))}
        </StyledSlider>
      </CompaineContainer>
    )}
    {credits.cast && credits.cast.length > 0 && (
      <CastContainer>
        <Title>출연</Title>
        <StyledSlider {...settings}>
          {credits.cast.map((cast) => (
            <>
              <CastImage
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                    : require('../../assets/noPosterSmall.png').default
                }
              />
              <Item>{cast.name}</Item>
              <br />
              <Item>{cast.character}</Item>
            </>
          ))}
        </StyledSlider>
      </CastContainer>
    )}
  </>
);

Credits.propTypes = {
  result: PropTypes.object,
  credits: PropTypes.object,
};

export default Credits;
