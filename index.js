const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const downloadGitRepo = require('download-git-repo');
const inquirer = require('inquirer');

let next = (projectName, projectSeedPath, clone) => {

    if (/^https?:\/\//i.test(projectSeedPath)) {
        projectSeedPath = projectSeedPath.replace(/\.git$/i,'');
    }
    
    downloadGitRepo(projectSeedPath, projectName, {clone: clone}, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Project: ' + projectName + ' init done!');
    });
};

module.exports = (projectName, projectSeedPath, clone) => {

	let projectPath = path.join(String(process.cwd()), projectName);
	let isProjectExist = fs.existsSync(projectPath);

	// 检查当前目录是否已经有这个项目存在
	if (!isProjectExist) {
		next(projectName, projectSeedPath, clone);
	} else {
		shell.exec('echo project: ' + projectName + ' is existed!');
		inquirer.prompt([{
			type: 'confirm',
			name: 'deleteProject',
			message: 'Do you want to delete project ' + projectName + ' (enter for N)?',
			default: false
		}, {
			type: 'input',
			name: 'projectName',
			message: 'Please, input different project name:',
			when: (ans) => {
				return !ans.deleteProject;
			},
			validate: (input) => {
				if (input.trim() === '') {
					return 'Input should not be empty!'
				}

				if (input.trim() === projectName) {
					return 'Input should be different!'
				}

				if (fs.existsSync(path.resolve(input.trim()))) {
					return input + ' is existed too!'
				}

				return true;
			}
		}]).then((ans) => {
			if (ans.deleteProject) {
				shell.rm('-rf', projectPath);
			} else {
				projectName = ans.projectName; 

			}
			next(projectName, projectSeedPath, clone);
		});
	}
}