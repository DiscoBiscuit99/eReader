const { ipcRenderer } = require('electron');

ipcRenderer.on('title', (event, title) => {
	document.getElementsByTagName("h1")[1].innerHTML = title;

	$("p").remove();

	let eReader = require('./node_modules/eReader');

	contents = eReader.getTextContent(title);

	contents.forEach((paragraph) => {
		let p = document.createElement("p");
		let textnode = document.createTextNode(paragraph);

		p.appendChild(textnode);

		document.getElementById("body").appendChild(p);
	});

	let p = document.createElement("p");
	let textnode = document.createTextNode("❦");

	p.appendChild(textnode);

	document.getElementById("body").appendChild(p);
});

