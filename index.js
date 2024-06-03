#! /usr/bin/env node
import inquirer from "inquirer";
import fs from "fs/promises";
let data = await fs.readFile("data.json", "utf-8");
const questionObject = JSON.parse(data);
let loop = 1;
let questionArr = questionObject.map((item) => {
    let single_question = {
        message: item.question,
        type: "list",
        choices: item.choices,
        name: "quest_" + loop,
    };
    loop++;
    return single_question;
});
console.log("Welcome to the TypeScript Quiz!!");
let answers = await inquirer.prompt(questionArr);
let answersArr = Object.values(answers);
questionObject.forEach((item, index) => {
    if (answersArr[index] == item.correct_answer) {
        console.log(`\nQuestion: ${item.question}`);
        console.log(`Correct Answer : ${item.correct_answer}`);
    }
    else {
        console.log(`\nQuestion: ${item.question}`);
        console.log(`Wrong Answer! the correct Answer is ${item.correct_answer}`);
        console.log(` Your answer was: ${answersArr[index]}`);
    }
});
