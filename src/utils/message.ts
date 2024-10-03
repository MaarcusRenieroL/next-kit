import chalk from "chalk";
import boxen from "boxen";

export function printIntroMessage() {
  const message = `
███╗   ██╗███████╗██╗  ██╗████████╗               ██████╗██╗     ██╗
████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝              ██╔════╝██║     ██║
██╔██╗ ██║█████╗   ╚███╔╝    ██║       █████╗    ██║     ██║     ██║
██║╚██╗██║██╔══╝   ██╔██╗    ██║       ╚════╝    ██║     ██║     ██║
██║ ╚████║███████╗██╔╝ ██╗   ██║                 ╚██████╗███████╗██║
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝                  ╚═════╝╚══════╝╚═╝


A faster way to build your next Next.js project
	`;

  console.log(chalk.green(message));
}

export function exit() {
  console.log("Thank you for using Next-CLI");
  process.exit(0);
}

export function printSuccessMessage(packageManager: string, targetDir: string) {
  const message = `
${chalk.greenBright("Project setup complete!")}
${chalk.yellow("Thanks for using the CLI!")}
${chalk.cyan("Next steps:")}
${chalk.green("1. Navigate to the project directory:")} ${chalk.bold(targetDir)}
${chalk.green("2. Run the following command to start your project:")} ${chalk.bold(`${packageManager} run dev`)}
${chalk.green("3. Visit http://localhost:3000 in your browser to see your app.")}
${chalk.magenta("Happy coding!")}
    `.trim();

  console.log(
    boxen(message, {
      borderColor: "green",
      padding: 1,
      margin: 1,
      borderStyle: "round",
    }),
  );
}
