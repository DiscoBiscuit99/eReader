const { ipcRenderer } = require('electron');

let eReader = require('./node_modules/eReader');

let filenames = eReader.getFilenames();

filenames.forEach((title) => {
	let li = document.createElement("li");
	let a = document.createElement("a");
	let textnode = document.createTextNode(title);

	a.appendChild(textnode);
	a.href = "text.html";
	a.id = title;

	a.addEventListener('click', () => {
		ipcRenderer.send('update-title', a.id);
	});
	
	li.appendChild(a);

	document.getElementById("texts-list").appendChild(li);
});

