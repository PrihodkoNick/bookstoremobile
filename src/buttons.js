// Add your javascript here
const idRoot = document.getElementById('root');

function buttonClick(e) {
  alert(e.currentTarget.getAttribute('name'));
}

function createButton(id) {
  const button = document.createElement('button');
  button.setAttribute('id', `button-${id}`);
  button.setAttribute('name', id);
  button.setAttribute('class', 'btn');
  button.innerText = id;
  button.addEventListener('click', (e) => buttonClick(e));

  return button;
}

function render() {
  for (let i = 1; i <= 20; i++) {
    idRoot.append(createButton(i));
  }
}

render();