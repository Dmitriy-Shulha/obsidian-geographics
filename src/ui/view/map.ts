import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_MAP, TRIGGER_MAP_OPEN } from "src/constants";
// import Map from '../component/Map.svelte';
// import Map1 from '../component/Map1.svelte';
import Map3 from '../component/Map3.svelte';

export default class MapView extends ItemView {
    private map: Map3;

    constructor(leaf: WorkspaceLeaf){
        super(leaf)
    }

    getViewType(): string {
        return VIEW_TYPE_MAP;
    }

    getDisplayText(): string {
        return "Geographic Map";
    }

    getIcon(): string {
        return "calendar-with-checkmark";
    }

    onClose(): Promise<void> {
        if (this.map) {
          this.map.$destroy();
        }
        return Promise.resolve();
    }

    async onOpen(): Promise<void> {    
        this.map = new Map3({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          target: (this as any).contentEl,
          props: {},
        });
    }
}