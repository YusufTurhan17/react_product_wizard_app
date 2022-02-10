import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Slider, { CustomSlideItem } from './Slider'

const ColorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${({ isFull }) => (isFull ? "100%" : "810px")};;
  background-color: #efefef;
  padding: 20px;
`;

const ColorButton = styled.button`
  height: 39px;
  width: 33.3333%;
  font-family: "HaasGrotDisp-Roman";
  font-size: 14px;
  color: ${({ isActive }) => (isActive ? "#f05a2a" : "#6c6c6c")};
  background-color: ${({ isActive }) => (isActive ? "#fff" : "#efefef")};
  text-align: center;
  line-height: 39px;
  border: none;
  ${({ isBordered }) =>
    isBordered
      ? `
   border-left: 1px solid #c5c5c5;
   border-right: 1px solid #c5c5c5;
  `
      : ""}
  &:focus {
    outline: none;
  }

  transition: all 0.3s linear;
`;

const ColorButtonContainer = styled.div`
  width: 100%;
  max-width: 375px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #c5c5c5;
  margin-bottom: 20px;
`;

const ColorItem = styled.div`
  width: ${({ size }) => (size === "small" ? "50px" : "100%")};
  height: ${({ size }) => (size === "small" ? "50px" : "100px")};
  position: relative;
  border: 4px solid #efefef;
  background-color: ${({ bg }) => bg};
  cursor: pointer;
`;

const WallPaperItem = styled.div`
  width: 122px;
  height: 65px;
  position: relative;
  border: 4px solid #efefef;
  background-image: ${({ bg }) => `url(${bg})`};
  background-size:cover;
`;

const ColorSelect = ({ items, onChange }) => {
  const CATEGORIES = {
    TRENDS: "TRENDS",
    ALL_COLORS: "ALL_COLORS",
    WALL_PAPER: "WALL_PAPER",
  };

  const ColorButtons = [
    {
      text: "Trend Renkler",
      value: CATEGORIES.TRENDS,
    },
    {
      text: "Tüm Renkler",
      value: CATEGORIES.ALL_COLORS,
    },
    {
      text: "Duvar Kağıdı",
      value: CATEGORIES.WALL_PAPER,
    },
  ];

  const [category, setCategory] = useState();
  const [selectedColor, setSelectedColor] = useState()

  const changeCategory = (selectedCategory) => () =>
    {
      setSelectedColor()
      setCategory(selectedCategory);
    }

  const changeColor = (color) => () => {
    setSelectedColor(color)
    // onChange(color);
  }

  const selectColor = (color) => () => {
    onChange(color);
  }

  useEffect(() => {
      setTimeout(() => {
        setCategory(CATEGORIES.TRENDS)
      }, 50);
  }, [])

  return (
    <>
    <ColorContainer>
      <ColorButtonContainer>
        {ColorButtons.map((button, index) => (
          <ColorButton
            key={button.value}
            isActive={category === button.value}
            isBordered={index % 2 !== 0}
            onClick={changeCategory(button.value)}
          >
            {button.text}
          </ColorButton>
        ))}
      </ColorButtonContainer>

      {category === CATEGORIES.TRENDS ? (
        <Slider>
          {items
            .filter((color) => color.IsTrend && color.Mode === 1)
            .map((color) => (
                <Slider.Item key={color.Name} onClick={changeColor(color)}>
                  <CustomSlideItem>
                    <ColorItem bg={color.ColorCode} />
                    <span>{color.Name}</span>
                  </CustomSlideItem>
                </Slider.Item>
            ))}
        </Slider>  
      ) : null}

      {category === CATEGORIES.ALL_COLORS ? (
        <Slider>
          {items
            .filter((color) => color.Mode === 1)
            .map((color) => (
              <Slider.Item key={color.Name} onClick={changeColor(color)}>
                  <CustomSlideItem>
                    <ColorItem size="small" bg={color.ColorCode} />
                  </CustomSlideItem>
              </Slider.Item>
            ))}
        </Slider>
      ) : null}

      {category === CATEGORIES.WALL_PAPER ? (
        <Slider>
          {items
            .filter((color) => color.Mode === 2)
            .map((color) => (
              <Slider.Item key={color.Name} onClick={selectColor(color)}>
                  <CustomSlideItem>
                    <WallPaperItem bg={color.Image} />
                    <span>{color.Name}</span>
                  </CustomSlideItem>
              </Slider.Item>
            ))}
        </Slider>
      ) : null}
     </ColorContainer>

      {selectedColor && selectedColor.SubColors ? 
        <Slider>
          {selectedColor.SubColors.map((color) => (
              <Slider.Item key={color.Name} onClick={selectColor(color)}>
                  <CustomSlideItem>
                    <ColorItem bg={color.ColorCode} />
                    <span>{color.Name}</span>
                  </CustomSlideItem>
              </Slider.Item>
            ))}
        </Slider> : null
      }
</>
  );
};


export default ColorSelect