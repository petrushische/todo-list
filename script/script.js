const todoList = ['Проснуться в 7:00',
 'Умыться и позавтракать',
 'Погулять с собакой',
 'Собраться в Универ'
]

const container = document.querySelector('.container');


const template = document.querySelector('.template').content;

function renderTemplate(item) {
 const element = template.querySelector('.todo-list').cloneNode(true);
 const paragr = element.querySelector('.case');
 paragr.textContent = item;
 const trash = element.querySelector('.trash');
 trash.addEventListener('click', (evt) => {
  evt.target.closest('.todo-list').remove();
 })
 const done = element.querySelector('.done');
 done.addEventListener('click', () => {
  paragr.setAttribute('style', 'text-decoration: line-through;')
 })
 return element;
}

function render(item) {
 container.append(renderTemplate(item))
}

todoList.forEach((element) => {
 render(element);
})

const form = document.querySelector('.form');
const input = form.querySelector('.name');
form.addEventListener('submit', (evt) => {
 evt.preventDefault();
 render(input.value)
 form.reset();
})