// Exercise 1
/*
Banking System

Create an Account class with the properties accountNumber, currentBalance, and owner. The Account should have methods to deposit and withdraw. The 
deposit method should add that amount to the currentBalance. The withdraw method should first check if there is enough to withdraw before withdrawing

Implement child classes CheckingAccount and SavingsAccount, each inheriting from the Account class. 

The CheckingAccount will also have an overdraftLimit property. Override the withdraw method to 
first check if there is enough (+ overdraftLimit) before withdrawing.

The SavingsAccount will also have an interestRate. Add a method addInterest that will increase the currentBalance by that interest rate

*/

class Account {
    constructor(accountNumber, currentBalance, owner) {
        this.accountNumber = accountNumber;
        this.currentBalance = currentBalance;
        this.owner = owner;
    }

    deposit(amt) {
        this.currentBalance += amt
        console.log(`${this.currentBalance}`)
    }

    withdraw(amt) {
        if (amt<=this.currentBalance){
            this.currentBalance -= amt;
            console.log(`${this.currentBalance}`)
            
        }
        else {console.warn(`uh oh ${this.owner} looks like you're broke`)}
    }
}

class CheckingAccount extends Account {
    constructor(accountNumber, currentBalance, owner, overdraft) {
        super(accountNumber, currentBalance, owner);
        this.overdraft = overdraft
    }

    withdraw(amt) {
        if (amt<=(this.currentBalance + this.overdraft)){
            this.currentBalance -= amt;
            console.log(`${this.currentBalance}`)
        }
        else {console.warn(`uh oh ${this.owner} looks like you're broke`)}
    }
}

class SavingsAccount extends Account {
    constructor(accountNumber, currentBalance, owner, interestRate) {
        super(accountNumber, currentBalance, owner);
        this.interestRate = interestRate
    }

    addInterest() {
        this.currentBalance = this.currentBalance* (1+this.interestRate/100);
        console.log(`${this.currentBalance}`)
    }
}


const checkingAccount = new CheckingAccount('123456', 1000, 'John Doe', 500);
const savingsAccount = new SavingsAccount('654321', 5000, 'Jane Smith', 2);

checkingAccount.deposit(500);
checkingAccount.withdraw(1400);
checkingAccount.withdraw(200);  

savingsAccount.deposit(1000);
savingsAccount.withdraw(7000);
savingsAccount.addInterest();




// Exercise 2 - Promises 
// Using the below getMovieInfo function, which is a Promised-base function, write an asynchronous function (.then().catch() or async/await)
// called printMovieInfo that will take in a movie title and then either displays the movie information or logs an error with a console.warn().


function getMovieInfo(movieName){
    return new Promise((resolve, reject) => {
        if (movieName.length > 5){
            let movie = {
                id: 123,
                title: movieName,
                director: 'Christopher Spielberg',
                runtime: 157,
                description: 'Good vs Evil'
            }
            resolve(movie)
        } else {
            reject(`${movieName} cannot be accessed because it is too short.`)
        }
    })
}

function printMovieInfo(movieName){
    getMovieInfo(movieName)
    .then(movie => {
        console.log(`${movie.title} directed by ${movie.director}. A story of ${movie.description} that runs for ${movie.runtime} minutes.`)
    })
    .catch(error => {
        console.warn(`*Warning* ${movieName} cannot be accessed because it is too short.`)
    })
};

// Example 1
printMovieInfo('Indiana Jones and the Dark Knight')
// Output: Indiana Jones and the Dark Knight directed by Christopher Spielberg. A story of Good vs Evil that runs for 157 minutes.

// Example 2
printMovieInfo('ET')
// Output: *Warning* ET cannot be accessed because it it too short