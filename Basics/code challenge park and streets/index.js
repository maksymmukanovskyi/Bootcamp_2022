class Park{
    constructor(name, buildYear, parkArea, numberOfTree,){
        this._name = name;
        this._buildYear = buildYear;
        this._parkArea = parkArea;
        this._numberOfTree = numberOfTree;
    }

    treeDencity () {
        return console.log(`${this._name} has a tree dencity of ${Math.round(this._numberOfTree / this._parkArea)} trees per sq. km.`)
    }
};

class Street{
    constructor(name, buildYear, streetLength){
        this._name = name;
        this._buildYear = buildYear;
        this._streetLength = streetLength;
    }
};  

const greenPark = new Park('Green Park', 1988, 1200, 80000);
const nationalPark = new Park('National Park', 1975, 1600, 86000);
const oakPark = new Park('Oak Park', 2000, 1800, 15000);

const oceanAve = new Street('Ocean Avenue', 2001, 99);
const everGreenSt = new Street('Evergren Streeet', 1699, 25);
const fourthSt = new Street('4TH Street', 1801, 99);
const sunsetBlvd = new Street('Sunset Boulevard', 2018, 150);

const parks = [greenPark, nationalPark, oakPark];
const streets = [oceanAve, everGreenSt, fourthSt, sunsetBlvd];

const showData = (type, data) => {
    if(type == "parks"){
        console.log('=========PARKs REPORTS===========');
        const averageAdge = data.reduce((acc, el) => {
            let res = (acc + (new Date().getFullYear() - el._buildYear)) / data.length;
            return res;
        }, 0);
        console.log(`Our 3 Parks have an average age of ${Math.round(averageAdge)}`);

        const treeDencity = data.forEach(el => el.treeDencity());

        const parkWithMoreThanSeventyTree = data.filter(el => el._numberOfTree > 70000);
        parkWithMoreThanSeventyTree.forEach(el => console.log(`${el._name} has more then 7000 threes!`));

    }else if(type == 'streets'){
        console.log('=========STREETS REPORTS===========');
        const totalLengthStreet = data.reduce((acc, el) => acc + el._streetLength, 0);
        const averageLengthStreet = totalLengthStreet/ data.length;
        console.log(`Our ${data.length} streets have a total length of ${Math.round(totalLengthStreet)} km, with an average of ${Math.round(averageLengthStreet)} km.`);

        const sizes = {
            'tiny': 18, 
            'small': 25, 
            'normal': 34, 
            'big': 99, 
            'huge': 150
        };
        const defineSize = (str, szOfSt = 'normulichki') => {
            if(typeof szOfSt === "object"){
                for (const [key, value] of Object.entries(szOfSt)) {
                    if(str._streetLength == value){
                    console.log(`${str._name}, built in ${str._buildYear} is a ${key} street.`);
                    }
                  }
            }else{
                    console.log(`${str._name}, built in ${str._buildYear} is a ${szOfSt} street.`);
                  }
            }
            
        const getSizes = function(streets, sizes, callback){

            for(let street of streets) {
                callback(street, sizes);
            }
        };


        getSizes(streets, sizes, defineSize);

    }
};
//18.25.99.34
showData('parks', parks);
showData('streets', streets);




/*const nodeListForEach = function(list, calback){
    for(let i = 0; i < list.length; i++){
        calback(list[i], i);
    }
}*/

/* nodeListForEach(percFields, (curr, idx) => {
                if(percentages[idx] > 0){
                    curr.textContent = `${percentages[idx]} %`;
                }else{
                    curr.textContent = '---';
                }
            })*/