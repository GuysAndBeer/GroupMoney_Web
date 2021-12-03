
function joinGroup(){
    group_name_filed = document.getElementById("new_group_input")
    let group_key = group_name_filed.value
    const user = firebase.auth().currentUser;
    name = user.email;
    let viewers = []

    //let current_user = JSON.parse(localStorage.getItem("current_user"))
    //group = new Group("", [], "", [], [])


    firebase.database().ref('groups/').child(group_key).child('viewers').once('value', function(snapshot){
        viewers = snapshot.val()
        console.log("ss", viewers)
        viewers.push(name)
        firebase.database().ref('groups/').child(group_key).update({
            viewers:viewers
        })
    })

    window.location.href = "./choose_group.html"
}