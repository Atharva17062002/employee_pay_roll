const nameInput = document.getElementById('name');
const nameComment = document.getElementById('nameComment');

nameInput.addEventListener('input', function() {
  const inputValue = this.value;
  
  if (inputValue.match(/[A-Za-z]{3}/)) {
    nameComment.textContent = '';
    nameComment.style.color = 'green';
  } else {
    nameComment.textContent = 'Name must contain at least 3 alphabetical characters.';
    nameComment.style.color = 'red';
  }
});
