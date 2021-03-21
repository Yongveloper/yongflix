import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import {
  FlexContainerStyle,
  ItemStyle,
  TitleStyle,
  settings,
} from './DetailTabStyleVariable';

const CompaineContainer = styled.div``;

const Title = styled.div`
  ${TitleStyle}
`;

const StyledSlider = styled(Slider)``;

const Container = styled.div``;

const FlexContainer = styled.div`
  ${FlexContainerStyle}
`;

const CompanyImage = styled.img`
  width: 120px;
  height: 50px;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
`;

const Item = styled.span`
  ${ItemStyle}
`;

const CastContainer = styled.div``;

const CastImage = styled.img`
  width: 120px;
  height: 150px;
  border-radius: 8px;
`;

const Credits = ({ result, credits }) => (
  <>
    {result.production_companies && result.production_companies.length > 0 && (
      <CompaineContainer>
        <Title>제작</Title>
        <StyledSlider {...settings}>
          {result.production_companies.map((company) => (
            <Container key={company.id}>
              <FlexContainer>
                <CompanyImage
                  src={
                    company.logo_path
                      ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                      : require('../../assets/noPosterSmall.png').default
                  }
                />
                <Item>{company.name}</Item>
              </FlexContainer>
            </Container>
          ))}
        </StyledSlider>
      </CompaineContainer>
    )}
    {credits.cast && credits.cast.length > 0 && (
      <CastContainer>
        <Title>출연</Title>
        <StyledSlider {...settings}>
          {credits.cast.map((cast) => (
            <Container key={cast.cast_id ? cast.cast_id : cast.id}>
              <FlexContainer>
                <CastImage
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                      : require('../../assets/noPosterSmall.png').default
                  }
                />
                <Item>{cast.name}</Item>
                <Item>{cast.character.substring(0, 15)}...</Item>
              </FlexContainer>
            </Container>
          ))}
        </StyledSlider>
      </CastContainer>
    )}
  </>
);

export default Credits;