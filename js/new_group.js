
function createNewGroup(){
    group_name_filed = document.getElementById("new_group_input")
    group_name = group_name_filed.value
    //const user = firebase.auth().currentUser;
    //name = user.email;
    //console.log("name", name)
    let current_user = JSON.parse(localStorage.getItem("current_user"))
    group = new Group("", [current_user], group_name, [0], [current_user])

    firebase.database().ref('groups/').push(group)
    window.location.href = "./choose_group.html"
}