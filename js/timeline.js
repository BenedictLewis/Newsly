$('#msg').html("Updating articles... Please wait."); // Set update message
$('#msg').show(); // Show the update message
/* Variables */
    var initialLoad = window.localStorage.getItem("initialLoad"); // The number of news items to fetch by default
    var loadMore = window.localStorage.getItem("loadMore"); // The number of news items to fetch by default
    var RSS = window.localStorage.getItem("RSS"); // The feed URL
    var feed = window.localStorage.getItem("feed");
    /* End Variables */

    /* Computing Functions */
    function getDate(pubDate) {
        var date = new Date(pubDate);
        var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        var dateString = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return dateString;
    }
    function getTime(pubDate) {
        var date = new Date(pubDate);
        var time = date.getHours()+":"+date.getMinutes();
        return time;
    }
    function appendToStorage(name, data){
        var old = window.localStorage.getItem(name);
        if(old === null) old = "";
        window.localStorage.setItem(name, old + data);
    }
    /* End Computing Functions */

    /* Click Functions */
      /* loadMore - Load more news articles into timeline */
      $('#loadMore').click(function() {
          $(this).button('loading'); // Change button state to loading
          initialLoad = parseInt(initialLoad);
          loadMore = parseInt(loadMore);
          initialLoad = initialLoad + loadMore; // Increase news items to fetch
          getNews(); // Return the number of news items
          $(this).button('reset'); // Reset button state
      });
      /* End loadMore */

      /* linkClick - Change all links with _blank to _system so they open in Safari */
      $(document).on('click', 'a[target="_blank"]', function(ev) {
        var url;
        ev.preventDefault();
        url = $(this).attr('href');
        window.open(url, '_system');
      });
      /* End linkClick */
    /* End Click Functions */
    /* getNews - Fetch the news using jGFeed and parse into timeline */
    document.addEventListener("deviceready", getNews, false);
    function getNews() {
        $.jGFeed(RSS,
          function(feeds){
            // Check for errors
            if(!feeds){
              $('#newsTimeline').html(feed); // Set the timeline to the offline feed
              return false;
            }
            $('#newsTimeline').empty(); // Clear the timeline
            window.localStorage.setItem("feed", ""); // Clear the local storage
            for(var i=0; i<feeds.entries.length; i++){
                var entry = feeds.entries[i]; // Create an array for the current entry
                var title = entry.title; // Set the title
                var description = entry.contentSnippet; // Set the description
                var date = getDate(entry.publishedDate); // Set the date
                var time = getTime(entry.publishedDate); // Set the time
                var link = entry.link; // Gets the full link
                var fullArticle = '<li><time class="cbp_tmtime" datetime="'+date+' '+time+'"><span>'+date+'</span> <span>'+time+'</span></time><div class="cbp_tmicon cbp_tmicon-earth"></div><div class="cbp_tmlabel"><h2><a href="'+link+'" target="_blank">'+title+'</a></h2><p>'+description+'</p></div></li>'; // Create the full article
                $('#newsTimeline').append(fullArticle); // Append the full article to the timeline
                appendToStorage("feed", fullArticle); // Append the article to the localstorage
            }
            $('#msg').hide(); // Hide the update message
        }, initialLoad);
    }
    /* End getNews */