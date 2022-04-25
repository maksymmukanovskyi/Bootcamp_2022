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

const questions = [
    {
        1: 'When JS was invented?',
        2: ['1: 2002','2: 1995','3: 1987'],
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
]


const randomQuestion = function(arrQuestions){
    const questNum = Math.ceil(Math.random() * (arrQuestions.length - 1 + 1)) - 1;
    return questNum;
}
 

const questionsArray = questions.map(el => new Question(el));


//     questionsArray[randomNumFromArr].showQuestionWithAnswer();
// questionsArray[randomNumFromArr].checkIfCorrectAnswer();



//Selectors
const questSelector = document.querySelector('.question');
const answerSelector = Array.from(document.querySelectorAll('label'));
const randomQuest = Array.from(document.querySelectorAll('input'));
const resultAnsw = document.querySelector('.result');


const state = {
    currentObj: questionsArray[randomQuestion(questions)],
    // htmlData: this.currentObj.showQuestionWithAnswer(),
}
console.log(state.currentObj)

const updateUi = function(){
    state.currentObj = questionsArray[randomQuestion(questions)];
    let htmlData = state.currentObj.showQuestionWithAnswer();
    questSelector.textContent = htmlData[0];
    for(let i = 0; i< htmlData[1].length; i++){
    answerSelector[i].textContent = htmlData[1][i];
}
};




const globalController = function (){

    randomQuest.map(el => el.addEventListener('click', onAnswer));

    function onAnswer(e){

        if (e.currentTarget.matches('input')) {
        updateUi();
        
    }
}
};

updateUi();
globalController();

    

    


    /*const checkAnswer = function self(arr){
        


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
    };*/
    












