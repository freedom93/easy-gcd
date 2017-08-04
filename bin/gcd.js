#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const gcd = require('../index.js');
let projectSeedPath = 'https://github.com:freedom93/bootstrap-seed.git';

program
	.version('v' + require('../package.json').version)
program
	.parse(process.argv);

let getAnswers = function() {
	return [{
		type: 'input',
		name: 'projectName',
		message: 'What\'s the project name?'
	}]
};

inquirer.prompt(getAnswers()).then((answers) => {
    gcd(answers.projectName, projectSeedPath, program.clone);
});