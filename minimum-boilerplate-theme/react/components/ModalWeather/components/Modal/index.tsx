import { useModalWeather } from "../../../../context/useModalWeather";
import style from "./style.css";
import { useState } from "react";

const Modal = () => {
  const { temperature } = useModalWeather();
  const weather = temperature.replace("+", "").replace("°C", "");
  const [modalOpen, setModalOpen] = useState(true);
  const verification = () =>
    weather < 18
      ? {
          titleWeather: "Está frio",
          textWeather: "Que tal um sapato bem quentinho?",
          linkProduct:
            "https://corebiz.myvtex.com/Bota-Masculina-em-Couro-Legitimo-5028Pto/p",
        }
      : {
          titleWeather: "Está calor",
          textWeather: "Que tal comprar uma blusa levinha e fresquinha?",
          linkProduct:
            "https://corebiz.myvtex.com/t-shirt-vic-abobora-caramelada-a191876-nv001/p",
        };

  return modalOpen ? (
    <div>
      <div className={style.overlay}></div>
      <div className={style.modal}>
        <div className={style.modalInfo}>
          <div>
            <h2>{verification().titleWeather}</h2>

            <p>{verification().textWeather}</p>
          </div>

          <div>
            <button
              onClick={() => setModalOpen(false)}
              className={style.buttonClose}
            >
              X
            </button>
          </div>
        </div>

        <div className={style.buttons}>
          <a
            className={`${style.button} ${style.buttonYes}`}
            href={verification().linkProduct}
          >
            Opa, eu quero
          </a>

          <a
            onClick={(event) => {event.preventDefault(); setModalOpen(false)}}
            className={`${style.button} ${style.buttonNo}`}
            href=""
          >
            Não, valeu
          </a>
        </div>
      </div>
    </div>
  ) : (
    false
  );
};

export default Modal;
