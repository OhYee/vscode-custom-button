import * as vscode from 'vscode';
import { Register, configScope, setConfig } from './utils';
import { clearTreeNodes, pushTreeNodes } from './treeview';

export var registeredButtons: Register[] = [];
export function clearRegisteredButtons() {
  registeredButtons = [];
}
export function pushRegisteredButton(button: Register) {
  registeredButtons.push(button);
}

export type Button = {
  name: string;
  command?: string;
  position?: 'statusbar-left' | 'statusbar-right' | string;
  priority?: number;
  icon?: string;
};

export function callButton(button?: Button) {
  if (!!button) {
    if (!!button.command) {
      vscode.commands.executeCommand(button.command);
    }
  }
}

export function initialButtons(
  buttons: Button[],
  register: (r: Register) => any
) {
  registeredButtons.map((b) => b.dispose());
  clearTreeNodes();
  buttons.map((b) => {
    const position = b.position;
    if (!position) {
      return;
    }
    pushTreeNodes(position, b);
  });
  registeredButtons = buttons
    .filter(
      (button) =>
        button.position === 'statusbar-left' ||
        button.position === 'statusbar-right'
    )
    .map((button) => {
      console.log(button);
      const btn = vscode.window.createStatusBarItem(
        button.position === 'statusbar-left'
          ? vscode.StatusBarAlignment.Left
          : vscode.StatusBarAlignment.Right,
        button.priority
      );
      btn.text = button.icon ? `$(${button.icon})` : button.name;
      btn.tooltip = `${button.name}${
        !!btn.command ? `(call ${btn.command})` : ''
      }`;
      btn.command = button.command;
      btn.show();
      return btn;
    })
    .map((button) => {
      register(button);
      return button;
    });
}

export function initialButtonsFromConfig(register: (r: Register) => any) {
  const extSettings = vscode.workspace.getConfiguration(configScope);
  const { direct = false, buttons = [] } = extSettings;
  setConfig({ direct });
  initialButtons(buttons, register);
}
