// Daniel Reyes
// VFW-1210
// Project 2
// Oct 14

// DOM Readiness
window.addEventListener("DOMContentLoaded", function(){

	//fuction getElementById
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;		
	}
	
	//variable default
	var establishmentGroups ["--Choose an Establishment", "Chili's", "Applebee's", "Hooters", "Wal-Mart", "Target"];
	
	
	
	//Set link & Submit click events
	var displayData = $('display data');
	displayData.addEventLister("click", getData);
	var clearSurvey = $('clear');
	clearSurvey.addEventLister("click", clearSurvey);
	var submitSurvey = $('submit');
	submitSurvey.addEventLister("click", storeData);
	
	
	
	
	
	
	
});

