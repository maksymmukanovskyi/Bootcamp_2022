'use strict'



/*let fn = (num)=>{
    let daysOfWeek = {
        1:'Monday',
        2: 'Tuesday',
        3: 'Wensday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday',
    }
    let responce;
    for(const prop in daysOfWeek){

        if(num == prop){
            responce = daysOfWeek[num];
            break;
        }else{ 
            responce = null;
        }
    }
    let message = typeof responce !== "string"?  "pizdets" : responce;

    return console.log(message);
};

fn("6");*/

// const arrLast = (arr) => {
//     return Array.isArray(arr) && arr.length > 0 ? console.log(arr[arr.length -1]) : console.log("null")
     
// }
// arrLast([1]);



const hen = {
    name : 'Helen',
    eggCount  : 0,
    layAnEgg  (){
        this.eggCount +=1;
        return console.log("EGG");
    },
}
console.log(hen.name) // "Helen"
console.log(hen.eggCount) // 0
hen.layAnEgg() // "EGG"
hen.layAnEgg() // "EGG"
console.log(hen.eggCount) // 2
