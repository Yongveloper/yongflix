export const settings = {
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

export const FlexContainerStyle = `
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleStyle = `
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  + div {
    margin-bottom: 20px;
  }
`;

export const ItemStyle = `
  line-height: 23px;
  text-align: center;
`;
