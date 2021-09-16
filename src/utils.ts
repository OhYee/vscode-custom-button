import { env } from 'vscode';

export type Register = { dispose(): any };
export const configScope = 'custom-button';
export var config: Config = {};
export function setConfig(value: Config) {
  config = { ...config, ...value };
}
export type Config = {
  direct?: boolean;
};
