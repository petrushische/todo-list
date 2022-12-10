const container = document.querySelector('.container');

const template = document.querySelector('.template').content;

const buttonWrapper = document.querySelector('.button-wrapper');

const count = document.querySelector('.count');

const fullDone = document.querySelector('.full-done');



function showButton() {
 let counter = container.children.length;
 if (counter > 0) {
  buttonWrapper.classList.add('button-wrapper-visible')
  count.textContent = `${counter} items`
  fullDone.classList.add('full-done-visible')

 } else {
  buttonWrapper.classList.remove('button-wrapper-visible')
  count.textContent = ''
  fullDone.classList.remove('full-done-visible')
 }
}



function renderTemplate(item) {
 const element = template.querySelector('.todo-li').cloneNode(true);
 const paragr = element.querySelector('.case');
 paragr.textContent = item;
 const trash = element.querySelector('.trash');
 trash.addEventListener('click', (evt) => {
  evt.target.closest('.todo-li').remove();
  showButton()
 })
 const done = element.querySelector('.done');
 done.addEventListener('click', () => {
  paragr.classList.toggle('check-delo')
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
 showButton()
})


