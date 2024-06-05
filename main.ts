#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Bank Account Interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount:number): void
    deposit(amount:number): void
    checkBalance():void
}

//Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance:number){
    this.accountNumber = accountNumber;
    this.balance = balance;
    }

// Debit Money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successfully. Your Remaining Balance: $${this.balance}`);
    }else {
        console.log("You have Infufficient Balance");
    }
}
// Credit Money
deposit(amount: number): void {
    if (amount > 100 ){
        amount -= 1;   //$1 fee charge if more than $100 is deposited
    }this.balance += amount;
    console.log(`Deposit of $${amount} successfully. Remaining balance: $${this.balance}`);
}

//check balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
}
}
// Customer class
class Customer{
    firstName: string;
    lastName:string;
    gender: string;
    age: number;
    mobNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender:string, age:number, mobNumber:number, account:BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobNumber = mobNumber;
        this.account = account
    }
}
//Create Bank Accounts
const accounts: BankAccount[]= [
    new BankAccount(1005, 1000),
    new BankAccount(1006, 1500),
    new BankAccount(1007, 2000)
]
//Create Customers
const Customers:Customer[] =[
    new Customer ("Asma", "Khan","Female", 25, 3450929650, accounts[0]),
    new Customer ("Jaweria", "Ali","Female", 27, 310029650, accounts[1]),
    new Customer ("Humaira", "Hasan","Female", 28, 301092965, accounts[2])
]

//Function to interact with Bank account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
          name: "accountNumber",
          type: "number",
          message: chalk.blackBright ("Enter your account number:"),
        })
         const Customer = Customers.find (Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if(Customer){
         console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}!\n`);
        const answer = await inquirer.prompt([{
            name:  "select",
            type:  "list",
            message: chalk.bgBlue("Select an operation"),
            choices: ["Deposit", "Withdraw", "Check Balance", "Exit" ]
        }]);

        switch(answer.select){
          case "Deposit":
            const depositAmount = await inquirer.prompt({
                name: "amount",
                type:  "number",
                message: chalk.bgCyan("Enter the amount to deposit:")
            })
            Customer.account.deposit(depositAmount.amount);
            break;
        case "Withdraw":
            const withdrawAmount = await inquirer.prompt({
                name: "amount",
                type:  "number",
                message: chalk.bgBlackBright("Enter the amount to withdraw:")
            })
            Customer.account.withdraw(withdrawAmount.amount);
            break;
        case "Check Balance":
            Customer.account.checkBalance();
            break;
        case "Exit":
            console.log("Exiting bank program....");
            console.log("\n Thank you for using our bank services. Have a great day!");
            return;
          }

       }else {
        console.log("Invalid account nnumber. Please try again later.");
       }
    } while(true)
}

service()