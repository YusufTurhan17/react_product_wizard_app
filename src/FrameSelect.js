import React from "react";
import styled from "styled-components";

import Slider, { CustomSlideItem } from './Slider'

const FrameImage = styled.img`
    width: 100%;
    display: block;
`

const FrameSelect = ({items, onChange}) => {
    const changeFrame = (frame) => () => onChange(frame);
    return (
      <Slider>
        {items.map((frame) => (
                <Slider.Item key={frame.Name} onClick={changeFrame(frame)}>
                    <CustomSlideItem>
                        <FrameImage src={frame.Image} />
                        <span>{frame.Name}</span>
                    </CustomSlideItem>
                </Slider.Item>
              ))}
      </Slider>
    );
  };
  
  export default FrameSelect