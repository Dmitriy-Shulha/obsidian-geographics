import { App, PluginSettingTab, Setting } from 'obsidian';
import type GeographicPlugin from "../main";

export interface ISettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: ISettings = {
	mySetting: 'default'
}

export class GeographicSettingsTab extends PluginSettingTab {
	private plugin: GeographicPlugin;

	constructor(app: App, plugin: GeographicPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
