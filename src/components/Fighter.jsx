import { useState, useEffect } from "react";
import "./Fighter.css";
import FighterContainer from "./FighterContainer";
import { IonButton, IonTitle } from "@ionic/react";
import { toBeDisabled } from "@testing-library/jest-dom/matchers";

export default function Fighter() {
  /* Estadísticas iniciales de los peleadores */
  const p1 = {
    dice: 0,
    name: "Julio",
    health: 3,
    pereza: 85,
    maldad: 120,
    chepa: 75,
    image: "./julio.jpg",
  };
  const p2 = {
    dice: 0,
    name: "Vito",
    health: 3,
    pereza: 95,
    maldad: 70,
    chepa: 100,
    image: "./vito.png",
  };
  /* Estados de los peleadores a partir de p1 y p2 */
  const [fighter1, setFighter1] = useState(p1);
  const [fighter2, setFighter2] = useState(p2);
  /* Luchador ganador */
  const [winner, setWinner] = useState(null);
  /* Tipo actual de pelea */
  const [fightType, setFightType] = useState("");
  /* Tipos de pelea */
  const fightTypes = ["Pereza", "Maldad", "Chepa"];
  /* State de control para controlar acceso a los botones del juego */
  const [isFight, setIsFight] = useState(false);

  // Esta función inicia una nueva pelea
  function newFight() {
    /* Elige un número entre 0 y 2 para el tipo de pelea*/
    const fightRandIndex = Math.floor(Math.random() * 3);
    /* El índice se actualiza para coger otro valor de la lista*/
    setFightType(fightTypes[fightRandIndex]);

    setFighter1((fighter1) => ({
      ...p1,
      health: fighter1.health,
    }));

    setFighter2((fighter2) => ({
      ...p2,
      health: fighter2.health,
    }));

    setIsFight(true); // Control de los botones
  }

  // Esta función se ejecuta para terminar una pelea
  function resolveFight() {
    switch (fightType) {
      case "Pereza":
        changeStats("pereza");
        break;
      case "Maldad":
        changeStats("maldad");
        break;
      case "Chepa":
        changeStats("chepa");
        break;
      default:
        break;
    }

    setIsFight(false); // Control de los botones
  }

  // Esta función cambia las estadísticas para una nueva pelea (se usa en resolveFight())
  function changeStats(statName) {
    /* Cálculo de los números de los dados */
    const randInt1 = Math.floor(Math.random() * 100);
    const randInt2 = Math.floor(Math.random() * 100);
    /* Cálculo de la suma del dado con la stat de la modalidad de pelea */
    const statFighter1 = randInt1 + p1[statName];
    const statFighter2 = randInt2 + p2[statName];

    reStatFighters(randInt1, statName, statFighter1, randInt2, statFighter2);

    postFightHealth(statFighter1, statFighter2);
  }

  // Esta función actualiza las estadísticas para una nueva pelea
  function reStatFighters(
    randInt1,
    statName,
    statFighter1,
    randInt2,
    statFighter2
  ) {
    setFighter1((fighter1) => ({
      ...fighter1,
      dice: randInt1,
      [statName]: statFighter1,
    }));

    setFighter2((fighter2) => ({
      ...fighter2,
      dice: randInt2,
      [statName]: statFighter2,
    }));
  }

  // Esta función calcula las vidas después de una pelea
  function postFightHealth(statFighter1, statFighter2) {
    if (statFighter1 < statFighter2) {
      setFighter1((fighter1) => ({
        ...fighter1,
        health: fighter1.health - 1,
      }));
    } else if (statFighter1 > statFighter2) {
      setFighter2((fighter2) => ({
        ...fighter2,
        health: fighter2.health - 1,
      }));
    } else {
      setFightType("Empate");
    }
  }

  // Función que verifica el ganador
  function winCheck(fighter1, fighter2) {
    if (fighter1.health < 1) setWinner(fighter2);
    else if (fighter2.health < 1) setWinner(fighter1);
  }
  // Use Effect para que el state "winner" escuche a "fighter1" y "fighter2"
  useEffect(() => {
    winCheck(fighter1, fighter2);
  }, [fighter1.health, fighter2.health]);

  // Función que reinicia los valores para una nueva partida
  function newGame() {
    /* Reset de modalidad de pelea*/
    setFightType("");

    //Reset de stats de peleadores
    setFighter1(p1);
    setFighter2(p2);

    setWinner(null);
  }

  return (
    <div className="container">
      <IonTitle className="fight-title">Pelea por: {fightType} </IonTitle>
      <IonTitle className="">
        {winner == null ? "" : "¡El ganado es " + winner.name + "!"}
      </IonTitle>
      <div className="game-container">
        <FighterContainer fighter={fighter1} />
        <FighterContainer fighter={fighter2} />
      </div>
      <div className="game-container">
        <IonButton disabled={isFight} onClick={newFight}>
          Comenzar
        </IonButton>
        <IonButton disabled={!isFight} onClick={resolveFight}>
          ¡Pelea!
        </IonButton>
        <IonButton disabled={winner == null} onClick={newGame}>
          Nueva Partida
        </IonButton>
      </div>
    </div>
  );
}
