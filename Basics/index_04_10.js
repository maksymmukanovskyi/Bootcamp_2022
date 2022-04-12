'use strict'
let answer;
const activityList = [];

while(answer !== 'quit'){
    switch(answer){
        case 'new':
            answer = prompt('type your activity!');
            activityList.push(answer);
            console.log(`${answer} added to list`)
        break;
        case 'list':
           
            console.log('**********');
            for(const el of activityList){
                console.log(`${activityList.indexOf(el)}:${el}`);
            }
            console.log('**********');
            break;
        case 'delete':
            answer = prompt('type number of the item to delete.');
            console.log(`${activityList[answer]} removed!`);
            activityList.splice(answer,1);
        break;     
            default:
            console.log('please select activity! new, list, delete, quit');
    }
    answer = prompt('what would you like to do?');

}

console.log('Thanks for using this app!')