import React from 'react'
import './FighterContainer.css'
import { IonImg, IonTitle } from '@ionic/react'
export default function FighterContainer({fighter}) {
  return (
    <div>
      <div className="fighter-container">
        <div className="dice-container">
          <IonImg className='diceImg' src="dado.png" alt="dado" />
          <IonTitle className='dice-text'>{fighter.dice}</IonTitle>
        </div>
        <IonTitle className='fighter-name'>{fighter.name}</IonTitle>{" "}
        <IonImg className='fighter-img' src={fighter.image} alt={fighter.name} />
        <div className="health-container">
          {Array.from({ length: fighter.health }).map((_, index) => (
            <IonImg className='health-img' key={index} src="vida.png" alt="vida" />
          ))}
        </div>
        <IonTitle className='fighter-stats'>Pereza: {fighter.pereza}</IonTitle>
        <IonTitle className='fighter-stats'>Maldad: {fighter.maldad}</IonTitle>
        <IonTitle className='fighter-stats'>Chepa: {fighter.chepa}</IonTitle>
      </div>
    </div>
  )
}

