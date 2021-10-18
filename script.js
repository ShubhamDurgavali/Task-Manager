const taskContainer = document.querySelector(".task__container");

let globalStore = [];

const generateNewData = (taskData) =>`
<div class="col-sm-12 col-md-6 col-lg-4">
<div class="card">
<div class="card-header d-flex justify-content-end gap-2">
 <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
<button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id}></i></button>
</div>
<div class="card-body">
<img class="card-img-top w-full h-full" src=${taskData.imageUrl} alt="...">
 <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
 <p class="card-text">${taskData.taskDescription}</p>
 <a href="#" class="btn btn-primary">${taskData.taskType}</a>
</div>
</div>
</div>
`;


const loadInitialCardData = () => {
    // local storage to get task card data
    const getCardData = localStorage.getItem("task");

    // convert to normal object
    const {cards} = JSON.parse(getCardData);

    // loop over those array object to create a html card, inject it into the dom
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewData(cardObject));

        // update global store
        globalStore.push(cardObject);
    })
};


// Delete function

const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    localStorage.setItem("task", JSON.stringify({cards:globalStore}));

    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode)
    } else {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
    }
};



const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}` ,
        imageUrl: document.getElementById("imageurl").value ,
        taskTitle: document.getElementById("tasktitle").value ,
        taskType: document.getElementById("tasktype").value ,
        taskDescription: document.getElementById("taskdescription").value
    };

taskContainer.insertAdjacentHTML("beforeend", generateNewData(taskData));
globalStore.push(taskData);
localStorage.setItem("task", JSON.stringify({cards:globalStore}));




};