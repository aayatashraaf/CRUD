var inputName = document.getElementById("inputName");
var inputCat = document.getElementById("inputCat");
var inputPrice = document.getElementById("inputPrice");
var inputDesc = document.getElementById("inputDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var prouductContiner = [];
var currentIndex;

if (localStorage.getItem("myProducts") != null) {
  prouductContiner = JSON.parse(localStorage.getItem("myProducts"));
  display();
}

function add() {
  var product = {
    name: inputName.value,
    cat: inputCat.value,
    price: inputPrice.value,
    desc: inputDesc.value,
  };

  prouductContiner.push(product);
  localStorage.setItem("myProducts", JSON.stringify(prouductContiner));
  display();
  clearForm();
}

function prepareUpdate(index) {
  var product = prouductContiner[index];
  inputName.value = product.name;
  inputCat.value = product.cat;
  inputPrice.value = product.price;
  inputDesc.value = product.desc;

  currentIndex = index;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function update() {
  prouductContiner[currentIndex].name = inputName.value;
  prouductContiner[currentIndex].cat = inputCat.value;
  prouductContiner[currentIndex].price = inputPrice.value;
  prouductContiner[currentIndex].desc = inputDesc.value;

  localStorage.setItem("myProducts", JSON.stringify(prouductContiner));
  display();
  clearForm();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function deleteBtn(index) {
  prouductContiner.splice(index, 1);
  localStorage.setItem("myProducts", JSON.stringify(prouductContiner));
  display();
}

function display() {
  var cartona = ``;
  for (var i = 0; i < prouductContiner.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${prouductContiner[i].name}</td>
        <td>${prouductContiner[i].price}</td>
        <td>${prouductContiner[i].cat}</td>
        <td>${prouductContiner[i].desc}</td>
        <td><button onclick="prepareUpdate(${i})" class="btn btn-outline-warning text-warning btn-sm mt-2 mb-2">Update</button></td>
        <td><button onclick="deleteBtn(${i})" class="btn btn-outline-danger text-danger btn-sm mt-2 mb-2">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function search(searchTerm) {
  var cartona = ``;
  for (var i = 0; i < prouductContiner.length; i++) {
    if (prouductContiner[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      let highlighted = prouductContiner[i].name.replace(
        new RegExp(searchTerm, "gi"),
        match => `<span class="bg-warning text-dark">${match}</span>`
      );
      cartona += `
        <tr>
          <td>${i + 1}</td>
          <td>${highlighted}</td>
          <td>${prouductContiner[i].price}</td>
          <td>${prouductContiner[i].cat}</td>
          <td>${prouductContiner[i].desc}</td>
          <td><button onclick="prepareUpdate(${i})" class="btn btn-outline-warning text-warning btn-sm mt-2 mb-2">Update</button></td>
          <td><button onclick="deleteBtn(${i})" class="btn btn-outline-danger text-danger btn-sm mt-2 mb-2">Delete</button></td>
        </tr>
      `;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function clearForm() {
  inputName.value = '';
  inputCat.value = '';
  inputPrice.value = '';
  inputDesc.value = '';
}
function validateProuductName() {
  var regx = /^[A-Z][a-zA-Z]{7}$/;
  var alert = document.getElementById("nameAlert");

  if (regx.test(inputName.value)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    alert.classList.add("d-none");
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    alert.classList.remove("d-none");
  }
}

