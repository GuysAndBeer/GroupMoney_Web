let groups = []

async function readFirebase (groups){
    var count = 0
    const dbRef = firebase.database().ref("groups");
    dbRef.once("value", function(snapshot){
        var data
        data = snapshot.val();
        for (let i in data){
            group_name = data[i].name
            group_viewers = data[i].viewers
            group_members = data[i].members
            group_netAmt = data[i].netAmt
            group_image = data[i].mImageUrl
            groups[count] = new Group(group_image, group_members, group_name, group_netAmt, group_viewers)
            count++
        }
    })

}

function checkGroups(groups){
    console.log("GROUPS==>", groups)

    let new_groups = []
    for (let i=0; i < groups[0].length; i++){
        new_groups[i] = groups[0][i]
    }
    localStorage.setItem("groups", JSON.stringify(new_groups))

    const user = firebase.auth().currentUser;
    name = user.email;
    localStorage.setItem("current_user", JSON.stringify(name))


    let list = document.getElementById("list")
    for(let i=0; i < new_groups.length; i++){
            if(new_groups[i].viewers.includes(name)){
                let li = document.createElement("li")
                li.className = "choose__li"
                let button = document.createElement("button")
                button.className = "choose__button"
                button.setAttribute("id", i + "_group")
                button.setAttribute("onClick", "selectGroup(this.id)")
                button.textContent = new_groups[i].name
                li.appendChild(button)
                list.appendChild(li)
            }
    }
}

function selectGroup(index){
    ind = parseInt(index[0])
    localStorage.setItem("group_id", JSON.stringify(ind))
    window.location.href = './main.html'
}


readFirebase(groups)
setTimeout(checkGroups, 2000, [groups]);

