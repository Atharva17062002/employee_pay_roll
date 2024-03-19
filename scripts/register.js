function validateName() {
    var nameInput = $('#name');
    var nameError = $('#nameError');

    nameError.text('');

    var nameValue = nameInput.val().trim();

    var nameRegex = /^[a-zA-Z]{3,}$/;

    if (!nameRegex.test(nameValue)) {
        nameError.text('Enter a proper name');
        
    }
}

$('#submit').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var dataArray = [];
    var name = $('#name').val();
    var selectedProfile = $('input[name="profile"]:checked').val();
    var sal = $('#salary').val();
    

    var checkedBoxes = $('input[type="checkbox"]:checked');
    checkedBoxes.each(function () {
        dataArray.push($(this).val());
    });
    

    var gender = $('input[name="gender"]:checked').val();
    var day = $('select[name="start-date-day"]').val();
    var month = $('select[name="start-date-month"]').val();
    var year = $('select[name="start-date-year"]').val();  
    var notesVal = $('#notes').val();

    
    var result = {
        name:name,
        profile:selectedProfile,
        salary:sal,
        department:dataArray,
        gender:gender,
        day: day,
        month: month,
        year: year,
        notes:notesVal
    }
    const itemId = window.location.search.split("=")[1];

    if(itemId!= undefined) {
        $.ajax({
            type:'PUT',
            url:`http://127.0.0.1:3000/user/${itemId}`,
            data:JSON.stringify(result),
            contentType: 'application/json'
        });
    }else{
        $.ajax({
            type:'POST',
            url:'http://localhost:3000/user',
            data:JSON.stringify(result),
            contentType: 'application/json'
        });    
    }

    window.location.href = "/pages/pay_roll_form.html";
});

$(window).on('load', () => {
  // Fetch item details using itemId
  const itemId = window.location.search.split("=")[1];
  if (itemId != undefined) {
  fetch(`http://127.0.0.1:3000/user/${itemId}` ,{method: "GET"})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Populate form fields with retrieved data
      // return
      document.getElementById("name").value = data.name;
      // Assuming 'profile' is the profile image URL
      document.querySelector(
        `input[name="profile"][value="${data.profile}"]`
      ).checked = true;
      document.querySelector(
        `input[name="gender"][value="${data.gender}"]`
      ).checked = true;
    
    document.querySelectorAll("[name=gender]").forEach((genderEle) => {
        if (genderEle.value == data.gender) {
            genderEle.checked = true;
        }
    })
    
    data.department.forEach((dept) => {
        document.querySelector(`[name=${dept}]`).checked = true;
      });
    document.getElementById("salary").value = data.salary;
      document.getElementById("start-day").value = data.day;
      document.getElementById("start-month").value = data.month;
      document.getElementById("start-year").value = data.year;
      document.getElementById("notes").value = data.notes;

      // Scroll to the top of the form for better visibility
      document.querySelector(".form").scrollIntoView({
        behavior: "smooth",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
})