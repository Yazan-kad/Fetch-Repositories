//Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");


getButton.onclick = function () {
    getRepos()
}
//Get Repos Function
function getRepos() {
    if(theInput.value == '') {
        reposData.innerHTML = "<span>Plese Write Github Username.</span>";
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) =>  response.json())
        .then((repositories) => {
            //Empty The Container
            reposData.innerHTML = '';

            //Loop On Repositories
            repositories.forEach(repo => {
                //Create The Main Dev Element
                let mainDiv = document.createElement("div");

                //Create repo Name Text
                let repoName = document.createTextNode(repo.name);

                //Append The Text To Main Div
                mainDiv.appendChild(repoName);

                //Create Repo URL
                let theUrl = document.createElement('a');

                //Create Repo Url Text
                let theUrlText = document.createTextNode("Visit");

                //Appenf The Repo Url Text To Ancher Tag
                theUrl.appendChild(theUrlText);

                //Add The Hybertext Referance "href"
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

                //Set Attrbite Blank
                theUrl.setAttribute('target', '_blank');

                //Append Url Ancher To Main Div
                mainDiv.appendChild(theUrl);

                //Craete Stars Count Span
                let starsSpan = document.createElement("span");

                //Create The Start Count Text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                //Add Stars Text To Stars Span
                starsSpan.appendChild(starsText);

                //Append Stars Count Span To Main Div
                mainDiv.appendChild(starsSpan);

                //Add Class On Main Div
                mainDiv.className = "repo-box";

                //Append The Main Div To Conatiner
                reposData.appendChild(mainDiv);
            });
        });
    
    }
}