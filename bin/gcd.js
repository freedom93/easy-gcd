#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const gcd = require('../index.js');

program
	.version('v' + require('../package.json').version)
program
	.parse(process.argv);

let chooseTerminal = function() {
	return [{
		type: 'input',
		name: 'projectName',
		message: 'What\'s the project name?'
	}]
};

inquirer.prompt(chooseTerminal()).then(function(answers) {
	gcd(answers.projectName);
});

