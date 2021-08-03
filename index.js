//Parent element to store cards
const taskContainer = document.querySelector(".task-container");

//Global Store
const globalStore = [];

const newCard = ({id,
    imageURL,
    taskTitle,
    taskType,
    taskDescription
    }) => `<div class="col-md-6, col-lg-4">
                <div class="card">
                <div class="card-header d-flex justify-content-end gap-3">
                    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
                <img src=${imageURL} class="card-img-top" alt="Image">
                <div class="card-body">
                <h5 class="card-title">${taskTitle}</h5>
                <p class="card-text">${taskDescription}</p>
                <span class="badge bg-primary">${taskType}</span>
                </div>
                <div class="card-footer text-muted">
                    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
                </div>
            </div>
            </div>`; 

    const loadInitialTaskCards = () =>
    {
        //access local storage
        const getInitialData = localStorage.getItem("Tasky");

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

    localStorage.setItem("Tasky", JSON.stringify({ cards: globalStore}));
                          //key    //creating an object called "cards" storing the array "globalStore"

    
};