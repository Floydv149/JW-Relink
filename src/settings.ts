import { App, PluginSettingTab, Setting } from 'obsidian';
import JWRelink from './main';

export interface JWRelinkSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: JWRelinkSettings = {
	mySetting: 'default',
};

export class SettingTab extends PluginSettingTab {
	plugin: JWRelink;

	constructor(app: App, plugin: JWRelink) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
	}
}
