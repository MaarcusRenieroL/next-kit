import chalk from "chalk";
import boxen from "boxen";
import { PackageManager } from "@/types/global.js";
import figlet from "figlet";

export function printIntroMessage() {
  const headerText = figlet.textSync("next-kit", {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  });

  const message = `
${chalk.yellow(headerText)}

${chalk.yellow.bold("🚀 Welcome to Nextkit v0.1.0 🚀")}
Set up Next.js apps in a flash ${chalk.cyan("⚡")}

${chalk.magenta("💡 Features:")}
  - ${chalk.green("Authentication")} 🔒
  - ${chalk.green("Database & ORM")} 🛢️
  - ${chalk.green("API Building")} 🛠️
  - ${chalk.green("Analytics")} 📊
  - ${chalk.green("Email Providers")} ✉️
  - ${chalk.green("Payments")} 💳

${chalk.dim("This tool is a work in progress... stay tuned for updates!")}
${chalk.blue("Developed by: Maarcus Reniero L, Akash Layal").trim()}

`;

  console.log(message);
}

export function exit() {
  console.log("Thank you for using Nextkit");
  process.exit(0);
}

export function printSuccessMessage(packageManager: PackageManager, targetDir: string) {
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
    })
  );
}
