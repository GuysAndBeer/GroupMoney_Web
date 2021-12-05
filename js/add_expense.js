function add_expense(group){

	let current_group_id = JSON.parse(localStorage.getItem("group_id"))
	let current_group = group[0]
	let debts = []
    members = current_group.members

	let edit_index = JSON.parse(localStorage.getItem("edit_id"))


	let id = 0
	let id_debt = 0


	// if (expenses.length > 0){
	// 	id = expenses[expenses.length - 1].id + 1
	// 	//id_debt = debts[debts.length - 1].id + 1
	// }

	let sel=document.getElementById('member-select').selectedIndex;
	let options=document.getElementById('member-select').options;

	let name = options[sel].text

	let amount_field = document.getElementById("amount")
	let amount = parseInt(amount_field.value)

	if (amount>=10000){
		alert("Your amount shouldn't be more than 10000$")
	}
	if (amount<0){
		alert("Your amount shouldn't be less then 0$")
	}
	if (!Number.isInteger(amount)){
		alert("Your amount should be integer")
	}
	if (amount==0){
		alert("Your amount should be more then 1$")
		return;
	}


	// if(amount == null && edit_index != ""){
	// 	amount = expense.amount
	// }

	let concept_field = document.getElementById("concept")
	let concept = concept_field.value

	// if(concept == null && edit_index != ""){
	// 	concept = expense.concept
	// }

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
      		split_users.push(members[i])
      		if (document.getElementById("input_" + i).value === ""){
      			current_group.netAmt[i] = current_group.netAmt[i] - parseInt(document.getElementById("input_" + i).placeholder)

				debt_amount.push(parseInt(document.getElementById("input_" + i).placeholder))

      			sum = sum + parseInt(document.getElementById("input_" + i).placeholder)
      		}
      		else{
	      		current_group.netAmt[i] = current_group.netAmt[i] - parseInt(document.getElementById("input_" + i).value)
	      		debt_amount.push(parseInt(document.getElementById("input_" + i).value))
	      		sum = sum + parseInt(document.getElementById("input_" + i).value)
      		}
    	}
  	}

  	console.log("split_users", split_users)
  	//console.log("debt_amount", debt_amount)

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
  		let key = 0
  		let expense = new Expense(name, amount, concept, category, split_users, key)
  		//expenses.push(expense)
  		let counter = false

		expense_key = firebase.database().ref('Transaction/').child(current_group_id).push(expense).key
		firebase.database().ref('Transaction/').child(current_group_id).child(expense_key).update({
			key: expense_key
		})






		for (let i = 0; i < split_users.length; i++){
			// for (let d of debts){
			// 	let j = 0
			// 	if (d.name == split_users[i] && d.nameto == name) {
			// 		debts[d.id].amount = debts[d.id].amount + debt_amount[i]
			// 		counter = true
			// 	}
			// 	j = j + 1
			// }

			if (!counter) 
			{
				let key = 0;
				let debt = new Debt(name, split_users[i], debt_amount[i], key)
				debts.push(debt)
				console.log("depts!!!!!!",debts)
				var debt_key = firebase.database().ref('Debts/').child(current_group_id).push(debt).key
				firebase.database().ref('Debts/').child(current_group_id).child(debt_key).update({
					key: debt_key
				})

			}
			
			// if (split_users[i] == current_user)
			// {
			// 	if (document.getElementById("input_" + i).value === ""){
			// 		budget_expenses += parseInt(document.getElementById("input_" + i).placeholder)	
			// 	}
				
			// 	else{
			// 		budget_expenses += parseInt(document.getElementById("input_" + i).value)
			// 	}
			// }

			counter = false	
		}
		






	  	for (let j = 0; j < members.length; j++){
	  		if (members[j] == name) {
	  			current_group.netAmt[j] += amount

	  		}
	  	}
  	}

	firebase.database().ref('groups/').child(current_group_id).update({
		netAmt: current_group.netAmt
	})


  	//uploads[group_id].expenses = expenses
  	//groups[group_id].debts = debts
  	//groups[group_id].members = members

	// localStorage.setItem("groups", JSON.stringify(groups));
	// localStorage.setItem("uploads", JSON.stringify(uploads));
	// localStorage.setItem("debts", JSON.stringify(debts));
	//localStorage.setItem("budget_income", JSON.stringify(budget_income));
  	//localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
  	// localStorage.setItem("edit_id", JSON.stringify(""));
  	window.location.href = "./main.html"
	  localStorage.setItem("split",JSON.stringify(split_users))
	console.log("split_users!!!!",split_users)
}


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

	if(!Number.isInteger(result)){
		alert("Can't split equally")
		return;
	}

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


	// let members = group[0].members
	// let netAmt = group[0].netAmt
	//
	//
	// for (let i = 0; i < members.length; i++)
	// {
	// 	if (members[i] == expenses[index].who_paid){
	// 		netAmt[i] = netAmt[i] - parseInt(expenses[index].amount)
	// 	}
	//
	// 	if (expenses[index].users.includes(members[i]))
	// 	{
	// 		netAmt[i] = netAmt[i] + parseInt(expenses[index].amount)
	// 	}
	// }

	firebase.database().ref('Transaction/').child(current_group_id).child(expenses[index].key).remove();

	// firebase.database().ref('groups/').child(current_group_id).update({
	// 	members: members,
	// 	netAmt: netAmt
	// })


	//localStorage.setItem("budget_income", JSON.stringify(budget_income));
	//localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
	window.location.href = "./main.html"
}

function add_member(group){
	let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let current_group = group[0]

	console.log("trt", current_group)
	let members = []
	let netAmt = []
	if(current_group.members != null){
		members = current_group.members
	}

	let member_field = document.getElementById("member_input")
	let member = member_field.value
	//let id_member = members[members.length - 1].id + 1
	//let new_member = new Member(id_member, member, 0, 0)
	if (member == "") {
		alert("Input is empty cant add member")
		return;
	}

	members.push(member)
	if(current_group.netAmt != null){
		current_group.netAmt.push(0)
		netAmt = current_group.netAmt
	} else{
		netAmt.push(0)
	}

	firebase.database().ref('groups/').child(current_group_id).update({
		members: members,
		netAmt: netAmt
	})
	window.location.href = "./main.html"
}

function setle_debt(ind){
	let debt_index = parseInt(ind[0])
	console.log("index", debt_index)

	let current_group_id = JSON.parse(localStorage.getItem("group_id"))

	console.log("current_group_id", current_group_id)
	console.log( "debts ERGEGEVE",debts[0].name)
	console.log( "groups ERGEGEVE",group)
	let members = group[0].members
	let netAmt = group[0].netAmt
	console.log( "members ERGEGEVE",members)


	for(let i = 0; i < members.length; i++){
		if (members[i] === debts[debt_index].name) {
			netAmt[i] -= debts[debt_index].amount
		}

		if (members[i] === debts[debt_index].nameto) {
			netAmt[i] += debts[debt_index].amount
		}
	}


	//debts.splice(debts.indexOf(debts[debt_index]), 1)

	firebase.database().ref('Debts/').child(current_group_id).child(debts[debt_index].key).remove();


	firebase.database().ref('groups/').child(current_group_id).update({
		members: members,
		netAmt: netAmt
	})

	window.location.href = "./main.html"
}


// // function delete_member(index){
// // 	let member_index = parseInt(index[0])
// //  	let current_group_id = JSON.parse(localStorage.getItem("group_id"))
// //  	console.log("sds", current_group_id)
// //  	//let current_group = group[0]
// //  	let members = group[0].members
// //  	let netAmt = group[0].netAmt
// //
// //
// //  	for(expense of expenses)
// //  	{
// //  		if (expense.users.includes(members[member_index]) || expense.who_paid.includes(members[member_index]))
// //  		{
// //  			delete_mem = true
// //  			alert("Member can not be deleted because it is used in expenses")
// //  			return;
// //  		}
// //  	}
// //
// // 	for(debt of debts)
// // 	{
// // 		if (debt.name.includes(members[member_index]) || debt.nameTo.includes(members[member_index]))
// // 		{
// // 			delete_mem = true
// // 			alert("Member can not be deleted because it is used in debts")
// // 			return;
// // 		}
// // 	}
//
//
//
//
//
//  	members.splice(members.indexOf(members[member_index]), 1)
//  	netAmt.splice(netAmt.indexOf(netAmt[member_index]), 1)
//
//  	firebase.database().ref('groups/').child(current_group_id).update({
// 		members: members,
// 		netAmt: netAmt
// 	})
//  	window.location.href = "./main.html"
// }






let add_expense_button = document.getElementById("save_expense")
let add_member_button = document.getElementById("save_member")

add_expense_button.addEventListener('click', function ()
{
	add_expense(group)
});
add_member_button.addEventListener('click', function()
{
	add_member(group)
});


