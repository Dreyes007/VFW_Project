// Daniel Reyes
// VFW-1210
// Project 2
// Oct 14

// DOM Readiness
window.addEventListener("DOMContentLoaded", function () {

	//fuction getElementById
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;		
	}
	
	//Select field element populated with options
	function chooseASpot() {
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
	
	function storeData(){
		var id 				= Math.floor(Math.random()*100000001);
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
			
	}
	
	
	//variable default
	var establishmentGroups ["--Choose an Establishment", "Chili's", "Applebee's", "Hooters", "Wal-Mart", "Target"];
	chooseASpot();
	
	
	//Set link & Submit click events
	/*var displayData = $('display data');
	displayData.addEventListener("click", getData);
	var clearSurvey = $('clear');
	clearSurvey.addEventListener("click", clearSurvey);*/
	var submitSurvey = $('submit');
	submitSurvey.addEventListener("click", storeData);
			
});

