const taskContainer = document.querySelector(".task-container");

console.log(taskContainer);

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

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
};