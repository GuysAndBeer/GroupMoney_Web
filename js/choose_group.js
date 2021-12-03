let groups = []

async function readFirebase (groups){
    let count1 = 0

    const dbRef = firebase.database().ref("groups");
    dbRef.once("value").then(function(snapshot) {
        let data = snapshot.val();
        for (let i in data){
                group_name = data[i].name
                group_viewers = data[i].viewers
                group_members = data[i].members
                group_netAmt = data[i].netAmt
                group_image = data[i].mImageUrl
                group_key = data[i].autoid
                groups[count1] = new Group(group_image, group_members, group_name, group_netAmt, group_viewers, group_key)
                count1++
        }
    })

}


function checkGroups(groups, user_group){
    console.log("GROUPS==>", groups)
    let new_groups = []
    let count = 0

    const user = firebase.auth().currentUser;
    name = user.email;

    for (let i=0; i < groups.length; i++){
        if(groups[i].viewers.includes(name)) {
            new_groups[count] = groups[i]
            count++
        }
    }
    localStorage.setItem("count_groups", JSON.stringify(count))
    console.log("NEW_GROUPS==>", new_groups)



    let list = document.getElementById("list")
    for(let i=0; i < new_groups.length; i++){
                let li = document.createElement("li")
                li.className = "choose__li"
                let button = document.createElement("button")
                button.className = "choosebutton"
                button.setAttribute("id", new_groups[i].key_group)
                button.setAttribute("onClick", "selectGroup(this.id)")
                button.textContent = new_groups[i].name
                li.appendChild(button)
                list.appendChild(li)
    }
}

function selectGroup(index){
    for(let i=0; i<groups.length; i++){
        if(groups[i].key_group == index){
            localStorage.setItem("group_name", JSON.stringify(groups[i].name))
        }
    }

    localStorage.setItem("group_id", JSON.stringify(index))
    window.location.href = './main.html'
}


function auth(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        } else {
            window.location.href = "./index.html"
        }
    });
}

//localStorage.clear()
auth()
readFirebase(groups)
setTimeout(checkGroups, 2000, groups);
