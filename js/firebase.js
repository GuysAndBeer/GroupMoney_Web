var config = {
    apiKey: "AIzaSyBNd-cM1-wKyz7dIdYGNYUNi4raxNznJK0",
    authDomain: "splitwiseclone-a0e44.firebaseapp.com",
    projectId: "splitwiseclone-a0e44",
    databaseURL: "https://splitwiseclone-a0e44-default-rtdb.firebaseio.com",
    storageBucket: "splitwiseclone-a0e44.appspot.com",
    messagingSenderId: "65747276860",
    appId: "1:65747276860:web:b6e15a00be6c5bdfe9df39"
};

var hasInit = false;

if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
}