//Parent element to store cards
const taskContainer = document.querySelector(".task-container");

//Global Store
let globalStore = [];

const newCard = ({id,
    imageURL,
    taskTitle,
    taskType,
    taskDescription
    }) => `<div class="col-md-6, col-lg-4">
                <div class="card">
                <div class="card-header d-flex justify-content-end gap-3">
                    <button type="button" class="btn btn-outline-success" id="${id}" onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-alt" id="${id}" onclick="editCard.apply(this, arguments)"></i></button>
                    <button type="button"  id="${id}" class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
                    <i class="fas fa-trash-alt" id="${id}" onclick="deleteCard.apply(this, arguments)"></i></button>
                </div>
                <img src=${imageURL} class="card-img-top" alt="Image">
                <div class="card-body">
                <h5 class="card-title">${taskTitle}</h5>
                <p class="card-text">${taskDescription}</p>
                <span class="badge bg-primary">${taskType}</span>
                </div>
                <div class="card-footer text-muted">
                    <button type="button" id="${id}" class="btn btn-outline-primary float-end"">Open Task</button>
                </div>
            </div>
            </div>`; 

    const loadInitialTaskCards = () => 
    {
        //access local storage
        const getInitialData = localStorage.Tasky;

        if(!getInitialData) return;

        //convert stringified object back to object
        const { cards } = JSON.parse(getInitialData);

        //map around array to generate html card and inject it to DOM
        cards.map((cardObject) => {
            const createNewCard = newCard(cardObject);
            taskContainer.insertAdjacentHTML("beforeend",createNewCard);
            globalStore.push(cardObject);
        });
    }

const updateLocalStorage = () => localStorage.setItem("Tasky" , JSON.stringify({cards: globalStore}));
                                                       //key    //creating an object called "cards" storing the array "globalStore"
const saveChanges = () =>
{
    const taskData =
    {
        id: `${Date.now()}`, //unique number for card id
        imageURL: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    //HTML Code injected to DOM
    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(taskData);
    
    //API - Application Programming Interface
    //localStorage -> interface -> programming

    updateLocalStorage();
    
};

const deleteCard = (event) => 
{
    //id
    event=window.event;
    const TargetID = event.target.id;
    const tagname = event.target.tagName;

    //search the globalStore, remove the object which matches with id
    globalStore = globalStore.filter((cardObject) => cardObject.id !== TargetID);

    updateLocalStorage();

    //access DOM to remove them

    if(tagname === "BUTTON")
    {
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    }
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );

 
}

const editCard = (event) =>
{
    event=window.event;
    const TargetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname === "BUTTON")
    {
        parentElement = event.target.parentNode.parentNode;
    }

    else parentElement = event.target.parentNode.parentNode.parentNode;

    let Tasktitle = parentElement.childNodes[5].childNodes[1];
    let Taskdescription = parentElement.childNodes[5].childNodes[3];
    let Tasktype = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];
    //setAttribute

    //console.log(parentElement.childNodes[7].childNodes);

    Tasktitle.setAttribute("contenteditable", "true");
    Taskdescription.setAttribute("contenteditable", "true");
    Tasktype.setAttribute("contenteditable", "true");
    submitButton.setAttribute(
        "onclick", 
        "saveEditChanges.apply(this, arguments)"
        );
    submitButton.innerHTML = "Save Changes";
}

const saveEditChanges = (event) =>
{
    event=window.event;
    const TargetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname === "BUTTON")
    {
        parentElement = event.target.parentNode.parentNode;
    }

    else parentElement = event.target.parentNode.parentNode.parentNode;

    let Tasktitle = parentElement.childNodes[5].childNodes[1];
    let Taskdescription = parentElement.childNodes[5].childNodes[3];
    let Tasktype = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];

    const updatedData =
    {
        Tasktitle: Tasktitle.innerHTML,
        Tasktype: Tasktype.innerHTML,
        Taskdescription: Taskdescription.innerHTML,
    };

    globalStore=globalStore.map((task) => {
        if(task.id === TargetID){
            return {
                id: task.id,
                imageURL: task.imageURL,
                taskTitle: updatedData.Tasktitle,
                taskType: updatedData.Tasktype,
                taskDescription: updatedData.Taskdescription,
            };
        }

        return task;
    });
    updateLocalStorage();
}