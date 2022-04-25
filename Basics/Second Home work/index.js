'use strict'

// let Person = function(name, yearOfBirth, profesion){
//     this.name = name;
//     this.yearOfBirth= yearOfBirth;
//     this.profesion = profesion;
// }


// Person.prototype.calculateAge = function(){
//     console.log(2022-this.yearOfBirth);
// }
// Person.prototype.lastName = "Anderson";

// let tori = new Person("Tori", 1990, 'Architect');
// tori.calculateAge();
// console.log(tori.lastName)

// const person = {
//     name: 'Alex',
//     age:26,
//     profesion: "designer",
//     telInfo(){
//         return `My name is ${this.name}, i'm ${this.age}, my ocupation is ${this.profesion}!`
//     }
// }

// let alexFriend = Object.create(person);
// alexFriend.profesion = "developer";
// alexFriend.age = 32;
// alexFriend.name = 'Tory';
// alexFriend.__proto__.getHi = function(){
//     return `Hi ${this.name}, do you like your job?`;
// } 


// console.log(person.getHi());

// const getProfecionQuestion = function(job){
//     return function(name){
//         if(job === 'architect'){
//             console.log(`${name} what do you like the most in Architecture?`);
//         }else if(job === 'developer'){
//             console.log(`What new feature you learn recently ${name}`)
//         }else{
//             console.log(`What is your ocupation?`)  
//             }
//     }
//     };
//     getProfecionQuestion('architect')('Mark');

// const answer = getProfecionQuestion('architect')('Mark');
// console.log(answer);


// (function(goodLuck){
//     const num = Math.round(Math.random() * 10) - goodLuck;
//     const game = num >= 5? "Winner" : "Looser";
//     console.log(game)
//     console.log(num);
// })(2)


/* CHALLANGE 3 */




//Constructor

function Question(test){
    this.question = test['1'];
    this.answer = test['2'];
    this.correAnsw = test['3'];
};

Question.prototype = {
    constructor: Question
};

Question.prototype.showQuestionWithAnswer = function(){
    return [this.question, this.answer];
};
/*
Question.prototype.askAnsqwer = function(){
    const answer = prompt('Please input answer number!');
    return answer;
};

Question.prototype.checkIfNumerical = function self(inp = this.askAnsqwer()){
    const recursionFn  =  self.bind(this);
    const userInput = inp;
        const isNumerical = !isNaN(parseFloat(userInput))
        let typedAnswer = '';

        if(isNumerical){
            typedAnswer = userInput;
        }else{
            recursionFn(this.askAnsqwer());
        }
        return typedAnswer;
};
Question.prototype.checkIfCorrectAnswer = function(){
    const userSelected = this.checkIfNumerical();
    if(this.correAnsw == userSelected){
        alert('Correct')
    }else{
        alert('Wrong')
    }
    return userSelected;
}*/

//Data

const questions = [
    {
        1: 'When M was born?',
        2: ['1: 2002','2: 1990','3: 1987'],
        3: 2,
    },
    {
        1: 'What is higher order function?',
        2: [
            '1: Function that operate on other fn',
            '2: Function that receive multiple arguments',
            '3: Function that return function'
        ],
        3: 1,
    },
    {
        1: 'JavaScript is high level language?',
        2: ['1: High level',
            '2: Low level',
            '3: Middle level'
        ],
        3: 1,
    
    },
    {
        1: 'Where M was born?',
        2: ['1: Zimbabve',
            '2: Ganduras',
            '3: Sibir'
        ],
        3: 1,
    
    },
    {
        1: 'What is the leve of English M has?',
        2: ['1: High level',
            '2: Low level',
            '3: Middle level'
        ],
        3: 3,
    
    },
    {
        1: 'Name of first love of M?',
        2: ['1: Frasyna',
            '2: Dusya',
            '3: Motra'
        ],
        3: 3,
    
    },
    {
        1: 'Name of M wife?',
        2: ['1: Alla',
            '2: Zelepuh',
            '3: Nastya'
        ],
        3: 2,
    
    },
    {
        1: 'Where M lives?',
        2: ['1: Japan',
            '2: Canada',
            '3: Israel'
        ],
        3: 2,
    
    },
    {
        1: 'Favourite dish of M?',
        2: ['1: Borshch',
            '2: Shuba',
            '3: Shashlyk'
        ],
        3: 2,
    
    },
    {
        1: 'What is the weight of M?',
        2: ['1: 76',
            '2: 78',
            '3: 79'
        ],
        3: 2,
    
    },
]


 
//New Object

const questionsArray = questions.map(el => new Question(el));





//Selectors
const questSelector = document.querySelector('.question');
const answerSelector = Array.from(document.querySelectorAll('span'));
let labelContent;
let randomQuest;
const resultAnsw = document.querySelector('.result');
const content = document.querySelector('.main');
const container = document.querySelector('.container');
const finish = document.querySelector('.finish');
const score = document.querySelector('.total');


//State

const state = {
    // currentObj: questionsArray[randomQuestion(questions)],
    currentObj: questionsArray[0],

    correctAnswer : false,
    currentQuestion: -1,
    countCorrect: 0,
}


//Data selection

const randomQuestion = function(arrQuestions){
    // const questNum = Math.ceil(Math.random() * (arrQuestions.length - 1 + 1)) - 1;
    // return questNum;
    
    if(state.currentQuestion < arrQuestions.length){
        state.currentQuestion += 1;
    }
    console.log(state.currentQuestion);
    return state.currentQuestion
}


//Controllers

const updateUi = function(){
    
    console.log('update ui')

    if(state.currentQuestion < questionsArray.length-1){
        state.currentObj = questionsArray[randomQuestion(questions)];
        let htmlData = state.currentObj.showQuestionWithAnswer();
        questSelector.textContent = htmlData[0];
    
    
        content.innerHTML = htmlData[1].map(el => `<label>
        <input  data-number="${el.slice(0,1)}" type="radio"  value="${el.slice(0,1)}"/>
        <span>${el}</span>
    </label>`).join(' ');
    
            
    
        labelContent = Array.from(document.querySelectorAll('label'));
        randomQuest = Array.from(document.querySelectorAll('input'));
        resultAnsw.textContent = '';
        container.classList.remove('hidden');
        container.classList.add('visible');
    }else{
        finish.textContent = "GAME OVER";
        score.textContent = `Your total corect score is: ${state.countCorrect < 1? 'Looser': state.countCorrect} out of ${questionsArray.length}`;
    }
    



};

const checkAnswer = function(){
    for(let question of randomQuest){

        if(question.checked){

            if( state.currentObj.correAnsw == question.dataset.number){
                state.correctAnswer = true;
                state.countCorrect += 1;

            }else{
                state.correctAnswer = false;
                labelContent.map(el => el.lastElementChild.textContent.slice(0,1) == state.currentObj.correAnsw?el.style.color = "green": null);
            }
        }

    }
    if(state.correctAnswer){
        resultAnsw.classList.remove('red');
        resultAnsw.classList.add('green');
    }else{
        resultAnsw.classList.remove('green');
        resultAnsw.classList.add('red');
    }


  resultAnsw.textContent = `You are ${state.correctAnswer? 'Corect' : 'Wrong'}!`;



}

const globalController = function (){

    randomQuest.map(el => el.addEventListener('click', onAnswer));
    function onAnswer(e){

        if (e.currentTarget.matches('input')) {
            container.classList.add('hidden');

            checkAnswer();

              setTimeout(() => {
                updateUi();

        randomQuest.map(el => el.addEventListener('click', onAnswer));

              }, 2500)
    }
};




};

//Initialization

updateUi();
globalController();

    

    


   
    












