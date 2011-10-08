var log = function(obj){
	if (window.console) {
		window.console.log(obj);
	}
};
var menu = {
	data: null,
/* I wanted to use some sort of predefined builder here, but then I realised I was thinking in jQuery terms, not JS :)
	builder: {
		label: "<span></span>",
		link: "<a></a>",
		node: "<li></li>",
		submenu: "<menu></menu>"
	},
*/
	get_menu_data: function(){
		// open XHR and load the JSON
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/json/menu.json", false); // Adjust the path here based on your webserver webroot.
		xhr.send(null); // This doesn't work when being run off the file-system.  Not sure if there's a way to correct this since there's a security policy at play here
		if (xhr.status == 200 || xhr.status == 0){
			menu.data = eval("(" + xhr.responseText + ")"); // This will need to be parsed for bad characters, HTML, etc before the eval.
		}
	},
	render_menu: function(){
		var items = menu.data.items;
		var items_len = items.length;
		var nav = document.getElementById("dynanav");
		var html_output = document.createElement("menu");
		html_output.setAttribute('id', "dynamenu");
		nav.appendChild(html_output);
		var nav_menu = document.getElementById("dynamenu");
		for (var i = 0; i < items_len; i++){
			var item_html = document.createElement("li");
			item_html.setAttribute("id", items[i].id);
			if (items[i].href){ // It feels like theres a lot of unnecessary repetition here between anchor and span.
				var anchor = document.createElement("a")
				anchor.setAttribute("href", items[i].href);
				var anchor_text = document.createTextNode(items[i].label);
				anchor.appendChild(anchor_text);
				item_html.appendChild(anchor);
			}else{
				var span = document.createElement("span")
				var span_text = document.createTextNode(items[i].label);
				span.appendChild(span_text);
				item_html.appendChild(span);
			}
			if (items[i].parent){
				var target_parent = document.getElementById(items[i].parent);
				if (!target_parent.getAttribute("class")){
					target_parent.setAttribute("class", "parent");
					var submenu = document.createElement("menu");
					target_parent.appendChild(submenu);
				}
				target_parent.childNodes[1].appendChild(item_html); // Assumes <menu> would always be the second child node - not ideal.
			}else{
				nav_menu.appendChild(item_html);
			}
		}
	},
	init: function(){
		// Set configuration, Get menu data, etc
		menu.get_menu_data();
		if (menu.data){
			menu.render_menu();
		}else{
			log("No menu data");
		}
	}
}

window.load = menu.init();  // Try do this on DOMContentLoaded rather.
