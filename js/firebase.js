var app_firebase = {};

(function() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCrNfN8Ilh3QWBOLkOM2KZQHV3hWvPSPAU",
        authDomain: "copykats-d5227.firebaseapp.com",
        databaseURL: "https://copykats-d5227.firebaseio.com",
        projectId: "copykats-d5227",
        storageBucket: "copykats-d5227.appspot.com",
        messagingSenderId: "78687619521",
        appId: "1:78687619521:web:9448fd3d25ff49e0988740"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      app_firebase = firebase;
})()