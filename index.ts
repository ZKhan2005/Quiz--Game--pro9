#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const apiLink: string = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple" ;

let fetchData = async (data:string) =>{
    let fetchQuiz:any = await fetch(data)
    let res = await fetchQuiz.json()
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async ()=>{
    let score:number = 0
    //for user name
    let name = await inquirer.prompt({
        type:"input",
        name:"fname",
        message:chalk.bold.blue(" <<====== Type Your Name ? ======>>")
    });
    for(let i = 1 ; i <=5 ; i++){
        let answers =[...data[i].incorrect_answers, data[i].correct_answer];

        let ans = await inquirer.prompt({
            type:'list',
            name:'quiz',
            message:data[i].question,
            choices: answers.map((val:any)=> val),  
        });
        if (ans.quiz == data[i].correct_answer){
            ++score
            console.log(chalk.bold.magentaBright('!!..... Correct Answer .....!!'))
        } else{
            console.log(chalk.bold.green`*====== Correct Answer Is  ${chalk.bold.green(data[i].correct_answer)} ======*`)
        }
    } 
    console.log(chalk.bold.yellow`Player ${chalk.blueBright.bold(name.fname)}  Your Score Is ${chalk.bold.redBright(score)} out of ${chalk.bold.bgCyan(` ***   5   ***`)}`);
};
startQuiz();