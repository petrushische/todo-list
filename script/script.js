const container = document.querySelector('.container-all');
const containerActiv = document.querySelector('.container-active');
const containerComplete = document.querySelector('.container-completed');

const template = document.querySelector('.template').content;

const buttonWrapper = document.querySelector('.button-wrapper');

const count = document.querySelector('.count');

const fullDone = document.querySelector('.full-done');

const todoList = container.children

const buttonClear = buttonWrapper.querySelector('.button-conteiner-clear')

const buttonDefault = document.querySelector('.button-conteiner-all');
const buttonActive = document.querySelector('.button-conteiner-active');
const buttonComplet = document.querySelector('.button-conteiner-completed');


function renderCompleted() {
 Array.from(todoList).forEach((elem) => {
  if (window.location.href === 'http://127.0.0.1:5500/index.html#/') {
   elem.style = 'display:flex'
  } else if (window.location.href === 'http://127.0.0.1:5500/index.html#/active') {
   elem.classList.contains('check-delo') ? elem.style = 'display:none' : elem.style = 'display:flex';
  } else if (window.location.href === 'http://127.0.0.1:5500/index.html#/completed') {
   elem.classList.contains('check-delo') ? elem.style = 'display:flex' : elem.style = 'display:none'
  }
 })
}

setInterval(function () {
 if (window.location.href === 'http://127.0.0.1:5500/index.html#/') {
  buttonDefault.classList.add('button-conteiner-on')
  buttonActive.classList.remove('button-conteiner-on')
  buttonComplet.classList.remove('button-conteiner-on')
  console.log(window.location.href)
 } else if (window.location.href === 'http://127.0.0.1:5500/index.html#/active') {
  buttonActive.classList.add('button-conteiner-on')
  buttonDefault.classList.remove('button-conteiner-on')
  buttonComplet.classList.remove('button-conteiner-on')
  console.log(window.location.href)
 } else if (window.location.href === 'http://127.0.0.1:5500/index.html#/completed') {
  buttonComplet.classList.add('button-conteiner-on')
  buttonActive.classList.remove('button-conteiner-on')
  buttonDefault.classList.remove('button-conteiner-on')
  console.log(window.location.href)
 }
 renderCompleted()
}, 10);





function countTodoli() {
 let countLi = todoList.length
 return countLi
}

function clear() {
 let counterCheckDelo = 0;
 Array.from(todoList).forEach((elem) => {
  elem.classList.contains('check-delo') ? counterCheckDelo += 1 : false;
 })
 if (counterCheckDelo >= 1) {
  buttonClear.classList.add('button-conteiner-clear-active')
 } else {
  buttonClear.classList.remove('button-conteiner-clear-active')
 }
 count.textContent = `${countTodoli() - counterCheckDelo} item`
}

function showButton() {
 if (countTodoli() > 0) {
  buttonWrapper.classList.add('button-wrapper-visible')
  count.textContent = `${countTodoli()}item`
  fullDone.classList.add('full-done-visible')
 } else {
  buttonWrapper.classList.remove('button-wrapper-visible')
  count.textContent = ''
  fullDone.classList.remove('full-done-visible')
 }
}

function checkCheked(elem) {
 if (elem.checked) {
  elem.closest('.todo-li').classList.add('check-delo');
 } else {
  elem.closest('.todo-li').classList.remove('check-delo');
 }

}

function renderTemplate(item) {
 const element = template.querySelector('.todo-li').cloneNode(true);

 const paragr = element.querySelector('.case');
 paragr.id = item
 paragr.textContent = item;

 const inputChange = element.querySelector('.todo-change')

 const buttonInput = element.querySelector('.input-save')
 buttonInput.addEventListener('click', () => {
  paragr.textContent = inputChange.value
  inputChange.classList.remove('todo-change-visible')
  buttonInput.classList.remove('input-save-visible')
  if (inputChange.value === '') {
   element.remove()
  }
  showButton()
 })

 const trash = element.querySelector('.trash');
 trash.addEventListener('click', (evt) => {
  evt.target.closest('.todo-li').remove();
  showButton();
  countTodoli()
 })

 const done = element.querySelector('.done');
 done.addEventListener('click', () => {
  checkCheked(done);
  clear();

 })

 inputChange.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 13) {
   buttonInput.click()
  }
 })
 element.addEventListener('dblclick', () => {
  inputChange.classList.add('todo-change-visible')
  buttonInput.classList.add('input-save-visible')
  inputChange.value = paragr.textContent
 })
 return element
}


function render(item) {
 container.append(renderTemplate(item))
}

const form = document.querySelector('.form');
const input = form.querySelector('.name');
form.addEventListener('submit', (evt) => {
 evt.preventDefault();
 render(input.value)
 form.reset();
 showButton();
 countTodoli()
})

// 

function CallBack(evt) {
 if (evt.target.checked === false) {
  fullDone.checked = false
 } else {
 }
}

fullDone.addEventListener('click', () => {
 Array.from(todoList).forEach((element) => {
  const check = element.querySelector('.done')
  if (fullDone.checked === true) {
   check.checked = true;
   check.addEventListener('click', CallBack)
  } else if (fullDone.checked === false) {
   check.removeEventListener('click', CallBack)
   check.checked = false;
  }
  checkCheked(check);

 })
 clear();
})




buttonClear.addEventListener('click', () => {
 Array.from(todoList).forEach((elem) => {
  elem.classList.contains('check-delo') ? elem.remove() : buttonClear.classList.remove('button-conteiner-clear-active')
 })
 if (countTodoli() === 0) {
  buttonWrapper.classList.remove('button-wrapper-visible')
  count.textContent = ''
  fullDone.classList.remove('full-done-visible')
  buttonClear.classList.remove('button-conteiner-clear-active')
 }
 showButton()
})
