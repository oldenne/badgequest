/* Karina Casey
   CSC 337 Fall 2018
   Homework 7

	*/

"use strict";
(function(){
  //wowee it loads some Fucking Content
  window.onload = function() {
    homePage();
  };

  /**Makes the default homepage, with all the books in the folder
    *displaying title and cover in their own div.
    */
  function homePage(){
    let url = "http://localhost:3000/?mode=pokes";
    fetch(url)
      .then(checkStatus)
      .then(function(responseText) {
        let json = JSON.parse(responseText);
        for(let i = 0; i < json.length; i++){
          let p = document.createElement("p");
          p.innerHTML = json[i].title;
          p.folder = json[i].folder;
          let img = document.createElement("img");
          img.alt = json[i].title;
          img.src = "pkmn/" + json[i].folder + "/icon.png";
          img.folder = json[i].folder;
          let div = document.createElement("div");
          div.appendChild(p);
          div.appendChild(img);
          div.classList.add("wip");
          div.classList.add(json[i].rockpaper);
          if(i == 0){
            document.getElementById("row0").appendChild(div);
          }else{
            document.getElementById("row"+Math.floor(i/5)).appendChild(div);
          }

        }
      })
        .catch(function(error) {
          console.log(error);
      });
    }

  /**returns the response text if the status is in the 200s
    *otherwise rejects the promise with a message including the status
    */
  function checkStatus(response) {
  		if (response.status >= 200 && response.status < 300) {
  				return response.text();
  		} else if (response.status == 404) {
  			return Promise.reject(new Error("Sorry, we couldn't find that page"));
  		} else {
  			return Promise.reject(new Error(response.status+": "+response.statusText));
  		}
  }

})();
