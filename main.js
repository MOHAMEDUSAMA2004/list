const taskInput =document.querySelector('.new-task');
const addTaskBtn = document.querySelector('.add-task-btn')
const taskList = document.querySelector('.task-list')
const updTaskBtn =document.querySelector('.upd-task-btn ')
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let data =[]
var id=0;
myModal.show()
addTaskBtn.addEventListener('click',addTask);
function addTask(){
    while(id <= data.length){
        id++
       }
    const taskText = taskInput.value.trim();
    if(taskText ===""){
     myModal.show()
     return;
    }
    const li =document.createElement('li')
    
    li.innerHTML=`
    <div >
    <b>${id}</b>
    <span>${taskText}</span>
    </div>
    <div>
    <button class="complete-btn btn btn-warning text-light">COMPLETE</button>
    <button class="edit-btn btn btn-primary ">EDIT</button>
    <button class="delete-btn btn btn-danger ">DELETE</button>
    </div>
    `
    data.push(li)
    taskList.appendChild(li)
    taskInput.value="";
    saveTasks()
    const completeBtn = li.querySelector('.complete-btn')
    const editBtn = li.querySelector('.edit-btn')
    const deleteBtn = li.querySelector('.delete-btn')
completeBtn.addEventListener('click',()=>{
    completeTask(li)
})
editBtn.addEventListener('click',()=>{
    addTaskBtn.style.display="none";
    updTaskBtn.classList.add('d-block')
    edit(li)
})
deleteBtn.addEventListener('click',()=>{
    Delete(li)
    saveTasks()
})
}

function completeTask(task){
    task.classList.toggle(('completed'))
}
function Delete(task){
    task.remove()
}
function edit(task){ 
 
    const span = task.querySelector('span')
    let taskText = task.querySelector('span').textContent;
    const taske = task.querySelector('span');
    taskInput.value = taskText;
    const newText =taskInput.value.trim()
    updTaskBtn.addEventListener('click',()=>{
    task.querySelector('span').textContent = taskInput.value.trim()
    updTaskBtn.classList.remove('d-block')
    addTaskBtn.style.display="block"
    taskInput.value=""
    })
}
function saveTasks(){
    const tasks = []
    taskList.querySelectorAll('li').forEach(li =>{
        const taskText = li.querySelector('span').textContent;
        const isCompleted = li.classList.contains('completed');
        tasks.push({text:taskText , completed:isCompleted});
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
function loadTasks(){
    const stored =JSON.parse(localStorage.getItem('tasks'));
    if(stored){
        stored.forEach(task=>{
            const li= document.createElement('li')
            li.innerHTML=`
                <div >
                <b>${id}</b>
                <span>${taskText}</span>
                </div>
                <div>
                <button class="complete-btn btn btn-warning text-light">COMPLETE</button>
                <button class="edit-btn btn btn-primary ">EDIT</button>
                <button class="delete-btn btn btn-danger ">DELETE</button>
                </div>
                `;
            if(task.completed){
                li.classList.add('completed')
            }
            taskList.appendChild(li)
            id++
        })
    }
}
document.addEventListener('DOMContentLoaded',loadTasks)