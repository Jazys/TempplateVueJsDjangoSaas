if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: "./"})
    .then((reg) => {
      // registration worked
      console.log('registration worked');
    }).catch((error) => {
      // registration failed
      console.log('Error : ' + error);
    });
  }
else
{
  console.warn("Unable to load service, is HTTPS works ?")
}



window.onload = function(e){ 
    console.log("window.onload"); 
}