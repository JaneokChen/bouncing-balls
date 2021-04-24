let textBox = document.getElementById('textBox');
let text = textBox.value;
let submit = document.getElementById('submit');


submit.addEventListener('click', (event)=>{
  alert(text);
})
