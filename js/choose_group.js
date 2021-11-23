let groups = []
let expenses = []
let copy = []

async function readFirebase (groups){
    let count1 = 0


    const dbRef = firebase.database().ref("groups");
    dbRef.once("value", function(snapshot){
        let data = snapshot.val();
        for (let i in data){
            group_name = data[i].name
            group_viewers = data[i].viewers
            group_members = data[i].members
            group_netAmt = data[i].netAmt
            group_image = data[i].mImageUrl
            groups[count1] = new Group(group_image, group_members, group_name, group_netAmt, group_viewers)
            count1++
        }
    })


}

async function readTransaction(expenses, copy){

    let count = 0
    const dbRef2 = firebase.database().ref("Transaction");
    dbRef2.once("value", function(snapshot) {
         snapshot.forEach(function (childSnapshot) {
             copy.push(childSnapshot.numChildren())
         })
    })

    const dbRef3 = firebase.database().ref("Transaction");
    dbRef3.once("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            let data1 = childSnapshot.val();
            for (let i in data1) {
                expense_amount = data1[i].amount
                expense_date = data1[i].date
                expense_paidBy = data1[i].paidBy
                expense_paidTo = data1[i].paidTo
                expense_title = data1[i].title
                let exp = new Expense(count, expense_paidBy, expense_amount, expense_date, expense_title, "Food", expense_paidTo)
                expenses.push(exp)
                //localStorage.setItem("expenses", JSON.stringify(expenses))
                count += 1
            }
        })
    })
}

function checkGroups(groups, expenses, copy){
    console.log("GROUPS==>", groups)
    let new_expenses = []
    let new_groups = []
    let uploads = []

    //new_expenses = JSON.parse(localStorage.getItem("expenses"))
    //console.log("t1", new_expenses)

    for (let i=0; i < groups[0].length; i++){
        new_groups[i] = groups[0][i]
    }

    for (let i=0; i < groups[1].length; i++){
        new_expenses[i] = groups[1][i]
    }

    copy = groups[2]

    let temp = []
    console.log("t2", new_groups)
    console.log("t3", new_expenses)
    console.log("t4", new_expenses.length)
    
    let j = 0;
    for (let i=0; i < new_groups.length; i++){
        temp = []
        while(j < new_expenses.length){
            if( j == copy[i]){
                break;
            }
            temp.push(new_expenses[j])
            j++;
        }
        upload = new Upload(i, new_groups[i], temp)
        uploads.push(upload)
    }

    console.log("upload", uploads)

    //upl = document.getElementById("uploads")
    //gr = document.getElementById("groups")

    //if(upl)
    //{
        localStorage.setItem("uploads", JSON.stringify(uploads))
    //}
    

    //if(gr){
        localStorage.setItem("groups", JSON.stringify(new_groups))
    //}


    const user = firebase.auth().currentUser;
    name = user.email;
    localStorage.setItem("current_user", JSON.stringify(name))


    let list = document.getElementById("list")
    for(let i=0; i < new_groups.length; i++){
            if(new_groups[i].viewers.includes(name)){
                let li = document.createElement("li")
                li.className = "choose__li"
                let button = document.createElement("button")
                button.className = "choosebutton"
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
readTransaction(expenses, copy)
setTimeout(checkGroups, 2000, [groups, expenses, copy]);
