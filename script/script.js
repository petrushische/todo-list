// Данные
const container = document.querySelector('.container-all');
const template = document.querySelector('.template').content;
const buttonWrapper = document.querySelector('.button-wrapper');
const count = document.querySelector('.count');
const fullDone = document.querySelector('.full-done');
const todoList = container.children
const buttonClear = buttonWrapper.querySelector('.button-conteiner-clear')
const buttonDefault = document.querySelector('.button-conteiner-all');
const buttonActive = document.querySelector('.button-conteiner-active');
const buttonComplet = document.querySelector('.button-conteiner-completed');


// Фильтры
function filters() {
 Array.from(todoList).forEach((elem) => {
  if (window.location.hash === '#/') {
   elem.style = 'display:flex'
  } else if (window.location.hash === '#/active') {
   elem.classList.contains('check-delo') ? elem.style = 'display:none' : elem.style = 'display:flex';
  } else if (window.location.hash === '#/completed') {
   elem.classList.contains('check-delo') ? elem.style = 'display:flex' : elem.style = 'display:none'
  }
 })
}

setInterval(function () {
 if (window.location.hash === '#/') {
  buttonDefault.classList.add('button-conteiner-on')
  buttonActive.classList.remove('button-conteiner-on')
  buttonComplet.classList.remove('button-conteiner-on')
 } else if (window.location.hash === '#/active') {
  buttonActive.classList.add('button-conteiner-on')
  buttonDefault.classList.remove('button-conteiner-on')
  buttonComplet.classList.remove('button-conteiner-on')
 } else if (window.location.hash === '#/completed') {
  buttonComplet.classList.add('button-conteiner-on')
  buttonActive.classList.remove('button-conteiner-on')
  buttonDefault.classList.remove('button-conteiner-on')
 }
 filters()
}, 100);

let tasks = [];

if (localStorage.getItem('tasks')) {
 tasks = JSON.parse(localStorage.getItem('tasks'))
}
tasks.forEach((elem) => {
 function renderLi(elem) {
  const element = template.querySelector('.todo-li').cloneNode(true);
  element.id = elem.id

  const paragr = element.querySelector('.case');
  paragr.textContent = elem.text;
  const inputChange = element.querySelector('.todo-change')
  const buttonInput = element.querySelector('.input-save')
  buttonInput.addEventListener('click', () => {
   paragr.textContent = inputChange.value
   elem.text = inputChange.value
   inputChange.classList.remove('todo-change-visible')
   buttonInput.classList.remove('input-save-visible')
   paragr.style = 'display:visible'
   if (inputChange.value === '') {
    element.remove()
    tasks = tasks.filter((el) => el.id != element.id)
   }
   SavelocalStorage()
  })

  const trash = element.querySelector('.trash');
  trash.addEventListener('click', (evt) => {
   tasks = tasks.filter((elem) => elem.id != element.id)
   evt.target.closest('.todo-li').remove();
   showButton();
   countTodoli();
   SavelocalStorage();
  })

  const done = element.querySelector('.done');
  elem.dane ? done.checked = true : done.checked = false;
  checkCheked(done);
  clear();
  fullCheckTodo();
  done.addEventListener('click', () => {
   if (elem.dane === false) {
    elem.dane = true
   } else {
    elem.dane = false
   }
   checkCheked(done);
   clear()
   fullCheckTodo();
   SavelocalStorage()
  })

  inputChange.addEventListener('keyup', (evt) => {
   if (evt.keyCode === 13) {
    buttonInput.click()
   }
  })
  element.addEventListener('dblclick', () => {
   paragr.style = 'display:none'
   inputChange.classList.add('todo-change-visible')
   buttonInput.classList.add('input-save-visible')
   inputChange.value = paragr.textContent
  })

  return element
 }

 container.append(renderLi(elem))
 showButton();
 clear();
})



// Создание задачи
function renderTemplate(item) {
 const element = template.querySelector('.todo-li').cloneNode(true);

 const newtasks = {
  id: Date.now(),
  text: item,
  dane: false
 }
 tasks.push(newtasks)
 SavelocalStorage()


 element.id = newtasks.id

 const paragr = element.querySelector('.case');
 paragr.textContent = newtasks.text;
 const inputChange = element.querySelector('.todo-change')
 const buttonInput = element.querySelector('.input-save')
 buttonInput.addEventListener('click', () => {
  paragr.textContent = inputChange.value
  newtasks.text = inputChange.value
  inputChange.classList.remove('todo-change-visible')
  buttonInput.classList.remove('input-save-visible')
  paragr.style = 'display:visible'
  if (inputChange.value === '') {
   element.remove()
   tasks = tasks.filter((el) => el.id != element.id)

  }
  SavelocalStorage()
  showButton();
 })

 const trash = element.querySelector('.trash');
 trash.addEventListener('click', (evt) => {
  /* const index = tasks.findIndex((el) => el.id === Number(element.id))
   tasks.splice(index, 1)*/
  tasks = tasks.filter((elem) => elem.id != element.id)
  evt.target.closest('.todo-li').remove();
  showButton();
  countTodoli();
  SavelocalStorage();
 })

 const done = element.querySelector('.done');
 newtasks.dane ? done.checked = true : done.checked = false
 done.addEventListener('click', () => {
  if (newtasks.dane === false) {
   newtasks.dane = true
  } else {
   newtasks.dane = false
  }
  checkCheked(done);
  clear();
  fullCheckTodo();
  SavelocalStorage()
 })


 inputChange.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 13) {
   buttonInput.click()
  }
 })
 element.addEventListener('dblclick', () => {
  paragr.style = 'display:none'
  inputChange.classList.add('todo-change-visible')
  buttonInput.classList.add('input-save-visible')
  inputChange.value = paragr.textContent
 })

 return element
}
// Рендер задачи
function render(item) {
 container.append(renderTemplate(item))
}
// рендер задачи с данными из инпута формы
const form = document.querySelector('.form');
const input = form.querySelector('.name');
form.addEventListener('submit', (evt) => {
 evt.preventDefault();
 render(input.value)
 form.reset();
 showButton();
 countTodoli();

})

// счетчик дел
function countTodoli() {
 let countLi = todoList.length;
 return countLi
}

// Показывать/Скрывать кнопку удаления задач и обработчик клика
function clear() {
 let counterCheckDelo = 0;
 Array.from(todoList).forEach((elem) => {
  elem.classList.contains('check-delo') ? counterCheckDelo += 1 : false;
  buttonClear.addEventListener('click', () => {
   elem.classList.contains('check-delo') ? elem.remove() : buttonClear.classList.remove('button-conteiner-clear-active')
   tasks = tasks.filter((elem) => elem.dane === false)
   showButton();
   SavelocalStorage();
  })
 })
 counterCheckDelo >= 1 ? buttonClear.classList.add('button-conteiner-clear-active') : buttonClear.classList.remove('button-conteiner-clear-active');
 count.textContent = `${countTodoli() - counterCheckDelo} item`;
}

// Показывать/Скрывать Панель с фильтрами,счетчиком 
function showButton() {
 if (countTodoli() > 0) {
  buttonWrapper.classList.add('button-wrapper-visible')
  count.textContent = `${countTodoli()}item`
  fullDone.classList.add('full-done-visible')
 } else {
  buttonWrapper.classList.remove('button-wrapper-visible')
  count.textContent = ''
  fullDone.classList.remove('full-done-visible')
  buttonClear.classList.remove('button-conteiner-clear-active')
 }
}
// Функция проверки отметки задачи
function checkCheked(elem) {
 if (elem.checked) {
  elem.closest('.todo-li').classList.add('check-delo');
 } else {
  elem.closest('.todo-li').classList.remove('check-delo');
 }
}

// Чекбокс отметки всех задач
fullDone.addEventListener('click', () => {
 const done = Array.from(document.querySelectorAll('.done'))
 tasks.forEach((elem) => {
  if (fullDone.checked === true) {
   elem.dane = true
  } else if (fullDone.checked === false) {
   elem.dane = false
  }
 })
 done.forEach((elem) => {
  if (fullDone.checked === true) {
   elem.checked = true
  } else if (fullDone.checked === false) {
   elem.checked = false
  }
  checkCheked(elem);
 })
 clear();
 SavelocalStorage();
})

// Все задачи отмечены/ничего не отмечено
function fullCheckTodo() {
 let count = 0
 tasks.forEach((elem) => {
  elem.dane === true ? count += 1 : null
 })
 count === tasks.length ? fullDone.checked = true : fullDone.checked = false
}


function SavelocalStorage() {
 localStorage.setItem('tasks', JSON.stringify(tasks))
}