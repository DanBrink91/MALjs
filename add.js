chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
	console.log("content script:", msg);
	
	// Trying to login
	if(msg.user){
		console.log("user auth");
		var oReq = new XMLHttpRequest();
		
		oReq.onload = function(){
			chrome.runtime.sendMessage({response:this.responseText, success:true}, function(response) {
			  // do nothing
			});
			console.log("api:", this.responseText);
		};
		// Needs username/password...
		//  
		// http://myanimelist.net/api/anime/search.xml?q="+encodeURIComponent(title)
		oReq.open("get", "http://myanimelist.net/api/account/verify_credentials.xml", true, msg.user, msg.password);
		oReq.send();
	}
	// Searching for animes
	else if(msg.search){
		text = window.getSelection().toString();	
		var oReq = new XMLHttpRequest();
		
		oReq.onload = function(){
			// parse out the xml returned from this.responseText
			// convert to json and return it
			chrome.runtime.sendMessage({response:this.responseText, success:true}, function(response) {
				// do nothing
			});
			console.log("api:", this.responseText);
		};
		oReq.open("get", "http://myanimelist.net/api/anime/search.xml?q="+encodeURIComponent(title), true, msg.user, msg.password);
		oReq.send();
	}
	// TODO other conditionals to add to MAL list after anime is selected from search results
	
	
	// sendResponse({response:"ok", success:true});
	// chrome.runtime.sendMessage({text: text}, function(response) {
	//   console.log(response);
	// });
});
