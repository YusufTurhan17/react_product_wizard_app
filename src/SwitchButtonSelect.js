import React from "react";
import Slider, { CustomSlideItem } from './Slider'
import styled from "styled-components";

const ButtonImage = styled.img`
    width: 100%;
    display: block;
`

const SwitchButtonSelect = ({ items, onChange }) => {
    const changeSwitchButton = (button) => () => onChange(button);
  
    return (
      <Slider>
      {items.map((button) => (
          <Slider.Item key={button.Name}  onClick={changeSwitchButton(button)}>
              <CustomSlideItem>
                <ButtonImage src={button.Image} />
                <span>{button.Name}</span>
              </CustomSlideItem>
          </Slider.Item>
        ))}
      </Slider>
    );
  };

  export default SwitchButtonSelect