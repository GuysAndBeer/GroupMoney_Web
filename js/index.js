function logout (){
    firebase.auth().signOut().then(() => {
        console.log("Sign-out successful")
    }).catch((error) => {
        // An error happened.
    });
    localStorage.clear()
}

logout()