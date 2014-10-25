var username;
var password;
chrome.storage.sync.get({
  username: '',
  password: ''
}, function(items) {
   	username = items.username;
	password = items.password;
});
function addAnime(info, tab) {	
	var oReq = new XMLHttpRequest();
			
	oReq.onload = function(){
		var domParser = new DOMParser();
		var dom = domParser.parseFromString(this.responseText, 'text/xml');
		var animes = [];
		for(var i = 0; i < dom.firstChild.childNodes.length; i++) {
			var entry = dom.firstChild.childNodes[i];
			if(entry.tagName=='entry') {
				var anime = {};
				for(var j = 0; j < entry.childNodes.length; j++){
					var child = entry.childNodes[j];
					switch(child.tagName){
						case "image":
							anime.image = child.innerHTML;
							break;
						case "title":
							anime.title = child.innerHTML;
						break;
						case "id":
							anime.id = child.innerHTML;
						break;
					}
				}
				animes.push(anime);
			}
		}
		// for now just add the first search result to your list
		var req = new XMLHttpRequest();
		req.onload = function() {
			console.log(this.responseText);
		};
		req.open("get", "http://myanimelist.net/api/animelist/add/"+animes[0].id+".xml", true, username, password);
		req.send();			
	};

	oReq.open("get", "http://myanimelist.net/api/anime/search.xml?q="+encodeURIComponent(info['selectionText']), true, username, password);
	oReq.send();
}

chrome.contextMenus.create({
	"title": "Add Anime to MAL",
	"contexts": ["selection"],
	"onclick": addAnime
});
