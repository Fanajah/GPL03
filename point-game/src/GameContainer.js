import React, { useState, useEffect } from 'react';
import Page from './Page';

const GameContainer = ({ numRows, numCols, plateau, setPlateau, totalPlayers }) => {
    const reflexionTime = 5;
    const [timeElapsed, setTimeElapsed] = useState(reflexionTime);

    const colorsHex = {
        Rouge: "#FF0000",
        Bleu: "#0000FF",
        Vert: "#008000",
        Jaune: "#FFFF00",
        Orange: "#FFA500",
        Violet: "#800080",
        Rose: "#FFC0CB",
        Marron: "#A52A2A",
        Cyan: "#00FFFF",
        "Vert clair": "#00FF00",
        Noir: "#000000",
        Gris: "#808080",
    };

    let joueurs = [];

    for (let i = 1; i <= totalPlayers; i++) {
        joueurs.push({ name: localStorage.getItem("nomJoueur" + i), color: colorsHex[localStorage.getItem("couleurJoueur" + i)] });
        //console.log(joueurs[i-1].color)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => { 
        const gameContainer = document.querySelector(".game-container");
        gameContainer.style.backgroundColor = joueurs[parseInt(localStorage.getItem("currentPlayer")) - 1].color + "BF";
        if (timeElapsed <= 0) {
            setTimeElapsed(reflexionTime);
            //console.log(localStorage.getItem("currentPlayer"));
            //console.log("tonga eto ", joueurs[parseInt(localStorage.getItem("currentPlayer")) - 1].color + "BF");
            //console.log("tonga eto2 ", joueurs[parseInt(localStorage.getItem("currentPlayer")) - 1].color);
            gameContainer.style.backgroundColor = joueurs[parseInt(localStorage.getItem("currentPlayer")) - 1].color + "BF";

        }
        const resetLocalStorage = localStorage.getItem('reset') === 'true';
        if (resetLocalStorage) {
            localStorage.setItem('reset', 'false');
            setTimeElapsed(reflexionTime);
        }
    }, [timeElapsed, joueurs]);


    return (
        <div className="game-container">
            <div className="score-container">
                <div id="scorePlayer1" className="score">J1: 0</div>
                <div id="timer" className="score">{formatTime(timeElapsed)}</div>
                <div id="scorePlayer2" className="score">J2: 0</div>
            </div>

            <div id="menu">
                <button id="quitter-button">Quitter</button>
                <button id="finish-button">Terminer</button>
                <button id="pauseResumeButton">Pause</button>
            </div>

            <div className="canvas-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="canvas-container" style={{
                    width: '700px', // Largeur fixe
                    height: '60vh', // Hauteur fixe
                    overflow: 'auto', // Ajouter des barres de d�filement si le contenu d�passe
                    border: '1px solid #ddd', // Bordure pour mieux visualiser le conteneur
                    padding: '10px', // Espacement interne pour l'esth�tique
                    display: 'flex', // Utiliser Flexbox pour le centrage
                    justifyContent: 'center', // Centrer horizontalement
                    marginRight: '20px' // Espacement entre les �l�ments
                }}>
                    <Page numRows={numRows - 1} numCols={numCols - 1} plateau={plateau} setPlateau={setPlateau} timeElapsed={timeElapsed} totalPlayers={totalPlayers} />
                </div>
            </div>

            <div className="zoom-slider">
                <input type="range" className="zoom-slider" id="zoomSlider" />
            </div>

            <div id="currentTurn" className="current-turn"></div>
        </div>
    );
};

const formatTime = (timeElapsed) => {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default GameContainer;
