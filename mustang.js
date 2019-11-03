/*
	Mario Franchi
	Web and Dist Programming
	Fall 2019
	PA 5
*/

var URLArray = [];
var NameArray = []; 
var EmailArray = [];
var contacts = [];
var contactContainer = document.getElementById("con");

function loadIndex() {
    var indexReq = new XMLHttpRequest();
    indexReq.open('GET', 'https://mustang-data-mef.azurewebsites.net/index.json'); //I put my azure website here because I wasn' when the your link would update.
    
	indexReq.onload = function() {
        contactIndex = JSON.parse(indexReq.responseText);
        for (i=0; i < contactIndex.length; i++) {
			NameArray.push(contactIndex[i].Name);
			EmailArray.push(contactIndex[i].Email);
            URLArray.push(contactIndex[i].ContactURL);
        }
        console.log("The index and URLs have been loaded.");
		
		var htmlString2 = "";
		for (q = 0; q < 5; q++){
			htmlString2 += NameArray[q] + " ; " + EmailArray[q] + " ; " + URLArray[q] + "<br>";
			document.getElementById("in").innerHTML = htmlString2;
		}
    }
    indexReq.send();
}

function loadContacts() {
    contacts.length = 0;
    loadingContact = 0;
    if (URLArray.length > loadingContact) {
        loadNext(URLArray[loadingContact]);
    }
}

function loadNext(URL) {
    contactReq = new XMLHttpRequest();
    contactReq.open('GET', URL);
    contactReq.onload = function() {
        var contact;
        contact = JSON.parse(contactReq.responseText);
        console.log("Contact: " + contact.lastName + ", " + contact.firstName);
        contacts.push(contact);
		
		if(contacts.length == 5){
			renderContacts(contacts);
			console.log("All of the Contact information is below.");
			console.log(contacts);
		}
		
        loadingContact++;
        if (URLArray.length > loadingContact) {
            loadNext(URLArray[loadingContact]);
        }
    }
    contactReq.send();
}

function renderContacts(data){
	var htmlString = "";
	for(i = 0;i < data.length; i++){
		htmlString += "<p><strong>" + data[i].lastName + ", " + data[i].firstName + "</strong>: " + data[i].phoneNumber + ", " + data[i].email + ". </p>";
	}
	contactContainer.insertAdjacentHTML('beforeend', htmlString)
}