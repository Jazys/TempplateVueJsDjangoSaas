
const CACHE_VERSION = '0.0.5';
const CACHE_NAME = 'version_build: '+CACHE_VERSION;
const CHANNEL_NOTIF="channel_notif_worker";

var urlsToCache = [
  '/index.html',
   'index.js',
];

//Install App
self.addEventListener('install', function(event) {
  console.log('Log from event "INSTALL" in service worker version ' + CACHE_NAME);
  sendMsg2Client({ version: CACHE_NAME });
  // Perform install steps
  event.waitUntil( 
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');   
        cache.addAll(urlsToCache); 
      })
      .then(() => self.skipWaiting())
  );

}); 


//Enable App
self.addEventListener('activate', function(event) {
  console.log('Log from event "activate" in service worker version ' + CACHE_NAME);
  
  var cacheWhitelist = [CACHE_NAME]; 
  event.waitUntil(   
    // Check de toutes les clés de cache.
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        //suppression du cache si nouvelles version
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Delete cache');
            caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim(), sendMsg2Client({ version: CACHE_NAME }), sendMsg2Client({ new_version: '' }))
  );

});

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

});

//Permet de notifier l'app vue avec la version du site
function sendMsg2Client(oMsg) {
  setTimeout(() => {
    const oChannel = new BroadcastChannel(CHANNEL_NOTIF);
    oChannel.postMessage(oMsg);    
    oChannel.close();
  }, 10000);
}


self.addEventListener('message', event => {});
