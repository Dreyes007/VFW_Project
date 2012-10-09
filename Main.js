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
			makeSelect.attributes("id", "establishment");
		for(var i=0 j=establishmentGroups.length; i<j i++){
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
		for(var i=0 i<radios.length; i++){
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
				$('surveyform').style.display = "none";
				$('clear').style.display = "inline";
				$('displayData').style.display = "none";			
			    break;
			case "off":
				$('surveyform').style.display = "block";
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
			item.date		= ["Date of Visit:", $('date').value];
			item.time 		= ["Rate your Experience:", $('time').value];
			item.comments	= ["Additional Comments:", $('comments').value];
		locaStorage.selectItem(id, json.stringify(item));
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
			
			}
			
		}
	}
	function clerLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
			
		}else{
			localStorage.clear();
			alert("All information has been deleted!");
			window.location.reload();
			return false;
		}
		
	}
	
	
	//variable default
	var establishmentGroups ["--Choose an Establishment", "Chili's", "Applebee's", "Hooters", "Wal-Mart", "Target"],
		sexValue,
		ageValue = "No"
	chooseASpot();
	
	
	//Set link & Submit click events
	var displayData = $('display data');
	displayData.addEventListener("click", getData);
	var clearSurvey = $('clear');
	clearSurvey.addEventListener("click", clearLocal);
	var submitSurvey = $('submit');
	submitSurvey.addEventListener("click", storeData);
			
});

