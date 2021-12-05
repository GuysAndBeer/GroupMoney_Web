
function joinGroup(){
    group_name_filed = document.getElementById("new_group_input")
    let group_key = group_name_filed.value
    const user = firebase.auth().currentUser;

    email = user.email;
    name = user.displayName;
    let viewers = []
    let members = []
    let netAmt = []


    //let current_user = JSON.parse(localStorage.getItem("current_user"))
    //group = new Group("", [], "", [], [])


    firebase.database().ref('groups/').child(group_key).child('members').once('value', function(snapshot){
        members = snapshot.val()
        console.log("ss", members)
        members.push(name)
        firebase.database().ref('groups/').child(group_key).update({
            members: members
        })
    })

    firebase.database().ref('groups/').child(group_key).child('netAmt').once('value', function(snapshot){
        netAmt = snapshot.val()
        console.log("ss", netAmt)
        netAmt.push(0)
        firebase.database().ref('groups/').child(group_key).update({
            netAmt: netAmt
        })
    })


    firebase.database().ref('groups/').child(group_key).child('viewers').once('value', function(snapshot){
        viewers = snapshot.val()
        console.log("ss", viewers)

        viewers.push(email)
        firebase.database().ref('groups/').child(group_key).update({
            viewers: viewers
        })
        window.location.href = "./choose_group.html"
    })



}