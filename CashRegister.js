//Create a function that takes three arguments: The price of an item, the cash given by the customer, and the amount of cash in the drawer
function checkCashRegister(price, cash, cid) {
    //Create an array of objects with the name and value of each currency
    const currency = [
        {name: "PENNY", value: 0.01},
        {name: "NICKEL", value: 0.05},
        {name: "DIME", value: 0.1},
        {name: "QUARTER", value: 0.25},
        {name: "ONE", value: 1},
        {name: "FIVE", value: 5},
        {name: "TEN", value: 10},
        {name: "TWENTY", value: 20},
        {name: "ONE HUNDRED", value: 100}
    ];

    //Create a change variable to store the amount owed to a customer
    let change = cash - price;
    //Create an empty variable to be reassigned later, storing the amount of cash in the register
    let amount = 0;
    //Create an empty array to store the currency units given as change to the customer
    let changeOwed = [];

    //Loop through the cash in the drawer and calculate the amount of each currency unit
    for(let i = 0; i < cid.length; i++){
        //Assign it to the amount variable
        amount += cid[i][1];
    }

    //If the amount of cash in the drawer is less than the change owed to the customer:
    if(amount < change){
        //return insuficient funds
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

    //if the amount of cash in the drawer is equal to the change owed:
    else if (amount === change) {
        //return closed with the cid argument passed, as we used all our change
        return {status: "CLOSED", change: cid};
    }

    //Otherwise, calculate the change owed to the customer
    else {
        //Loop through the currency, starting from highest to lowest
        for (let i = currency.length - 1; i >= 0; i--) {
            //Get the name of the currency item
            let currencyName = currency[i].name;
            //get the amount of currency unit item in drawer
            let currencyAmount = cid[i][1];
            let totalAmount = 0;
            //While there is still change owed and there is enough of the current currency unit in the cash register
            while (change >= currency[i].value && currencyAmount > 0) {
                //Subtract the change owed from the amount of cash in register
                change -= currency[i].value;
                currencyAmount -= currency[i].value;
                //Add the value to the total amount owed to the customer
                totalAmount += currency[i].value;
                //Round the change to two decimal points to avoid float point errors. For this, use the .round Math function
                change = Math.round(change * 100) / 100;
            }

            //If any currency unit was used to give change
            if(totalAmount > 0){
                //Use the .push() method to push its name and amount to the changeOwed array
                changeOwed.push([currencyName, totalAmount]);
            }
        }
    }

    //If there's still change owed to the customer after using all the cash in the drawer
    if (change > 0) {
        //return insuficient funds
        return {status: "INSUFFICIENT_FUNDS", change: []};
    //Otherwise
    } else {
        //return Open, and the change owed variable array
        return {status: "OPEN", change: changeOwed};
    }
}

// Function Calls:
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

