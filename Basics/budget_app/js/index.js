'use strict'


// MODEL
const budgetController = (function(){
    const Expence = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = function(type){
        data.totals[type] = data.allItems[type].reduce((acc, el) => acc + el.value, 0);
    };

    const data ={
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1,
    }


    return {
        addItem: function (type, des, val){
                let newItem, ID;
// create new id
                if(data.allItems[type].length  > 0){
                    ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
                }else{
                    ID = 0;
                }
// cereate  nee itgem based on inc or exp
                if(type === 'exp'){
                    newItem = new Expence(ID, des, val);
                }else if(type === 'inc'){
                    newItem = new Income(ID, des, val);
                };
                data.allItems[type].push(newItem);

                return newItem;
        },
        calculateBudget: function(){
            //Calc total exp and inc
            calculateTotal('exp');
            calculateTotal('inc');


            // Calc budget inc-exp
            data.budget = data.totals.inc - data.totals.exp;

            //Calc persentage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }

        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },

        testing: function(){
            console.log(data);
        }
    }
})();


//VIEW
const UIController = (function(){

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expencesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenceLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
    }



    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }
        },
        addListItem: function (obj ,type){
        let markup, element;

            if(type == 'inc'){
                element = DOMstrings.incomeContainer;

                markup = `<div class="item clearfix" id="inc-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${obj.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn">
                            <i class="ion-ios-close-outline"></i>
                        </button>
                    </div>
                </div>
            </div>`;
            }else if(type == 'exp'){
                element = DOMstrings.expencesContainer;

                markup = `<div class="item clearfix" id="exp-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${obj.value}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            };

            document.querySelector(element).insertAdjacentHTML('beforeend', markup);
        },


        clearFields: function(){
            let fields, arrayFields;
            fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);
            arrayFields = Array.prototype.slice.call(fields);
            // arrayFields = Array.from(fields);
            arrayFields.forEach(el => el.value = '');
            arrayFields[0].focus();

        },
        displayBudget: function(obj){

        document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
        document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
        document.querySelector(DOMstrings.expenceLabel).textContent = obj.totalExp;
        console.log(document.querySelector(DOMstrings.percentageLabel));

        if(obj.percentage > 0){
            document.querySelector(DOMstrings.percentageLabel).textContent = `${obj.percentage} %`;
        }else{
            document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        }
        },

        getDOMstrings: function(){
            return DOMstrings;
        },
    }
})()

//CONTROLLER

const controller = (function(budgetCtrl, UICtrl){

    const setupEventListeners = function (){
    const DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(evt){
        if(evt.key === 'Enter'){
            ctrlAddItem();
        }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    }

    const updateBudget = function(){
        // 4. Calculate the budget
        budgetCtrl.calculateBudget();
        // 4.1 Return the budget
        const budget = budgetCtrl.getBudget();
        console.log(budget);
        // 5. Display the budget to the UI
        UICtrl.displayBudget(budget);

    }


    const ctrlAddItem = function (){
        let input, newItem;

        // 1. Get the field input data.
        input = UICtrl.getInput();

        if(input.description !== '' && !isNaN(input.value) && input.value > 0){

        // 2. Add the item to the budget controller

        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 3.1 Clear fields
        UICtrl.clearFields();

        //4. Calculate andupdate budget
        updateBudget();
        }
    };
    const ctrlDeleteItem = function (evt){
        let itemID, splitID, type, ID;
        itemID = evt.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];

            // 1. Delete item from DB

            //2. Delete item from UI

            //3. Update and shoe new budget
        }
    };   

   


    return {
        init: function(){
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            });
            setupEventListeners();
        }
    }
})(budgetController, UIController);


controller.init();