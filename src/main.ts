import {Notice, Plugin, TFile, WorkspaceLeaf} from 'obsidian';
import MapView from './ui/view/map';
import { VIEW_TYPE_MAP } from './utils/constants';
import { GeographicSettingsTab, ISettings, DEFAULT_SETTINGS } from './app/settings';
import { GeographicModal } from './ui/modal';

export default class GeographicPlugin extends Plugin {
	settings: ISettings;
	private view: MapView;

	async onLayoutReady() {
		console.log("getFiles()");
		console.log(this.app.vault.getFiles());
		const file = this.app.vault.getAbstractFileByPath('temp/topojson.md') as TFile;
		console.log(await this.app.vault.read(file))
	}

	async onload() {
		console.log('loading plugin');
		console.log(this.app);
		console.log(this.app.vault)
		// console.log(this.app.vault.getRoot())
		// console.log(this.app.vault.getFiles)
		console.log(this.app.vault.getFiles())
		console.log(this.app.vault.getAllLoadedFiles())
		// console.log(this.app.vault.getName())
		// console.log(this.app.vault.read)
		// console.log(this.app.vault.getAbstractFileByPath('topojson.md'))

		this.onLayoutReady = this.onLayoutReady.bind(this);

		this.registerEvent(this.app.workspace.on("layout-ready", this.onLayoutReady))


		await this.loadSettings();

		this.addRibbonIcon('dice', 'Geographic Plugin', () => {
			new Notice('This is a notice!');
		});

		this.addStatusBarItem().setText('Status Bar Text');

		this.registerView(
			VIEW_TYPE_MAP,
			(leaf: WorkspaceLeaf) => (this.view = new MapView(leaf))
		);

		this.addCommand({
			id: "show-geographic-view",
			name: "Open view",
			checkCallback: (checking: boolean) => {
			  if (checking) {
				return (
				  this.app.workspace.getLeavesOfType(VIEW_TYPE_MAP).length === 0
				);
			  }
			  this.initLeaf();
			},
		  });

		this.addCommand({
			id: 'open-geographic-modal',
			name: 'Open Geographic Modal is it changing',
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

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log('unloading plugin');
	}

	initLeaf(): void {
		
		if (this.app.workspace.getLeavesOfType(VIEW_TYPE_MAP).length) {
		  return;
		}
		this.app.workspace.getLeaf(false).setViewState({
		  type: VIEW_TYPE_MAP,
		});
	  }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS as any, await this.loadData());
	}

	async saveSettings() {
		console.log(this.settings)
		await this.saveData(this.settings);
	}
}