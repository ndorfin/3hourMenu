var menu = {
	get_menu_data: function(){
		// open XHR and load the JSON
		console.log("menu.get_menu_data called");
	},
	init: function(){
		// Set configuration, Get menu data, etc
		console.log("menu.init called");
	}
	
}

window.load = menu.init();  // Try do this on DOMContentLoaded rather.
