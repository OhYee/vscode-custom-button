import * as vscode from 'vscode';
import { ConfigurationChangeEvent, env } from 'vscode';

import {
  callButton,
  registeredButtons,
  clearRegisteredButtons,
  initialButtonsFromConfig,
} from './button';
import { ButtonTreeNodeProvider, ButtonItem } from './treeview';
import { Register, configScope } from './utils';

export function activate(context: vscode.ExtensionContext) {
  const register = (...r: Register[]) => context.subscriptions.push(...r);

  const buttonTreeNodeProbider = new ButtonTreeNodeProvider();
  // Register command
  register(
    // for debug
    vscode.commands.registerCommand('custom-button.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from custom-button!');
    }),
    // tree view
    vscode.window.registerTreeDataProvider(
      'buttonTreeNodeProvider',
      buttonTreeNodeProbider
    ),
    // refresh tree view
    vscode.commands.registerCommand('custom-button.refresh', () =>
      buttonTreeNodeProbider.refresh()
    ),
    // call command
    vscode.commands.registerCommand('custom-button.call', (args: any) => {
      console.log(args);
      if (!!args && args instanceof ButtonItem) {
        callButton(args.button);
      }
    })
  );

  // Read button list from configuration file
  initialButtonsFromConfig(register);
  vscode.workspace.onDidChangeConfiguration((e: ConfigurationChangeEvent) => {
    console.log('Configuration changed!');
    if (e.affectsConfiguration(configScope)) {
      initialButtonsFromConfig(register);
      if (!!buttonTreeNodeProbider) {
        buttonTreeNodeProbider.refresh();
      }
    }
  });
}

export function deactivate() {
  registeredButtons.map((b: Register) => b.dispose());
  clearRegisteredButtons();
}
