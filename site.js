function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {

    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (ev.target.className == 'card-header') {

        ev.target.nextElementSibling.childNodes[1].appendChild(document.getElementById(data));
    }
    if (ev.target.className == 'card') {
        ev.target.childNodes[1].childNodes[3].childNodes[1].appendChild(document.getElementById(data))
    }
    if (ev.target.className == 'list-group-item list-group-item' || ev.target.className == 'list-group-item list-group-item-secondary') {

        ev.target.parentNode.appendChild(document.getElementById(data))
    }
    if (ev.target.className == 'card-body') {
        ev.target.childNodes[1].appendChild(document.getElementById(data))

    }
    if (ev.target.className == 'delete-item float-end') {
        ev.target.parentNode.parentNode.appendChild(document.getElementById(data));

    }
    if (ev.target.className == 'bi bi-trash-fill') {
        ev.target.parentNode.parentNode.parentNode.appendChild(document.getElementById(data));
    }

    if (ev.target.className == "btn btn-outline-danger btn-sm delete-all float-end") {
        ev.target.parentNode.nextElementSibling.childNodes[1].appendChild(document.getElementById(data));
    }



}


// todo

const form = document.querySelector('#addTodoForm')
const input = document.querySelector('#txtTodoName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const todoList = document.querySelector('#todo-list')
const todoList1 = document.querySelector('#doing')
const todoList2 = document.querySelector('#done')
var sayac = 0;
let items;

let bgColor = 0;
addAllEventListener();

function addAllEventListener() {

    form.addEventListener('submit', addNewItem);
    todoList.addEventListener('click', deleteItem);
    doing.addEventListener('click', deleteItem);
    done.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);

}



function addNewItem(e) {
    e.preventDefault();

    if (input.value == '') {
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
    li.id = 'todolar' + sayac
    sayac++;
    li.appendChild(document.createTextNode(input.value));
    li.draggable = 'true';
    const a = document.createElement('a');
    a.classList = ('delete-item float-end');
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="bi bi-trash-fill"></i>';

    li.appendChild(a);
    todoList.appendChild(li);

    setItemToLS(input.value);
}

function deleteItem(e) {
    e.preventDefault();
    if (e.target.className == 'bi bi-trash-fill') {
        var result = confirm('Silmek istediğinize emin misiniz?');
        if (result) {
            e.target.parentElement.parentElement.remove();
            sayac -= 1
        }
    }
}

function deleteAllItems(e) {
    e.preventDefault();
    if (sayac == 0) {
        alert('Silinecek bir şey bulunmuyor.');
        return;
    }

    else {
        alert('Hepsi silindi.');
        sayac = 0


        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }
        while (doing.firstChild) {
            doing.removeChild(doing.firstChild);
        }
        while (done.firstChild) {
            done.removeChild(done.firstChild);
        }
    }


}

function setItemToLS(text) {
    localStorage.setItem('todo', text);
    input.value = "";

}

function getItemsFromLS() {

}

function loadItems() {

}

function deleteItemFromLS() {

}