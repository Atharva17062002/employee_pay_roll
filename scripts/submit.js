document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      var name = document.getElementById('name').value;
      var gender = document.querySelector('input[name="gender"]:checked').value;
      var department = document.querySelector('input[name="department"]:checked').value;
      var salary = document.getElementById('salary').value;
      var startDateDay = document.getElementById('start-date-day').value;
      var startDateMonth = document.getElementById('start-date-month').value;
      var startDateYear = document.getElementById('start-date-year').value;
      var notes = document.getElementById('notes').value;
  
      var formData = {
        name: name,
        gender: gender,
        department: department,
        salary: salary,
        startDate: startDateDay + ' ' + startDateMonth + ' ' + startDateYear,
        notes: notes
      };
  
      console.log(formData);
    });
  });
  