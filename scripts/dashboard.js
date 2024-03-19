fetch("/database/custom.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.user.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <tr>
                      <td>
                        <div class="photu">
                          <img
                            src="${item.profile}"
                            alt="women_img_2"
                            width="50px"
                            style="clip-path: circle()"
                          />
                        </div>
                      </td>
                      <td>${item.name}</td>
                      <td>${item.gender}</td>
                      <td>
                      <div class="dept">
                      ${item.department
                        .map((dept) => `<div>${dept}</div>`)
                        .join("")}
                        </div>
                      </td>
                      <td>₹ ${item.salary}</td>
                      <td>${item.day} ${item.month} ${item.year}</td>
                      <td>
                        <div class="bin_pen">
                        <button class="edit-icon" data-id="${item.id}">
                          <img src="/assets/icons8-edit.svg" alt = "Update"/>
                        </button>
                        <button class="delete-icon" data-id="${item.id}">
                            <img src="/assets/icons8-delete.svg" alt="Delete">
                        </button>
                        
                        </div>
                      </td>
                    </tr>
                    `;
      document.querySelector("#emp-table").appendChild(row);
    });
    document.querySelectorAll(".delete-icon").forEach((icon) => {
      icon.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        deleteRow(itemId);
      });
    });

    document.querySelectorAll(".edit-icon").forEach((icon) => {
      icon.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        // editRow(itemId);
        window.location.href = `/pages/index.html?id=${itemId}`;
      });
    });
  });

function deleteRow(itemId) {
  fetch(`http://127.0.0.1:3000/user/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Row deleted successfully");
        // Optionally, you can remove the row from the table here
      } else {
        console.error("Failed to delete row");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// function editRow(itemId) {
//   // Fetch item details using itemId
//   fetch(`http://127.0.0.1:3000/user/${itemId}` ,{method: "GET"})
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Populate form fields with retrieved data
//       console.log(data);
//       window.location.href = `/pages/index.html?id=${itemId}`;
//       // return
//       document.getElementById("name").value = data.name;
//       // Assuming 'profile' is the profile image URL
//       document.querySelector(
//         `input[name="profile"][value="${data.profile}"]`
//       ).checked = true;
//       document.querySelector(
//         `input[name="gender"][value="${data.gender}"]`
//       ).checked = true;
//       data.department.forEach((dept) => {
//         document.getElementById(dept).checked = true;
//       });
//       document.getElementById("salary").value = data.salary;
//       document.getElementById("start-day").value = data.day;
//       document.getElementById("start-month").value = data.month;
//       document.getElementById("start-year").value = data.year;
//       document.getElementById("notes").value = data.notes;

//       // Scroll to the top of the form for better visibility
//       document.querySelector(".form").scrollIntoView({
//         behavior: "smooth",
//       });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
