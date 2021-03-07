import { Notice, Plugin } from 'obsidian';
import { GeographicSettingsTab, ISettings, DEFAULT_SETTINGS } from './settings';
import { GeographicModal } from './ui/modal';

export default class GeographicPlugin extends Plugin {
	settings: ISettings;

	async onload() {
		console.log('loading plugin');

		await this.loadSettings();

		this.addRibbonIcon('dice', 'Geographic Plugin', () => {
			new Notice('This is a notice!');
		});

		this.addStatusBarItem().setText('Status Bar Text');

		this.addCommand({
			id: 'open-geographic-modal',
			name: 'Open Geographic Modal',
			callback: () => {
				console.log('Geographic Callback');
			},
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						new GeographicModal(this.app).open();
					}
					return true;
				}
				return false;
			}
		});

		this.addSettingTab(new GeographicSettingsTab(this.app, this));

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}