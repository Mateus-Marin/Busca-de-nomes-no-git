import {getUser } from "./services/user.js";
import { repos } from "./services/repositiries.js";
import { getEvents } from "./services/events.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";



document.getElementById("btn-search").addEventListener("click", () => {
    const userName = document.getElementById("input-search").value;
    if (validadeEmpytInput(userName)) return
    getUserData(userName);
});


document.getElementById("input-search").addEventListener("keyup", (e) => {
    const userName = e.target.value;
    const key =e.keyCode;
    const isEnterKeyPressed = key === 13;
    if (isEnterKeyPressed) {
        if (validadeEmpytInput(userName)) return
        getUserData(userName);

    }
});

function validadeEmpytInput(userName){
    if(userName.length === 0){
        alert("não preenchido")
        return true
      }
}


async function getUserData(userName) {
    const userResponse = await getUser(userName)
    if(userResponse.message === "Not Found"){
        screen.rederNotFound()
        return
    }
    
    const repositoriesResponse = await repos(userName)
    const eventResponse = await getEvents(userName);

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventResponse);
    screen.renderUser(user)
}





