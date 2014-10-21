//They are using angular, which is calling in the tiles
//Wait until card__title exists on the page
var target = document.querySelector(".chart-wrap");

//observer instance
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if(mutation.type == 'childList' && mutation.addedNodes.length  > 0) {
			title = mutation.addedNodes[0];
			if(title.classList && title.classList.contains("card")) {
				console.log(title.querySelector(".card__title a").text);
				title.querySelector(".card__title").innerHTML += '<br /><a href="#" class="add__anime">Add to MAL</a>';
			}
		}
	});

	// Add event handler for every link we add
	var addLinks = document.querySelectorAll(".add__anime");
	for(var i = 0, length = addLinks.length; i < length; i++) {
		addLinks[i].addEventListener("click", function(e) {
			e.preventDefault();
			var title = this.parentNode.querySelector(".ng-binding").innerHTML;
			var oReq = new XMLHttpRequest();
			oReq.onload = function(){
				alert(this.responseText);
			};
			// Needs username/password...
			oReq.open("get", "http://myanimelist.net/api/anime/search.xml?q="+encodeURIComponent(title), true);
			oReq.send();
		});
	}
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

 // pass in the target node, as well as the observer options
 observer.observe(target, config);

 // later, you can stop observing
 // observer.disconnect();
