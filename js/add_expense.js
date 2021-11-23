function add_expense(){

	let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let group_id = parseInt(current_group_id)
    let uploads = []
    uploads = JSON.parse(localStorage.getItem("uploads"))
    let groups = JSON.parse(localStorage.getItem("groups"))
    let expenses = []
    let members = []
    let debts = JSON.parse(localStorage.getItem("debts"))
    expenses = uploads[group_id].expenses
    members = groups[group_id].members
    console.log("uploads", expenses)

	let current_user = JSON.parse(localStorage.getItem("current_user"))

	let edit_index = JSON.parse(localStorage.getItem("edit_id"))

	let budget_income_field = document.getElementById("budget_income")
	let budget_expenses_field = document.getElementById("budget_expenses")

	let budget_income = parseInt(JSON.parse(localStorage.getItem("budget_income")))
	let budget_expenses = parseInt(JSON.parse(localStorage.getItem("budget_expenses")))

	let id = 0
	let id_debt = 0

	if (expenses.length > 0){
		id = expenses[expenses.length - 1].id + 1
		//id_debt = debts[debts.length - 1].id + 1
	}

	let sel=document.getElementById('member-select').selectedIndex;
	let options=document.getElementById('member-select').options;

	let name = options[sel].text

	let amount_field = document.getElementById("amount")
	let amount = parseInt(amount_field.value)

	if(amount == null && edit_index != ""){
		amount = expenses[edit_index].amount
	}

	let concept_field = document.getElementById("concept")
	let concept = concept_field.value

	if(concept == null && edit_index != ""){
		concept = expenses[edit_index].amount
	}

	let sel_category=document.getElementById('category-select').selectedIndex;
	let options_category=document.getElementById('category-select').options;

	let category = options_category[sel_category].text

	let split_users = []
	let debt_amount = []
	let sum = 0
	let rad = document.getElementsByClassName("radio__input")
	for (let i = 0;i < rad.length; i++) {
    	if (rad[i].checked) {
      		//alert('Выбран ' + i+' radiobutton');
      		split_users.push(members)
      		if (document.getElementById("input_" + i).value === ""){
      			groups[group_id].netAmt[i] = groups[group_id].netAmt[i] - parseInt(document.getElementById("input_" + i).placeholder)
      			debt_amount.push(parseInt(document.getElementById("input_" + i).placeholder))
      			sum = sum + parseInt(document.getElementById("input_" + i).placeholder)
      		}
      		else{
	      		groups[group_id].netAmt[i] = groups[group_id].netAmt[i] - parseInt(document.getElementById("input_" + i).value)
	      		debt_amount.push(parseInt(document.getElementById("input_" + i).value))
	      		sum = sum + parseInt(document.getElementById("input_" + i).value) 
      		}
    	}
  	}

  	console.log("split_users", split_users)
  	console.log("debt_amount", debt_amount)

  	let getFileUrl = JSON.parse(localStorage.getItem("uploadedUrl"));
  	let receipt = getFileUrl
    if(getFileUrl === ""){
    	receipt = "./img/receipt.jpg"
    	console.log("file is empty")
    }else {
        receipt = getFileUrl
        localStorage.setItem("uploadedUrl", JSON.stringify(""));
    }
  	

  	if (sum != amount)
  	{
  		console.log(sum)
  		alert("the inputs are more or less then amount")
  		return;
  	}

  	else{
  		let date = ""
  		let expense = new Expense(id, name, amount, date, concept, category, split_users)
  		expenses.push(expense)
  		let counter = false
  		/*for(let i = 0; i < 3; i++){
  			for (let d of debts){
  				let j = 0
  				if (d.name == members[i] && d.nameto == name) {
  					debts[d.id].amount = debts[d.id].amount + debt_amount[i]
  					counter = true
  				}
  				j = j + 1
  			}

  			if (!counter) 
  			{
  				let debt = new Debt(id_debt, members[i], name, debt_amount[i])
  				debts.push(debt)
  			}

  			counter = false	
  		}*/

	  	for (let j = 0; j < members.length; j++){
	  		if (members[j] == name) {
	  			groups[group_id].netAmt[j] += amount
	  		}
	  	}		
  	}



  	//uploads[group_id].expenses = expenses
  	//groups[group_id].debts = debts
  	//groups[group_id].members = members

	localStorage.setItem("groups", JSON.stringify(groups));
	localStorage.setItem("uploads", JSON.stringify(uploads));
	localStorage.setItem("debts", JSON.stringify(debts));
	//localStorage.setItem("budget_income", JSON.stringify(budget_income));
  	//localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
  	localStorage.setItem("edit_id", JSON.stringify(""));
  	window.location.href = "./main.html"
}

let save_image_button = document.getElementById("add_file")

save_image_button.addEventListener('click', function(){
	let selectedFile = document.getElementById('myFile').files[0]
    //if (!selectedFile.type.startsWith('img/')){ return }
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result
        console.log("we save base64", base64String)
        localStorage.setItem("uploadedUrl", JSON.stringify(base64String));
    };
    reader.readAsDataURL(selectedFile);
});

function split_equally(){
	let amount_input = document.getElementById('amount');
	let amount = parseInt(amount_input.value)
	let rad = document.getElementsByClassName("radio__input")
	let count = 0
	for (let i = 0;i < rad.length; i++) {
    	if (rad[i].checked) {
      		//alert('Выбран ' + i+' radiobutton');
      		count = count + 1
    	}
  	}

  	//alert(amount)

  	let result = amount / count;

  	alert(result)

  	for (let i = 0;i < rad.length; i++) {
    	if (rad[i].checked) {
      		//alert('Выбран ' + i+' radiobutton');
      		temp = document.getElementById("input_" + i)
      		temp.setAttribute("placeholder", result)
    	}
  	}
}

function delete_expense(ind){
	console.log("index",ind)
	index = parseInt(ind)

	let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let group_id = parseInt(current_group_id)
    let uploads = []
    uploads = JSON.parse(localStorage.getItem("uploads"))
    let groups = JSON.parse(localStorage.getItem("groups"))
    let expenses = []
    let members = []
    expenses = uploads[group_id].expenses
    members = groups[group_id].members

	let current_user = JSON.parse(localStorage.getItem("current_user"))

	for (let i = 0; i < members.length; i++)
	{
		if (members[i] == expenses[index].who_paid){
			groups[group_id].netAmt[i] = groups[group_id].netAmt[i] - parseInt(expenses[index].amount)
		}
	}

	expenses.splice(expenses.indexOf(expenses[index]), 1)
	groups[group_id].members = members
	uploads[group_id].expenses = expenses
	localStorage.setItem("groups", JSON.stringify(groups));
	localStorage.setItem("uploads", JSON.stringify(uploads));
	//localStorage.setItem("budget_income", JSON.stringify(budget_income));
	//localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
	window.location.href = "./main.html"
}

function add_member(){
	let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let group_id = parseInt(current_group_id)
    let groups = JSON.parse(localStorage.getItem("groups"))
    let members = groups[group_id].members
	let member_field = document.getElementById("member_input")
	let member = member_field.value
	//let id_member = members[members.length - 1].id + 1
	//let new_member = new Member(id_member, member, 0, 0)
	members.push(member)
	groups[group_id].netAmt.push(0)
	groups[group_id].members = members
	localStorage.setItem("groups", JSON.stringify(groups));
	window.location.href = "./main.html"
}

function setle_debt(ind){
	let debt_index = parseInt(ind[0])
	console.log("index", debt_index)
	let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))
	let groups = []
	groups = JSON.parse(localStorage.getItem("group"))
	console.log("current_group_id", current_group_id)
	let group_id = parseInt(current_group_id)
	let current_group = groups[group_id]
	console.log("current_group", current_group)    
	let debts = current_group.debts
	let members = current_group.members
	let current_user = JSON.parse(localStorage.getItem("current_user"))


	for(let i = 0; i < members.length; i++){
		if (members[i].name === debts[debt_index].name) {
			members[i].budget += debts[debt_index].amount
		}

		if (members[i].name === debts[debt_index].nameto) {
			members[i].budget -= debts[debt_index].amount
		}
	}

	if (debts[debt_index].name == current_user){
		budget_expenses -= debts[debt_index].amount
	}

	if (debts[debt_index].nameto == current_user) 
	{
		budget_income -= debts[debt_index].amount
	}

	debts.splice(debts.indexOf(debts[debt_index]), 1)
	console.log("new_members", members)
	console.log("budget_income", budget_income)
	console.log("budget_expenses", budget_expenses)
	groups[group_id].members = members
	groups[group_id].debts = debts
 	localStorage.setItem("budget_income", JSON.stringify(budget_income));
	localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
	localStorage.setItem("group", JSON.stringify(groups));
	window.location.href = "./main.html"
}

function delete_member(index){
	let member_index = parseInt(index[0])

	let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let group_id = parseInt(current_group_id)
    let groups = JSON.parse(localStorage.getItem("groups"))
    let members = groups[group_id].members
    uploads = JSON.parse(localStorage.getItem("uploads"))
    let expenses = uploads[group_id].expenses
	let delete_mem = false

	for(expense of expenses)
	{
		if (expense.users.includes(members[member_index]) || expense.who_paid.includes(members[member_index])) 
		{
			delete_mem = true
			alert("Member can not be deleted because it is used in expenses")
			return;
		}
	}

	if (!delete_mem){
		members.splice(members.indexOf(members[member_index]), 1)
	}
	groups[group_id].members = members
	localStorage.setItem("groups", JSON.stringify(groups));
	window.location.href = "./main.html"
}

function loadDebts(debts){
	ul = document.getElementById("debt-list")

    if (debts.length > 0){

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
            p_title.textContent = debt.name + '---->' + debt.nameto

            let p_amount = document.createElement("p")
            p_amount.className = "debt_content"
            p_amount.textContent = debt.amount.toString() + '$'

            let button_settle_up = document.createElement("button")
            button_settle_up.className = "btn_edit"
            button_settle_up.textContent = "Setle Up"
            button_settle_up.setAttribute("id", debt.id + "_debt")
            button_settle_up.setAttribute("onClick", "setle_debt(this.id)")


            div_left.appendChild(img_person)
            div_right.appendChild(p_title)
            div_right.appendChild(p_amount)
            div_right.appendChild(button_settle_up)

            li.appendChild(div_left)
            li.appendChild(div_right)

            ul.appendChild(li)

        }
    }
}


let add_expense_button = document.getElementById("save_expense")
let add_member_button = document.getElementById("save_member")

add_expense_button.addEventListener('click', add_expense);
add_member_button.addEventListener('click', add_member);
