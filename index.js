#!/usr/bin/env node
let commander = require('commander'),
    download = require('download-github-repo'),
    shell = require('shelljs'),
    color = require('colors');

const url = 'https://twitter.github.com/bootstrap/assets/bootstrap.zip';

commander.version('1.0.0')
    .command("new <name>")
    .description('Creates a new project with a given name.')
    .action((name) => {
        let dir = `./${name}`;

        info(`Creating ${name} application.`);

        download('ivyjs/application', dir, (err) => {
            if (err) {
                error(err);
                return;
            }
            success(`Application ${name} created!`);
            installApplication(name);
        });
    });

commander.parse(process.argv);
if (!commander.args.length) commander.help();

function installApplication(name) {
    shell.cd(name);
    info('Installing dependencies.');
    shell.exec('yarn install');
    success('Installation done.');
    copyEnvFiles();
}

function copyEnvFiles() {
    info('Creating environment file.');
    shell.cp('.env.example', '.env');
    success('Environment file created.');
    success('All done! Make something great!'.underline);
}

function info(message) {
    console.log(message.yellow);
}

function success(message) {
    console.log(message.green);
}

function error(message) {
    console.error(message.red);
}