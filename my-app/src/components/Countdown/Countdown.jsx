import React, { useEffect, useState } from "react";
import style from "./Countdown.module.css";

const Countdown = () => {
  let [timer, setTimer] = useState(null);
  const getRemainTime = (deadline) => {
    let now = new Date();
    let remainTime = (new Date(deadline) - now + 1000) / 1000;
    let remainSeconds = ("0" + Math.floor(remainTime % 60)).slice(-2);
    let remainMinutes = ("0" + Math.floor((remainTime / 60) % 60)).slice(-2);
    let remainHours = ("0" + Math.floor((remainTime / 3600) % 24)).slice(-2);
    let remainDays = Math.floor(remainTime / (3600 * 24));
    return {
      remainTime,
      remainSeconds,
      remainMinutes,
      remainHours,
      remainDays,
    };
  };

  const countDown = (deadline) => {
    const timerUpdate = setInterval(() => {
      let t = getRemainTime(deadline);
      setTimer(t);
      if (t.remainTime <= 1) {
        clearInterval(timerUpdate);
      }
    }, 1000);
  };

  useEffect(() => {
    countDown("May 21 2022 22:00:00 GMT-0300");
  }, []);

  return (
    <div className={style.container__main}>
      <div className={style.container__title}>
        <h2>Estás invitado!</h2>
        <h3>Queremos que seas parte de este momento tan especial!</h3>
        <span>NO FALTA NADA!!!</span>
      </div>
      <div className={style.container__content}>
        <div className={style.container__time_span}>
          <div className={style.container__time}>
            <span className={style.countdown__days}>{timer?.remainDays}</span>
          </div>
          <span className={style.description__remainTime}>Dias</span>
        </div>
        <div className={style.container__time_span}>
          <div className={style.container__time}>
            <span className={style.countdown__hours}>{timer?.remainHours}</span>
          </div>
          <span className={style.description__remainTime}>Horas</span>
        </div>
        <div className={style.container__time_span}>
          <div className={style.container__time}>
            <span className={style.countdown__minutes}>
              {timer?.remainMinutes}
            </span>
          </div>
          <span className={style.description__remainTime}>Minutos</span>
        </div>
        <div className={style.container__time_span}>
          <div className={style.container__time}>
            <span className={style.countdown__seconds}>
              {timer?.remainSeconds}
            </span>
          </div>
          <span className={style.description__remainTime}>Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
