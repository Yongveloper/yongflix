import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';

const Item = styled.span``;

const ProductionContainer = styled.div`
  margin-top: 38px;
`;

const ProductionSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const Production = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductionImage = styled.img`
  width: 120px;
  height: 200px;
`;

const CreditsContainer = styled.div``;

const Credits = ({ result, credits }) => (
  <>
    {result.production_companies && result.production_companies.length > 0 && (
      <ProductionContainer>
        <Slider {...ProductionSettings}>
          {result.production_companies.map((company) => (
            <Production>
              <ProductionImage
                src={
                  company.logo_path
                    ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                    : require('../../assets/noPosterSmall.png').default
                }
              />
              <Item>{company.name}</Item>
            </Production>
          ))}
        </Slider>
      </ProductionContainer>
    )}
    {credits.cast && credits.cast.length > 0 && (
      <CreditsContainer>
        <Slider {...ProductionSettings}>
          {credits.cast.map((cast) => (
            <Production>
              <ProductionImage
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                    : require('../../assets/noPosterSmall.png').default
                }
              />
              <Item>{cast.name}</Item>
              <br />
              <Item>{cast.character}</Item>
            </Production>
          ))}
        </Slider>
      </CreditsContainer>
    )}
  </>
);

Credits.propTypes = {
  result: PropTypes.object,
  credits: PropTypes.object,
};

export default Credits;
