export type TerminalCommand = (args: string[], termControl: TermControl) => string[];

export interface TermControl {
    clearTerm: () => void;
    exitTerm: () => void;
}

export function executeCommand(input: string, termControl: TermControl): string[] {
    const { command, args } = input.trimStart().split(' ').reduce((acc, val, index) => {
        if (index === 0) {
            acc.command = val;
        } else {
            acc.args.push(val);
        }
        return acc;
    }, { command: '', args: [] as string[] });

    const commandFunc = CommandMap[command];
    if (commandFunc) {
        return commandFunc(args, termControl);
    }

    return [
        `Error: Command not found: '${command}'`,
    ];
}

export const CommandMap: Record<string, TerminalCommand> = {
    help: (_args, _termControl) => {
        return Object.keys(CommandMap).map(command => ` - ${command}`);
    },

    exit: (_args, termControl) => {
        termControl.exitTerm();
        return [
            `--- Session terminated ${new Date().toUTCString()} ---`,
        ];
    },
    
};