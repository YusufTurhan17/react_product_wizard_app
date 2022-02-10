import React from "react";
import styled from "styled-components";

import Slider, { CustomSlideItem } from './Slider'

const SeriImage = styled.img`
    width: 100%;
    display: block;
`

const SeriesSelect = ({items, onChange}) => {

    const changeSeries = (seri) => () => onChange(seri);
  
     return (
      <Slider>
        {items.map((seri) => (
                <Slider.Item key={seri.Name} onClick={changeSeries(seri)}>
                   <CustomSlideItem>
                        <SeriImage src={seri.Image} />
                        <span>{seri.Name}</span>
                   </CustomSlideItem>
                </Slider.Item>
              ))}
      </Slider>
    );
  };

  export default SeriesSelect