const API = "http://localhost:8000/movie";
let openBtn = document.querySelector("#openBtn");
let modalClose = document.querySelector("#modal_close");
let modalPop = document.querySelector("#modal-pop");
let searchInput = document.querySelector("#search__input");
let movieTitles = document.querySelectorAll(".movies_tittle");
let name = document.querySelector("#name");
let lastName = document.querySelector("#lastName");
let login = document.querySelector("#login");
let password = document.querySelector("#password");
let registr = document.querySelector(".registr");
let body = document.querySelector("body");
let li = document.querySelector("li");
let inpImg = document.querySelectorAll("#inpImg");
let inpName = document.querySelectorAll("#inpName");
let inpJanr = document.querySelectorAll("#inpJanr");
let btnAdd = document.querySelector("#btnAdd");
let btnOpenForm = document.querySelector("#collapseThree");
openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modalPop.classList.add("active");
});
modalClose.addEventListener("click", () => {
  modalPop.classList.remove("active");
});
// !  SEARCH
document.addEventListener("DOMContentLoaded", function () {
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim().toLowerCase();
    movieTitles.forEach(function (title) {
      let titleText = title.innerText.toLowerCase();
      if (titleText.includes(searchValue)) {
        title.style.display = "block";
      } else {
        title.style.display = "none";
      }
    });
  });
});

// ! REGISTRATION
let users = {};

function User(name, lastName, login, password) {
  this.name = name;
  this.lastName = lastName;
  this.login = login;
  this.password = password;
}
function createId(users) {
  return Object.keys(users).length;
}
registr.addEventListener("click", () => {
  let nameUser = name.value;
  let lastNameUser = lastName.value;
  let loginUser = login.value;
  let passwordUser = password.value;
  let user = new User(nameUser, lastNameUser, loginUser, passwordUser);
  if (
    !name.value.trim() ||
    !lastName.value.trim() ||
    !login.value.trim() ||
    !password.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  let userId = "User" + createId(users);
  users[userId] = user;
  console.log(users);
  alert(`${nameUser}, вы успешно зарегистрировались`);
});

btnAdd.addEventListener("click", () => {
  let movie = {
    movieName: inpImg.value,
    movie: inpName.value,
    janr: inpJanr.value,
  };
  createMovie(movie);
  //   readMovie();
});

// !CREATE
function createMovie(movie) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(movie),
  });
  inpImg.value = "";
  inpName.value = "";
  inpJanr.value = "";
  btnOpenForm.classList.toggle("show");
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnAdd").addEventListener("click", function () {
    addMovie();
  });
  function addMovie() {
    const inpImg = document.getElementById("inpImg").value;
    const inpName = document.getElementById("inpName").value;
    const inpJanr = document.getElementById("inpJanr").value;

    if (inpImg && inpName && inpJanr) {
      const newMovie = document.createElement("div");
      newMovie.classList.add("movieList__item");
      newMovie.innerHTML = `
          <img src="${inpImg}" width="300px" alt="" />
          <div class="movies_tittle">
            <p>${inpName}</p>
            <p>${inpJanr}</p>
          </div>
          <button class="btn btn-danger" onclick="deleteMovie(this)">Удалить</button>
        `;
      document.querySelector(".movieList__first").appendChild(newMovie);

      document.getElementById("inpImg").value = "";
      document.getElementById("inpName").value = "";
      document.getElementById("inpJanr").value = "";
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  }
  window.deleteMovie = function (element) {
    element.parentElement.remove();
  };
});
