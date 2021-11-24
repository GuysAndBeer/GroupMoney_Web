
function createNewGroup(){
    group_name_filed = document.getElementById("new_group_input")
    group_name = group_name_filed.value
    const user = firebase.auth().currentUser;
    name = user.email;

    //let current_user = JSON.parse(localStorage.getItem("current_user"))
    //group = new Group("", [], "", [], [])


    var key_group = firebase.database().ref('groups/').push().key
    firebase.database().ref('groups/').child(key_group).set({
        mImageUrl: "https://firebasestorage.googleapis.com/v0/b/splitwiseclone-a0e44.appspot.com/o/uploads%2F-ModeebCI04nu24ZsyLY.jpg?alt=media&token=4aa0cf6a-36d3-41d3-940c-a5c9716e99b0",
        members: [],
        name: group_name,
        netAmt: [],
        viewers: [name],
        autoid: key_group
    })


    window.location.href = "./choose_group.html"
}