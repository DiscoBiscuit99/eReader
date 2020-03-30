const { app, ipcMain, globalShortcut, BrowserWindow } = require('electron');

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 1000,
		minWidth: 500,
		minHeight: 500,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadFile('index.html');

	//win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('ready', () => {
	const quit = globalShortcut.register('CommandOrControl+Q', () => {
		win.close();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('will-quit', () => {
	globalShortcut.unregister('CommandOrControl+Q');
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipcMain.on('update-title', (event, message) => {
	win.webContents.on('did-finish-load', () => {
		win.webContents.send('title', message);
	});
});

