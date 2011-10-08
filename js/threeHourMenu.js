var menu = {
	data: null,
	get_menu_data: function(){
		// open XHR and load the JSON
		console.log("menu.get_menu_data called");
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "../json/menu.json", false);
		xhr.send(null);
		menu.data = eval("(" + xhr.responseText + ")"); // This will need to be parsed for bad characters, HTML, etc.
	},
	init: function(){
		// Set configuration, Get menu data, etc
		console.log("menu.init called");
		menu.get_menu_data();
		console.log(menu.data);
	}
	
}

window.load = menu.init();  // Try do this on DOMContentLoaded rather.
