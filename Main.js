// Daniel Reyes
// VFW-1210
// Project 2
// Oct 14

// DOM Readiness
window.addEventListener("DOMContentLoaded", function(){

	//fuction getElementByIdaddItem.html
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;		
	}
	
	//Select field element populated with options
	function chooseASpot(){
		var formTag = document.getElementsByTagName("form");
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "establishment");
		for(var i=0, j=establishmentGroups.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = establishmentGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
		
	}
	//Find value of selected radion button
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}						
		}
	}
	function getCheckboxValue(){
		if($('18-24').checked){
			ageValue = $('18-24').value;
		}else{
			ageValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('informationForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayData').style.display = "none";			
			    break;
			case "off":
				$('informationForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayData').style.display = "inline";
				$('items').style.display = "none";			
			    break;
			default:
				return false;
			
		}
	}
	
	
	function storeData(){
		var id 				= Math.floor(Math.random()*100000001);
		getSelectedRadion()
		getCheckboxValue()		
		var item			= {};
			item.fname		= ["First Name:", $('fname').value];
			item.lname		= ["Last Name:", $('lname').value];	
			item.email		= ["Email:", $('email').value];
			item.phone		= ["Phone Number:", $('phone').value];
			item.sex		= ["Sex:", sexValue];
			item.age		= ["Age", ageValue];
			item.select 	= ["Establishment:", $('select').value];
			item.date		= ["Date of Visit:", $('date').value];
			item.time 		= ["Rate your Experience:", $('time').value];
			item.comments	= ["Additional Comments:", $('comments').value];
		locaStorage.setItem(id, json.stringify(item));
		alert("Contact Saved");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length == 0){
			alert("There is no data in Local Storage.");
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('u');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi)			
			}
			makeItemsLinks(localStorage.key(i),linksLi); // create edit and delete buttons/link for each item in local storage.
		}
	}
	//Make Item Links
	//Create the edit and delete links for each of the Items when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Survey Information";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//Delete single Item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Information";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	
		
	}
	
	function editItem(){
		//Grab the data from our item on local storage
		var value = locaStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//Populate form with with current local storage values.
		$('fname').value = item.fname[1];
		$('lname').value = item.lname[1];
		$('email').value = item.email[1];
		$('phone').value = item.phone[1];
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
			if(item.favorite[1] == "Yes"){
			$('fav').setAttribute("checked", "checked");							
		}
		$('select').value = item.select[1];
		$('date').value = item.select[1];
		$('time').value = item.select[1];
		$('comments').value = item.select[1];
	
		//Remove the initial listener from the input 'Save Information' button.
		save.removeEventListener("click", storeData);
		//Change Submit Button value to Edit Button
		$('submit').value = "Edit Information";
		var editSubmit = $('submit');
		//Save the key value establish in this function as a property of the edit submit event
		//so we can use that value when the edited data is saved.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	
	}
			
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
			
		}else{
			localStorage.clear();
			alert("All information has been deleted!");
			window.location.reload();
			return false;
		}
	
	}
	
	function validate(e){
		//Define the elements we want to check
		var getfname = $('fname');
		var getlname = $('lname');
		var getEmail = $('email');
		var getPhone = $('Phone');
		
		//Reset Error Message.
		errMsg.innerHTML = "";
		getfname.style.border = "1px solid black";
		getlname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		
		//Get error message
		var messageAry = [];
		
		//First Name Validation
		if(getfname.value === ""){
			var fnameError = "Please enter a first name"
			getfname.style.border = "1px solid red";
			messageAry.push(fnameError);
		}
		//Last Name Validation
		if(getlname.value === ""){
			var lnameError = "Please enter a last name"
			getlname.style.border = "1px solid red";
			messageAry.push(lnameError);			
		}
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		
		//If there were errors display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault
			return false;
		}else{
			//If all is Ok, save our Data!
			storeData();
			
		}	
			
	}	
	
	
	//variable default
	var establishmentGroups = ["--Choose an Establishment--", "Chili's", "Applebee's", "Hooters", "Wal-Mart", "Target"],
		sexValue,
		ageValue = "No"
		errMsg = $('errors');
	
	
	//Set link & Submit click events
	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearSurvey = $('clear');
	clearSurvey.addEventListener("click", clearLocal);
	var submitSurvey = $('save');
	submitSurvey.addEventListener("click", validate);
			
});

