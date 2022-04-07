import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


export const weatherContext = createContext();

export const WeatherProvider = ({ children }: any) => {
  const [stateSeleted, SetStateSeleted] = useState("");
  const [temperature, setTemperature] = useState("");


  const changeState = (state) => {
    SetStateSeleted(state);
  };

  const changeTemperature = (value) => {
    setTemperature(value);
  };

  const removeAcento = (text) => {
    text = text.toLowerCase();
    text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
    text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
    text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
    text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
    text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
    text = text.replace(new RegExp("[Ç]", "gi"), "c");
    return text;
  };

  const getTemperature = async (state) => {
    try {
      const lastQueryHour = +JSON.parse(window.localStorage.getItem("hour")) || ""
      console.log("lastQueryHour", lastQueryHour)
      console.log("typeof lastQueryHour", typeof lastQueryHour)
      if (lastQueryHour === "" || lastQueryHour < new Date().getHours()) {
        const temperature = await axios.get(`/weather?state=${state}`);
        console.log("temperature", temperature.data.temperature);
        changeTemperature(temperature.data.temperature);
        const now = JSON.stringify(new Date().getHours());
        window.localStorage.setItem("temperature", JSON.stringify(temperature.data.temperature))
        window.localStorage.setItem("hour", JSON.stringify(now))
      }
    } catch (e) {
      console.log("erro função getTemperature", e);
    }
  };

  const getLocalization = async () => {
    try {
      const localization = await axios.get("https://geolocation-db.com/json/");
      console.log("localization =>", localization);
      changeState(localization.data.city);
      getTemperature(removeAcento(localization.data.city).replaceAll(" ", ""));
    } catch (e) {
      console.log("erro funcao getLocalization", e);
    }
  };

  useEffect(() => {
    getLocalization();
  }, []);

  useEffect(() => {
    const div = document.querySelector(
      "#info-weather"
    )
   
    const temp = window.localStorage.getItem("temperature") ? JSON.parse(window.localStorage.getItem("temperature").replace("+", "")) : temperature.replace("+", "")

    if(div) div.innerHTML = `${stateSeleted} | ${temp}`;
  }, [stateSeleted, temperature]);

  return (
    <weatherContext.Provider
      value={{
        stateSeleted,
        temperature,
        changeState,
        changeTemperature,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
};

export function useModalWeather() {
  const context = useContext(weatherContext);

  if (!context) {
    throw new Error("useModalWeather must be used within an WeatherProvider");
  }

  return context;
}
