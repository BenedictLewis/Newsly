if(window.localStorage.getItem("first_run")==null){
	alert("This appears to be the first time you have used Newsly. Please wait a second for us to set everything up.")
	window.localStorage.setItem("initialLoad", "10");
	window.localStorage.setItem("loadMore", "10");
	window.localStorage.setItem("RSS", "http://feeds.bbci.co.uk/news/rss.xml");
    window.localStorage.setItem("feed", "");
	window.localStorage.setItem("first_run", "true");
	alert("Everything went as planned. You should not see these messages again. Thanks for using Newsly.");
}