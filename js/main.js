function auth(){
    let current_name
    let current_email
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            current_name = user.displayName
            current_email = user.email

            let nav = document.getElementById("authorisation")
            let user_dashboard = document.getElementById("user_dashboard")
            let budget_dashboard = document.getElementById("budget_dashboard")
            let budget_income_field = document.getElementById("budget_income")
            let budget_expenses_field = document.getElementById("budget_expenses")



            let count_groups = JSON.parse(localStorage.getItem("count_groups"))
            let group_name = JSON.parse(localStorage.getItem("group_name"))

            if(!current_email){
                let a = document.createElement("a")
                a.textContent = "Sign In"
                a.href = "login.html"
                a.className = "nav__link"
                nav.appendChild(a)
                window.location.href = "./index.html"
            }else {
                budget_income_field.textContent = count_groups
                budget_expenses_field.textContent = group_name
                // budget_expenses_count.textContent = expenses_count
                user_dashboard.textContent = current_name
                let a = document.createElement("a")
                a.textContent = current_email
                a.className = "nav__link"
                nav.appendChild(a)
                a = document.createElement("a")
                a.textContent = "Log out"
                a.href = "index.html"
                a.className = "nav__link"
                a.onclick = logout
                nav.appendChild(a)
            }

        } else {
            window.location.href = "./index.html"
        }
    });
}

function logout(){
    localStorage.setItem("current_user", JSON.stringify("none"));
}


let group = []
function readCurrentGroup(group){
    let current_group = JSON.parse(localStorage.getItem("group_id"))

    const dbRef = firebase.database().ref("groups/").child(current_group);
    dbRef.once("value").then(function(snapshot) {
        let data = snapshot.val();
        group[0] = new Group(data.mImageUrl, data.members, data.name, data.netAmt, data.viewers, data.autoid)
    })
}
let expenses = []
function readCurrentTransactions(expenses){
    let current_group = JSON.parse(localStorage.getItem("group_id"))
    let count = 0
    const dbRef = firebase.database().ref("Transaction/").child(current_group);
    dbRef.once("value").then(function(snapshot) {
        let data = snapshot.val();
        for(let i in data) {
            expenses[count] = new Expense(data[i].who_paid, data[i].amount, data[i].concept, data[i].category, data[i].users, data[i].key)
            count++
        }
    })
}

let debts = []
function readCurrentDebts(debts){
    let current_group = JSON.parse(localStorage.getItem("group_id"))
    let count = 0
    const dbRef = firebase.database().ref("Debts/").child(current_group);
    dbRef.once("value").then(function(snapshot) {
        let data = snapshot.val();
        for(let i in data) {
            debts[count] = new Debt(data[i].name, data[i].nameto, data[i].amount, data[i].key)
            count++
        }
    })
}



auth()
readCurrentGroup(group)
readCurrentTransactions(expenses)
readCurrentDebts(debts)
setTimeout(loadMembers, 2000, group);
setTimeout(loadExpenses, 2000, expenses);
setTimeout(loadDebts, 2000, debts);

function loadMembers(group){

    let current_group = group[0]
    let members = current_group.members
    ul = document.getElementById("member-list")

    let i = 0

    for (let member of members) {

        li = document.createElement("li")
        li.className = "view_item"
        div_left = document.createElement("div")
        div_left.className = "vi_left"
        div_right = document.createElement("div")
        div_right.className = "vi_right"
        let img_person = document.createElement("img")
        if (i==0) {
            img_person.setAttribute("src", "./img/me.png")
        }
        else{
            img_person.setAttribute("src", "./img/person.png")
        }
        let p_title = document.createElement("p")
        p_title.className = 'title'
        p_title.textContent = member

        p_amount = document.createElement("p")

        if (current_group.netAmt[i] < 0){
            p_amount.className = "neg_amount"
        }
        else{
            p_amount.className = "amount"
        }

        p_amount.textContent = current_group.netAmt[i] + '$'

        // button_delete = document.createElement("button")
        // button_delete.className = "btn_delete"
        // button_delete.textContent = "Delete"
        // button_delete.setAttribute("id", i)
        // button_delete.setAttribute("onClick", "delete_member(this.id)")
        // button_delete.setAttribute("data-translate", "delete")

        div_left.appendChild(img_person)
        div_right.appendChild(p_title)
        div_right.appendChild(p_amount)
        //div_right.appendChild(button_delete)

        li.appendChild(div_left)
        li.appendChild(div_right)
        ul.appendChild(li)
        i++
    }

}

function loadExpenses(expenses){

    let current_group = group[0]


    let ul = document.getElementById("expense_list")
    let ul_activity = document.getElementById("activity")

    if (expenses.length > 0){
        let count = 0
        for (let expense of expenses) {
            let li = document.createElement("li")
            li.className = "view_item"
            let li1 = document.createElement("li")
            li1.className = li.className
            let div_left = document.createElement("div")
            div_left.className = "vi_left"
            let div_left1 = document.createElement("div")
            div_left1.className = div_left.className
            let div_right = document.createElement("div")
            div_right.className = "vi_right"
            let div_right1 = document.createElement("div")
            div_right1.className = div_right.className
            let img_category = document.createElement("img")

            if (expense.category == "Food"){
                img_category.src = "./img/food.jpg"
            }

            else{
                img_category.src = "./img/house.jpg"
            }

            let p = document.createElement("p")
            p.textContent = expense.concept
            let div_expense = document.createElement("div")
            console.log('amount', expense.amount)
            div_expense.className = "expense_amount"
            div_expense.textContent = expense.amount.toString() + '$'
            //let img_receipt = document.createElement("input")
            // img_receipt.className = "img"
            // img_receipt.className = "img"
            // img_receipt.setAttribute("type", "image")
            //img_receipt.setAttribute("role", "button")
            // if(expense.receipt === null){
            //    img_receipt.src = "./img/receipt.jpg"
            // }
            // else{
            //     img_receipt.src = expense.receipt
            // }
            //img_receipt.src = "./img/receipt.jpg"
            let content_text = document.createElement("p")
            content_text.className = "content"
            //if(expense.users.toString()){
             //   let temp = expense.users.toString()
              //  content_text.textContent = expense.who_paid + "------>" + temp
            //}

            //else {
               content_text.textContent = expense.who_paid
           //}



            let button_delete = document.createElement("button")
            button_delete.className = "btn_delete"
            button_delete.textContent = "Delete"
            button_delete.setAttribute("id", count)
            button_delete.setAttribute("onClick", "delete_expense(this.id)")
            button_delete.setAttribute("data-translate", "delete")

            let img_pers = document.createElement("img")
            img_pers.src = "./img/person.png"
            let p_activity = document.createElement("p")
            p_activity.className = "title"
            p_activity.textContent = expense.who_paid + " added expense for " + expense.concept + '($' + expense.amount + ')'
            let p_activity_date = document.createElement("p")
            p_activity_date.className = "content"
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            p_activity_date.textContent = today

            div_left.appendChild(img_category)
            div_right.appendChild(p)
            div_right.appendChild(div_expense)
            //div_right.appendChild(img_receipt)
            div_right.appendChild(content_text)
            //div_right.appendChild(button_edit)
            div_right.appendChild(button_delete)

            div_left1.appendChild(img_pers)
            div_right1.appendChild(p_activity)
            div_right1.appendChild(p_activity_date)

            li.appendChild(div_left)
            li.appendChild(div_right)

            li1.appendChild(div_left1)
            li1.appendChild(div_right1)

            ul.appendChild(li)
            ul_activity.appendChild(li1)

            count = count + 1

        }
    }
}



function loadDebts(debts){
    ul = document.getElementById("debt-list")

    // let new_debt = new Debt(0, "wav", "rex", 100)
    // debts.push(new_debt)


    if (debts.length > 0){
        let count = 0
        for (let debt of debts) {
            li = document.createElement("li")
            li.className = "view_item"
            div_left = document.createElement("div")
            div_left.className = "vi_left"
            div_right = document.createElement("div")
            div_right.className = "vi_right"
            let img_person = document.createElement("img")

            img_person.src = "./img/person.png"

            let p_title = document.createElement("p")
            p_title.className = 'title'
            p_title.textContent = debt.nameto + '---->' + debt.name
            console.log("name",debt.name )
            console.log("nameTO",debt.nameto)

            let p_amount = document.createElement("p")
            p_amount.className = "debt_content"
            p_amount.textContent = debt.amount.toString() + '$'

            let button_settle_up = document.createElement("button")
            button_settle_up.className = "btn_edit"
            button_settle_up.textContent = "Setle Up"
            button_settle_up.setAttribute("id", count + "_debt")
            button_settle_up.setAttribute("onClick", "setle_debt(this.id)")
            button_settle_up.setAttribute("data-translate", "settle-up")



            div_left.appendChild(img_person)
            div_right.appendChild(p_title)
            div_right.appendChild(p_amount)
            div_right.appendChild(button_settle_up)

            li.appendChild(div_left)
            li.appendChild(div_right)

            ul.appendChild(li)
            let split = localStorage.getItem('split')
            console.log("split in main", split)
            count = count + 1
        }
    }
}
