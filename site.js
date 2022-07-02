function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// todo

const form = document.querySelector('#addTodoForm')
const input = document.querySelector('#txtTodoName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const todoList = document.querySelector('#todo-list')
const todoList1 = document.querySelector('#doing')
const todoList2 = document.querySelector('#done')


let bgColor = 0;
addAllEventListener();

function addAllEventListener() {

    form.addEventListener('submit', addNewItem);
    todoList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
}



function addNewItem(e) {
    e.preventDefault();

    if (input.value === '') {
        alert('Lütfen bir görev ekleyin')
        return;
    }

    const li = document.createElement('li');
    if (bgColor) {
        li.classList = ('list-group-item list-group-item-secondary');
        bgColor = false;
    } else {
        li.classList = ('list-group-item list-group-item');
        bgColor = true;
    }

    li.setAttribute("id", Math.random());
    li.setAttribute("draggable", "true");
    li.setAttribute("ondragstart", "drag(event)");

    li.appendChild(document.createTextNode(input.value));
    const a = document.createElement('a');
    a.classList = ('delete-item float-end');
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="bi bi-trash-fill"></i>';

    li.appendChild(a);
    todoList.appendChild(li);

}

function deleteItem(e) {
    e.preventDefault();
    if (e.target.className == 'bi bi-trash-fill') {
        confirm('Silmek istediğinize emin misiniz?');
        e.target.parentElement.parentElement.remove();
    }
}

function deleteAllItems(e) {
    if (confirm('Silmek istediğinize emin misiniz?')) {

        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }
    }

    //    todoList.innerHTML=('');
}