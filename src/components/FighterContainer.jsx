import React from 'react'
import './FighterContainer.css'
export default function FighterContainer({fighter}) {
  return (
    <div>
      <div className="fighter-container">
        <div className="dice-container">
          <img src="dado.png" alt="dado" />
          <h1>{fighter.dice}</h1>
        </div>
        <h2>{fighter.name}</h2>{" "}
        <img src={fighter.image} alt="Julio" />
        <div className="health-container">
          {Array.from({ length: fighter.health }).map((_, index) => (
            <img key={index} src="vida.png" alt="vida" />
          ))}
        </div>
        <h3>Pereza: {fighter.pereza}</h3>
        <h3>Maldad: {fighter.maldad}</h3>
        <h3>Chepa: {fighter.chepa}</h3>
      </div>
    </div>
  )
}

