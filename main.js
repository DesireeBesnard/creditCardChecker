
// I name my tables in order to more easily identify the cards that would be invalid

function makeNamedArray(name, digits) {
    const arr = digits;
    arr.name = name;
    return arr;
}

// All valid credit card numbers
const valid1 = makeNamedArray("valid1", [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]);
const valid2 = makeNamedArray("valid2", [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]);
const valid3 = makeNamedArray("valid3", [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]);
const valid4 = makeNamedArray("valid4", [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]);
const valid5 = makeNamedArray("valid5", [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]);

// All invalid credit card numbers
const invalid1 = makeNamedArray("invalid1", [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]);
const invalid2 = makeNamedArray("invalid2", [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]);
const invalid3 = makeNamedArray("invalid3", [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]);
const invalid4 = makeNamedArray("invalid4", [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]);
const invalid5 = makeNamedArray("invalid5", [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]);

// Can be either valid or invalid
const mystery1 = makeNamedArray("mystery1", [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]);
const mystery2 = makeNamedArray("mystery2", [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]);
const mystery3 = makeNamedArray("mystery3", [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]);
const mystery4 = makeNamedArray("mystery4", [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]);
const mystery5 = makeNamedArray("mystery5", [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]);

// A nested array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];



// STEP 1: validateCred() uses the Luhn algorithm to return true when a credit card is valid and false when it's not

const validateCred = (array) => {
    let checkingTable = []; //This table will contain the values ​​from the Luhn sequence
    let reverseArray = array.slice().reverse(); // I copy the array to not mutate the original values, and reverse it to start from the farthest digit to the right.

    for (let i = 0; i < reverseArray.length; i++) {

        let digit;

        if ( i % 2 == 0) { // I double every other digit so when i is an odd number
            checkingTable.push(reverseArray[i]);
        } else {
            digit = reverseArray[i] * 2;
            if (digit > 9) { // If the number is greater than 9 I substract 9 from the value
                digit -= 9;
            }
            checkingTable.push(digit);
        }
    }

    let sum = checkingTable.reduce((a,b) => a + b, 0); // All the values  of checkingTable are added

    if (sum % 10 == 0) {
        console.log(true);
        return true; // The number is valid
    }
    else {
        console.log(false);
        return false;
    }
    
}

// STEP 2: findInvalidCards() checks in a nested array which are the invalid cards and returns them in an array

let cardsFoundInvalid = []; //table in which the cards are returned
let stringCardsFoundInvalid = []; //To display a string just for visual comfort

const findInvalidCards = (nestedArray) => {
    
    for (let i = 0; i < nestedArray.length; i++) {
        if (validateCred(nestedArray[i]) === false) {
            cardsFoundInvalid.push(nestedArray[i]);
            stringCardsFoundInvalid.push(nestedArray[i].name);
        }
    }
    console.log(`Invalid cards are: ${stringCardsFoundInvalid.join(", ")}`);
    console.log(cardsFoundInvalid);
    return cardsFoundInvalid;
}


// STEP 3: idInvalidCardCompanies() returns an array of companies that have mailed out cards with invalid numbers

let cardCompanies = [];

const idInvalidCardCompanies = (nestedArray) => {

    for (let i = 0; i < nestedArray.length; i++) {

        if (nestedArray[i][0] === 3) { 
            if (cardCompanies.indexOf("Amex") === -1) {  // If the first digit is 3 and "Amex" is not already in the cardCompanies array, push "Amex"
                cardCompanies.push("Amex");
            }
        } else if (nestedArray[i][0] === 4) {
            if (cardCompanies.indexOf("Visa") === -1) {
                cardCompanies.push("Visa");
            }
        } else if (nestedArray[i][0] === 5) {
            if (cardCompanies.indexOf("MasterCard") === -1) {
                cardCompanies.push("MasterCard");
            }
        } else if (nestedArray[i][0] === 6) {
            if (cardCompanies.indexOf("Discover") === -1) {
                cardCompanies.push("Discover");
            }
        } else if (nestedArray[i][0] !== (3 && 4 && 5 && 6)) {
            console.log(`Company not found for ${nestedArray[i]}`);
        }
    } 
    console.log(cardCompanies);
    return cardCompanies;
}

// validateCred();
// findInvalidCards();
// idInvalidCardCompanies(cardsFoundInvalid);

const example = "4539677908016808";
console.log(exampleArray = Array.from(example));
console.log(exampleArray.map(num => parseInt(num)));
