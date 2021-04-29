import { Notice, Plugin, WorkspaceLeaf } from 'obsidian';
import MapView from './ui/view/map';
import { VIEW_TYPE_MAP } from './constants';
import { GeographicSettingsTab, ISettings, DEFAULT_SETTINGS } from './settings';
import { GeographicModal } from './ui/modal';

export default class GeographicPlugin extends Plugin {
	settings: ISettings;
	private view: MapView;

	async onload() {
		console.log('loading plugin');

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

	initLeaf(): void {
		
		if (this.app.workspace.getLeavesOfType(VIEW_TYPE_MAP).length) {
		  return;
		}
		this.app.workspace.getLeaf(false).setViewState({
		  type: VIEW_TYPE_MAP,
		});
	  }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}