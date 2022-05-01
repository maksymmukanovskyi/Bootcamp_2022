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

    const data ={
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        }
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
    }



    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },
        addListItem: function (obj ,type){
        let markup, element;

            if(type == 'inc'){
                element = DOMstrings.incomeContainer;

                markup = `<div class="item clearfix" id="income-${obj.id}">
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

                markup = `<div class="item clearfix" id="expense-${obj.id}">
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
    })
    }


    const ctrlAddItem = function (){
        let input, newItem;

        // 1. Get the field input data.
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller

        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        // 4. Calculate the budget



        // 5. Display the budget to the UI
    }   

   


    return {
        init: function(){
            setupEventListeners();
        }
    }
})(budgetController, UIController);


controller.init();