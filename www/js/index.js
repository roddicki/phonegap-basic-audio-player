
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
        //playAudio("audio/drums.mp3");
        getDevicePath("audio/drums.mp3");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);   
    }
};

// Play audio
function playAudio(url) {
    /*console.log(path);
    var url = getDevicePath(path);*/
    console.log(url);
    var my_media = new Media(url,
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) { console.log("playAudio():Audio Error: " + JSON.stringify(err)); }
    );

    // Play audio
    my_media.play();

    // Pause after 10 seconds
    setTimeout(function () {
        my_media.pause();
    }, 7000);
}

/*file paths

=android=
entry produces
{"isFile":false,"isDirectory":true,"name":"","fullPath":"/","filesystem":"<FileSystem: assets>","nativeURL":"file:///android_asset/"}

entry.toURL()
file:///android_asset/www/audio/drums.mp3 //works on build if hardcoded

entry.toInternalURL()
cdvfile://localhost/asset/www/audio/drums.mp3

=ios=
entry produces
{"isFile":false,"isDirectory":true,"name":"","fullPath":"/","filesystem":"<FileSystem: bundle>","nativeURL":"file:///var/containers/Bundle/Application/C28EF4A2-6EED-4E5A-999F-E05CCAF1F587/PhoneGap.app/"}

entry.toInternalURL()
cdvfile://localhost/bundle/www/audio/drums.mp3 //works on build if hardcoded

entry.toURL()
file:///var/containers/Bundle/Application/C28EF4A2-6EED-4E5A-999F-E05CCAF1F587/PhoneGap.app/
*/

function getDevicePath(url) {
    var platform = device.platform;
    platform = platform.toLowerCase();
    //console.log(cordova.file.applicationDirectory);
    if (platform == "ios") {
        //console.log('yes is android');
        var internalUrl = "cdvfile://localhost/bundle/";
        playAudio(internalUrl + "www/" + url);
        /*resolveLocalFileSystemURL(cordova.file.applicationDirectory, function(entry){
            console.log(JSON.stringify(entry) );
            var NativeUrl = entry.toURL();
            console.log('Native URI for: ' + platform + " is " + NativeUrl);
            //playAudio(NativeUrl + "www/" + url);
        });*/
    } else if (platform == "ios") {
        var internalUrl = "cdvfile://localhost/asset/";
        playAudio(internalUrl + "www/" + url);
    };
    //console.log(NativeUrl);
    //return url;
}


