import * as vscode from 'vscode';
import { Command, ThemeIcon } from 'vscode';

import { Button } from './button';
import { config } from './utils';

export var treeNodes: { [key: string]: Button[] } = {};
export function clearTreeNodes() {
  treeNodes = {};
}
export function pushTreeNodes(categorize: string, button: Button) {
  if (!treeNodes[categorize]) {
    treeNodes[categorize] = [];
  }
  treeNodes[categorize].push(button);
}

export class ButtonTreeNodeProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    vscode.TreeItem | undefined | null | void
  > = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    vscode.TreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
  getChildren(element?: ButtonItem): Thenable<vscode.TreeItem[]> {
    if (!element) {
      return Promise.resolve(
        Object.keys(treeNodes).map(
          (key) =>
            new vscode.TreeItem(key, vscode.TreeItemCollapsibleState.Expanded)
        )
      );
    }
    return Promise.resolve(
      treeNodes[element.label].map(
        (button) =>
          new ButtonItem(
            button.name,
            vscode.TreeItemCollapsibleState.None,
            button
          )
      )
    );
  }

  dispose() {}
}

export class ButtonItem implements vscode.TreeItem {
  label: string;
  collapsibleState: vscode.TreeItemCollapsibleState;
  button?: Button;
  contextValue = 'buttonItem';
  iconPath?: ThemeIcon;
  command?: Command;
  tooltip?: string;
  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    button?: Button
  ) {
    this.label = label;
    this.collapsibleState = collapsibleState;
    this.button = button;
    if (!!button) {
      if (!!button.icon) {
        this.iconPath = new ThemeIcon(button.icon);
      }
      if (!!button.command) {
        this.tooltip = `Call ${
          button.command
        }`;
        if (!!config.direct) {
          this.command = { title: button.name, command: button.command };
        }
      }
    }
  }
}
