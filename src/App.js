import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Preview from "./Preview";
import Wizard from "./Wizard";

const AppContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  width:100%;
`;

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

const App = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);

  const getSeries = () => data.filter(d => d.Mode === 0)
  const getFrame = (seriId) => data.filter(d => d.Mode === 1 && d.ParentId === seriId)
  const getSwitches = (seriId) => data.filter(d => d.Mode === 2 && d.ParentId === seriId)

  useEffect(() => {
    const lang = getCookie("Language") || 'tr'

    const fetchData = async () => {
      const response = await fetch(`/pages/GetSihirbazData?lang=${lang}`)
      const responseData = await response.json()
      const mappingData = responseData.map(rd => {
        if (rd.Mode === 0) {
          return {
            ...rd,
            DefaultFrame: responseData.find(rdf => rdf.Mode === 1 && rdf.ParentId === rd.Id)
          }
        }

        return rd
      })

      setData(mappingData)
    }

    const fetchColor = async () => {
      const response = await fetch(`/pages/getrenkler?=${lang}`)
       const responseData = await response.json()

      setColors(responseData)
    }
 

    fetchColor()
    fetchData()
 
  }, [])

  const [activeColor, setActiveColor] = useState({
    code: "#fff",
  });

  const [activeSeri, setActiveSeri] = useState();

  const [activeFrame, setActiveFrame] = useState();

  const [activeCover, setActiveCover] = useState();

  const changeColor = (color) => {
    setActiveColor(color);
    setStep(1);
  };

  const changeSeri = (seri) => {
    setActiveSeri(seri);
    setStep(2);
  }

  const changeFrame = (frame) => {
    setActiveFrame(frame);
    setStep(3);
  }

  const changeCover = (cover) => {
    setActiveCover(cover);
  }

  const changeStep = (step) => () => {
    if (step === 0) {
      changeFrame()
      changeCover()
      changeSeri()
      changeColor({
        code: "#fff"
      })
      setStep(step);
    } else if (step === 1 && activeColor && activeColor.name) {
      changeCover()
      changeFrame()
      setStep(step);
    } else if (step === 2 && activeSeri && activeSeri.Name) {
      changeCover()
      setStep(step);
    } else if (step === 3 && activeFrame && activeFrame.Name) {
      setStep(step);
    }
  }


  return ( 
    <AppContainer>
      <Preview 
        step={step}
        color={activeColor} 
        seri={activeSeri}
        frame={activeFrame}
        cover={activeCover}
      />
      <Wizard
        step={step}
        onChangeStep={changeStep}
        colors={colors} onChangeColor={changeColor}
        series={getSeries()} onChangeSeri={changeSeri}
        frame={getFrame(activeSeri && activeSeri.Id)}   onChangeFrame={changeFrame}
        cover={getSwitches(activeSeri && activeSeri.Id)}   onChangeCover={changeCover}
      />
    </AppContainer>
  );
};

export default App;
