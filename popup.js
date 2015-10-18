var username = '';
var password = '';
chrome.storage.sync.get({
  username: '',
  password: ''
}, function(items) {
   	username = items.username;
	password = items.password;
});

function findAnime(info, tab) 
{	
	var oReq = new XMLHttpRequest();
			
	oReq.onload = function(){
		var animes = [];
		var domParser = new DOMParser();
		var dom = domParser.parseFromString(this.responseText, 'text/xml');
		for(var i = 0; i < dom.firstChild.childNodes.length; i++) {
			var entry = dom.firstChild.childNodes[i];
			if(entry.tagName=='entry') {
				var anime = {};
				for(var j = 0; j < entry.childNodes.length; j++){
					var child = entry.childNodes[j];
					if(child.tagName)
					{
						anime[child.tagName] = child.innerHTML;
					}
				}
				animes.push(anime);
			}
		}
		console.log(animes);
		// for now just add the first search result to your list
		addAnime(animes[0]);		
	};

	oReq.onerror = function(e) {
		console.log(e);
	};	
	oReq.open("get", "http://myanimelist.net/api/anime/search.xml?q="+encodeURIComponent(info['selectionText']), true, username, password);
	oReq.send();
}

function addAnime(anime)
{
	var req = new XMLHttpRequest();
	//req.withCredentials = true;
	req.onload = function() {
		console.log(this);
	};
	req.onerror = function(e){
		console.log(e);
	};
	req.open("get", "http://myanimelist.net/api/animelist/add/"+anime.id+".xml", true, username, password);
	var data = '<?xml version="1.0" encoding="UTF-8"?><entry><episode>1</episode><status>1</status><score>7</score><downloaded_episodes></downloaded_episodes><storage_type></storage_type><storage_value></storage_value><times_rewatched></times_rewatched><rewatch_value></rewatch_value><date_start></date_start><date_finish></date_finish><priority></priority><enable_discussion></enable_discussion><enable_rewatching></enable_rewatching><comments></comments><fansub_group></fansub_group><tags>test tag, 2nd tag</tags></entry>';
	req.send("id="+anime.id+"&data=" + encodeURIComponent(data));
}
chrome.contextMenus.create({
	"title": "Add Anime to MAL",
	"contexts": ["selection"],
	"onclick": findAnime
});
