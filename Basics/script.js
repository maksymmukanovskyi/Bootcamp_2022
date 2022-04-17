'use strict';
let scores, activePlayer, roundScore, currentDice, gameActive, inputValue, dices, randomNumbers;
init();

const form = document.querySelector('form');
form.addEventListener("submit", (event)=>{
    if(gameActive){
    event.preventDefault();
    inputValue = document.getElementById('inputArea').value;
    document.querySelector('.scoreMessage').textContent = `Winning score is ${inputValue}`;
    form.reset();
    form.style.display = "none";
    }
});

function randomNumber(){
    let dice = Math.floor(Math.random() * 6) + 1;
    return dice;
}

function diceSelection(dice, num){
    let diceDom = document.querySelector(dice);
    diceDom.style.display = 'block';
    diceDom.src = `dice-${num}.png`;
}


document.querySelector('.btn--roll').addEventListener('click', ()=>{
    form.style.display = "none";
    randomNumbers = [randomNumber(), randomNumber()];

    document.querySelector('.currentData').textContent = `Dice1 = ${randomNumbers[0]}, Dice2 = ${randomNumbers[1]}`;

    if(gameActive){

        diceSelection(dices[0], randomNumbers[0]);
        diceSelection(dices[1], randomNumbers[1]);
    console.log(randomNumbers)
        if(!randomNumbers.includes(1)){
            if(roundScore == 6 && randomNumbers.includes(6)){
                console.log(`roundScore ${roundScore}, dice ${randomNumbers}`);
                scores[activePlayer] = 0;
                document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

                nextPlayer()

            }else{
                console.log(roundScore, randomNumbers);
                roundScore += randomNumbers.reduce((acc, el)=>acc += el,0);
                document.querySelector('#current--' + activePlayer).textContent = roundScore;
                console.log(roundScore);

            }
        }else{
            nextPlayer()
        }
    }
    

})


document.querySelector('.btn--hold').addEventListener('click', onHoldClick);
function onHoldClick(){
    document.querySelector('.currentData').textContent = `Dice1 = ${randomNumbers[0]}, Dice2 = ${randomNumbers[1]}`;
    if(gameActive){
        scores[activePlayer] += roundScore;
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        
         //winner found
        
         if(scores[activePlayer] >= inputValue){
            document.querySelector(`#name--${activePlayer}`).textContent = 'Winner!';
            document.querySelectorAll('img').forEach(el =>el.style.display ='none');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            gameActive = false;
        
         }else{
            nextPlayer();
         }
        
        
    }

}   





function nextPlayer(){

    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('.currentData').textContent = `Dice1 = ${randomNumbers[0]}, Dice2 = ${randomNumbers[1]}`;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    document.querySelectorAll('img').forEach(el =>el.style.display ='none');

}


document.querySelector('.btn--new').addEventListener('click', init );

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gameActive = true;
    inputValue = 20;
    dices = ['.dice--0', '.dice--1'];
    

    document.querySelector(dices[0]).style.display = 'none';
    document.querySelector(dices[1]).style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2'; 
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.remove('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector('.scoreMessage').textContent = `Winning score is ${inputValue}`;
    document.querySelector('form').style.display = "block";

    document.querySelector('.currentData').textContent = `Dice1 = 0, Dice2 = 0`;

}
