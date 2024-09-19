import chalk from "chalk";

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