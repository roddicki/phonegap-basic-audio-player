
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        // Play audio
        //
        function playAudio(url) {
            // Play the audio file at url
            var my_media = new Media(url,
                // success callback
                function () { console.log("playAudio():Audio Success"); },
                // error callback
                function (err) { console.log("playAudio():Audio Error: " + err); }
            );

            // Play audio
            my_media.play();

            // Pause after 10 seconds
            setTimeout(function () {
                my_media.pause();
            }, 7000);
        }


        //MEDIA PLUGIN FUNCTIONS
        //get the file location path for each device type
        function getPhoneGapPath() {
            var path = "";
            //for testing only
            loc = window.location.pathname;
            path = loc.substr(0,loc.length-10);
            console.log(path);
            //end testing
            
            /* uncomment for build
            window.resolveLocalFileSystemURL(cordova.file.applicationDirectory, 
                function (fileEntry) {
                    path = fileEntry.toURL();
                    console.log(path);
                }, 
                function (e) {
                    console.log("FileSystem Error");
                    console.log(JSON.stringify(e) );
                }
            );
            console.log(path);*/
            return path;
        }

        playAudio(getPhoneGapPath() + "audio/drums.mp3");
    }
};
