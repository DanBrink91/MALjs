// auth section
var authDiv = document.getElementById("auth");
var usernameField = document.getElementById("username");
var passwordField = document.getElementById("password");
var loginButton = document.getElementById("login");

var searchDiv = document.getElementById("search");
var searchButton = document.getElementById("searchButton");
var searchResults = document.getElementById("searchResults");

var optionsDiv = document.getElementById("addOptions");

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
	usernameField.value = msg.response;
	if(msg.response){
		authDiv.style.display = "none";
		searchDiv.style.display = "block";
	}

});

loginButton.addEventListener("click", function loginUser(e){
		chrome.tabs.query({active:true, currentWindow:true}, function(tabs){		
			chrome.tabs.sendMessage(tabs[0].id, {"user": usernameField.value, "password":passwordField.value},
			 function(response){
			 	// do nothing
			});
		});
});

// searchButton.addEventListener("click", function searchAnime(e){
	// chrome.tabs.query({active:true, currentWindow:true}, function(tabs){		
	// 	chrome.tabs.sendMessage(tabs[0].id, {"search":true}, function(response){
	// 		if(response.success){
	// 			for(var i = 0, length = response.results.length; i < length; i++){
	// 				searchResults.innerHTML += "<a href='' class='animeLink' data-id='"+response.results[i].id+
	// 				"'>" + response.results[i].name + "</a>";
	// 			}
	// 		}
	// 	});
	// });
// });