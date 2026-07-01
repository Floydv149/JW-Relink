import { Editor, MarkdownView, Plugin, Notice } from 'obsidian';
// import { DEFAULT_SETTINGS, JWRelinkSettings, SettingTab } from './settings';

// Remember to rename these classes and interfaces!

export default class JWRelink extends Plugin {
	// settings!: JWRelinkSettings;

	async onload() {
		// await this.loadSettings();

		// This creates an icon in the left ribbon.
		this.addRibbonIcon(
			'square-arrow-out-up-right',
			'Transform link',
			(_evt: MouseEvent) => {
				// 1. Get the active view from the workspace
				const activeView =
					this.app.workspace.getActiveViewOfType(MarkdownView);

				// 2. Verify an editor is actually open and focused
				if (activeView && activeView.editor) {
					transformJWORGLinkToJWLibraryLink(activeView.editor);
				} else {
					new Notice('Please open a Markdown file first!');
				}
			},
		);

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'transform-link',
			name: 'Transform link',
			editorCallback: (editor: Editor) => {
				transformJWORGLinkToJWLibraryLink(editor);
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SettingTab(this.app, this));

		const transformJWORGLinkToJWLibraryLink = (editor: Editor) => {
			const input = editor.getSelection();
			const output = transformLink(input);
			editor.replaceSelection(output);
		};

		const transformLink = (input: string) => {
			let output: string = input.toString();

			output = output.replaceAll('https://www.jw.org/', 'jwlibrary:///');
			// output = output.replaceAll('srcid=jwlshare&', '');
			// output = output.replaceAll('prefer=lang&', '');
			// output = output.replaceAll('&srctype=wol&srcid=share', '');
			// output = output.replaceAll('wtlocale=O&', '');
			// output = output.replaceAll('&pub=nwtsty', '');

			return output;
		};
	}

	onunload() {}

	// async loadSettings() {
	// 	this.settings = Object.assign(
	// 		{},
	// 		DEFAULT_SETTINGS,
	// 		(await this.loadData()) as Partial<JWRelinkSettings>,
	// 	);
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}
