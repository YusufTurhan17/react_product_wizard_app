import React from "react";
import styled from "styled-components";

import ColorSelect from './ColorSelect'
import SeriesSelect from './SeriesSelect'
import FrameSelect from './FrameSelect'
import SwitchButtonSelect from './SwitchButtonSelect'

const WizardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background-color: #efefef;
`;

const WizardNavigation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 810px;
  background-color: transparent;
`;

const WizardButton = styled.button`
  height: 52px;
  width: 25%;
  display: block;
  background-color: ${({ isActive }) => (isActive ? "#efefef" : "#e2e2e2")};
  color: ${({ isActive }) => (isActive ? "#1c1c1c" : "#6c6c6c")};
  font-size: 16px;
  text-align: center;
  position: relative;
  font-family: "HaasGrotDisp-Medium";
  transition: all 0.3s cubic-bezier(0.3, 0.74, 0.5, 0.93);
  border: none;
  position: relative;

  &:focus {
    outline: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ isActive }) =>
      isActive ? "#f05a2a" : "transparent"};
  }
`;

const WizardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  max-width: 100%;
  padding: 20px;
  background-color: #efefef;
`;

const Wizard = ({ colors, onChangeColor, series, onChangeSeri, frame, onChangeFrame, cover, onChangeCover, step, onChangeStep }) => 
{
  return (
    <WizardContainer>
      <WizardNavigation>
        <WizardButton isActive= {step === 0 } onClick={onChangeStep(0)}>
          Duvar Rengi
        </WizardButton>
        
        <WizardButton isActive={step === 1} onClick={onChangeStep(1)}>
          Seri
        </WizardButton>
        <WizardButton isActive={step === 2} onClick={onChangeStep(2)}>
          Çerçeve
        </WizardButton>
        <WizardButton isActive={step === 3} onClick={onChangeStep(3)}>
          Kapak
        </WizardButton>
      </WizardNavigation>
        {step === 0 ? <ColorSelect items={colors} onChange={onChangeColor} /> : null}
        {step === 1 ? <WizardContent><SeriesSelect items={series} onChange={onChangeSeri} /> </WizardContent> : null}
        {step === 2 ? <WizardContent><FrameSelect items={frame} onChange={onChangeFrame} /> </WizardContent> : null}
        {step === 3 ? <WizardContent><SwitchButtonSelect items={cover} onChange={onChangeCover} /> </WizardContent> : null}
    </WizardContainer>
  );
};

export default Wizard;
