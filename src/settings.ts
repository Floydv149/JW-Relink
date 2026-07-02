import { App, PluginSettingTab, Setting } from 'obsidian';
import JWRelink from './main';

export interface JWRelinkSettings {
	removeAllParams: boolean;
}

export const DEFAULT_SETTINGS: JWRelinkSettings = {
	removeAllParams: false,
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

		new Setting(containerEl)
			.setName('Remove unnecessary parameters from URL')
			.setDesc('! Does not work with Windows !')
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.removeAllParams)
					.onChange(async (value) => {
						this.plugin.settings.removeAllParams = value;
						await this.plugin.saveData(this.plugin.settings);
					}),
			);
	}
}
