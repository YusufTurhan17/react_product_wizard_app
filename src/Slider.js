import React from 'react'
import SwiperCore, { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

const SliderContainer = styled(Swiper)`
    width: 100%;
    padding: 20px;
`

export const CustomSlideItem = styled.div`
    text-align: center;
    align-items:center;
    margin: 0 15px;
    width: 100%;
    cursor: pointer;
`;

// install Swiper modules
SwiperCore.use([Navigation, A11y]);

const Slider = ({children, ...otherProps}) => (
    <SliderContainer
        spaceBetween={1}
        slidesPerView={2}
        autoplay={true}
        navigation={true}
        setWrapperSize={true}
         breakpoints={{
        // when window width is >= 640px
        640: {
            slidesPerView: 7,
        }
        }}
        {...otherProps}
    >
        {children}
    </SliderContainer>
)

Slider.Item = SwiperSlide

export default Slider