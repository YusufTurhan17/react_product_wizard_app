import React from "react";
import styled from "styled-components";

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${({ color }) => `${color.ColorCode ? color.ColorCode : `url(${color.Image})`}`};
  object-fit: cover;
  object-position: center;
  transition: all 0.3s ease-in-out;
  flex: 1;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const InformationTitle = styled.h1`
  margin-top: 30px;
  margin-bottom: auto;
`;

const PreviewImage = styled.img`
 width: 300px;
 max-width: 100%;
 margin: 80px 0pz;
`;


const PreviewImageContainer = styled.div`
  position: relative;
  margin-top: 0;
  margin-bottom: auto;
  z-index: 1;
`;

const PreviewImageCover = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;


const Title = ({step}) => {
  switch(step) {
    case 0:
      return <InformationTitle>Önce Duvar Rengi Seçelim</InformationTitle>
    case 1:
      return <InformationTitle>Seri Hangisi Olsun ?</InformationTitle>
    case 2:
      return <InformationTitle>Haydi Çerçeve Seçelim...</InformationTitle>
    case 3:
      return <InformationTitle>Şimdi de Kapağımızı Seçelim</InformationTitle>
  }
}


const Preview = ({ color, seri, frame, cover, step }) => {
  return (
    <PreviewContainer color={color}>
      <Title step={step} />
      <PreviewImageContainer>
      {frame ? <PreviewImage src={frame.Image} /> : <PreviewImage src={seri && seri.Image || `/Content/images/default-product-image.png`} />}
      {cover ? <PreviewImageCover src={cover.Image} /> : <PreviewImageCover src={frame && frame.DefaultCover && frame.DefaultCover.Image} />}
      </PreviewImageContainer>
     </PreviewContainer>
  );
};

export default Preview;
