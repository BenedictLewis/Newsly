if(window.localStorage.getItem("first_run")==null){
	window.localStorage.setItem("initialLoad", "10");
	window.localStorage.setItem("loadMore", "10");
	window.localStorage.setItem("RSS", "http://feeds.bbci.co.uk/news/rss.xml");
	window.localStorage.setItem("first_run", "true");
	$("#settingsRender").append("Settings Created...<br />");
	alert("Everything went as planned. You should not see this page again. Thanks for using Newsly.");
}