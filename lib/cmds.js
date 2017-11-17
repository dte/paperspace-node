const chalk = require("chalk");
const logo = 'PS';
var DEETS_NOTE = 'See https://paperspace.github.io/paperspace-node for details';

module.exports = () => {
  console.log(`
  ${chalk.bold(`${logo}`)} [options] <command | path>

  ${chalk.dim("Commands:")}

    ${chalk.dim("Machines")}
      create                  [options]      Deploy a new job ${chalk.bold("(default)")}
      destroy                 [id]           Destroy a machine
      list                    [cmd]          List all machines
      restart                 [id]           Restart a machine
      show                    [cmd]          Show a machine's details
      start                   [id]           Start a machine
      stop                    [id]           Stop a machine
      utilization             [cmd]          Show utilization
      waitfor                 [cmd]          Wait for a machine to change state

    ${chalk.dim("Networks")}
      list

    ${chalk.dim("Scripts")}
      create
      destroy
      list
      show
      text

    ${chalk.dim("Templates")}
      list

    ${chalk.dim("Users")}
      list

    ${chalk.dim("Jobs")} ${chalk.blue("NEW")} 

      run                  [path]      Deploy a new job ${chalk.bold("(default)")}
      ls | list            [app]       List jobs
      rm | remove          [id]        Remove a job
      logs                 [url]       Displays the logs for a job
      stop                 [args]      Scales the instance count of a job
      help                 [cmd]       Displays complete help for [cmd]

    ${chalk.dim("Administrative")}

      login                            Login into your account or creates a new one
      logout                           Logout from your account

  ${chalk.dim("Options:")}

    -h, --help                Output usage information
    -v, --version             Output the version number
    -t ${chalk.underline("TOKEN")}, --token=${chalk.underline("TOKEN")}   Login token
    -L, --login               Configure login

	---
	${chalk.dim(DEETS_NOTE)}

  ${chalk.dim("Examples:")}

  ${chalk.gray("–")} Create a cloud IDE

    ${chalk.cyan("$ paperspace create")}
    ${chalk.cyan("$")} ${chalk.green("Success!")} ${chalk.white("Your new machine is running! 🌈")}
    ${chalk.dim("Connect through a terminal:")} ${chalk.white("`ssh root@101.12.12.14`")}
    ${chalk.dim("Open desktop in a web browser")} ${chalk.white.underline("https://www.paperspace.com/desktop/ps6hu89a")}
    ${chalk.dim("-------------------------")}
    ${chalk.bold("Machine")}
    ${chalk.white("id:")}  ${chalk.white("ps6hu89a")}   ${chalk.white("cpu: ")} ${chalk.white("4")}
    ${chalk.white("RAM:")} ${chalk.white("16GB")}       ${chalk.white("HD: ")}  ${chalk.white("50GB")}

    ${chalk.bold("GPU")}
    ${chalk.white("Nvidia Tesla P5000 (8GB)")}

  ${chalk.gray("–")} Create a jupyter notebook with GPU

    ${chalk.cyan("$ paperspace create jupyter")}
    ${chalk.cyan("$")} ${chalk.green("Success!")} ${chalk.white("Your notebook is running! 🌈")}
    ${chalk.dim("Open desktop in a web browser")} ${chalk.white.underline("https://101.12.12.14:2083")}
    ${chalk.dim("-------------------------")}
    ${chalk.bold("Machine")}
    ${chalk.white("id:")}  ${chalk.white("ps6hu89a")}   ${chalk.white("cpu: ")} ${chalk.white("4")}
    ${chalk.white("RAM:")} ${chalk.white("16GB")}       ${chalk.white("HD: ")}  ${chalk.white("50GB")}

    ${chalk.bold("GPU")}
    ${chalk.white("Nvidia Tesla P5000 (8GB)")}
    ${chalk.dim("-------------------------")}

    ${chalk.magenta("Opening browser now...")}

  ${chalk.gray("–")} Create a jupyter notebook (CPU only)

    ${chalk.cyan("$ paperspace create jupyter --c4")}
    ${chalk.cyan("$")} ${chalk.green("Success!")} ${chalk.white("Your notebook is running! 🌈")}
    ${chalk.dim("Open desktop in a web browser")} ${chalk.white.underline("https://101.12.12.14:2083")}
    ${chalk.dim("-------------------------")}
    ${chalk.bold("Machine")}
    ${chalk.white("id:")}  ${chalk.white("ps6hu89a")}   ${chalk.white("cpu: ")} ${chalk.white("4")}
    ${chalk.white("RAM:")} ${chalk.white("16GB")}       ${chalk.white("HD: ")}  ${chalk.white("50GB")}

    ${chalk.magenta("Opening browser now...")}
`);
};

// help();
