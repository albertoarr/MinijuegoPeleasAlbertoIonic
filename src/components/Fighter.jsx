import { useState, useEffect } from "react";
import "./Fighter.css";
import FighterContainer from "./FighterContainer";
import { IonButton, IonTitle } from "@ionic/react"

export default function Fighter() {

  /* Estadísticas iniciales de los peleadores */
  const p1 = {dice: 0, name: "Julio", health: 3, pereza: 85, maldad: 120, chepa: 75, image: "./julio.jpg"};
  const p2 = {dice: 0, name: "Vito", health: 3, pereza: 95, maldad: 70, chepa: 100, image: "./vito.png"};

  /* Estados de los peleadores */
  const [fighter1, setFighter1] = useState(p1);
  const [fighter2, setFighter2] = useState(p2);

  /* Tipo actual de pelea */
  const [fightType, setFightType] = useState("");

  /* Tipos de pelea */
  const fightTypes = ["Pereza", "Maldad", "Chepa"];

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
  }

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
  }

  function changeStats(statName) {
    /* Cálculo de los números de los dados */
    const randInt1 = Math.floor(Math.random() * 100)
    const randInt2 = Math.floor(Math.random() * 100)
    /* Cálculo de la suma del dado con la stat de la modalidad de pelea */
    const statFighter1 = randInt1 + p1[statName]
    const statFighter2 = randInt2 + p2[statName]

    /* 
    * Se actualizan los estados de los luchadores (dado y estadística)
    */
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

    /*
    * Se calcula quién pierde la vida en la pelea (dependiendo de la stat mayor)
    */ 
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

  /* Función que reinicia los valores cuando en nueva partida */
  function newGame() {
    /* Reset de modalidad de pelea*/
    setFightType("");
    /* 
    * Reset de stats de peleadores
    */
    setFighter1(p1);
    setFighter2(p2);
  }

  return (
    <div className="container">
      <IonTitle>Pelea por: {fightType} </IonTitle>
      <div className="game-container">
        <FighterContainer fighter={fighter1}/>
        <FighterContainer fighter={fighter2}/>
      </div>
      <div className="game-container">
      <IonButton onClick={newFight}>Comenzar</IonButton>
      <IonButton onClick={resolveFight}>¡Pelea!</IonButton>
      <IonButton onClick={newGame}>Nueva Partida</IonButton>
      </div>
    </div>
  );
}
