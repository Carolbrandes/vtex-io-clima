import { WeatherProvider } from "../../context/useModalWeather";
import Modal from "./components/Modal";

const ModalWeather = () => {
  return (
    <WeatherProvider>
      <Modal />
    </WeatherProvider>
  );
};

export default ModalWeather;
