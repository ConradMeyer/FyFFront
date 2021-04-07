const SIGNIN = document.querySelector("#signin");
const SIGNUP = document.querySelector("#signup");
const KEYWORD = document.querySelector("#keyword");
const UBICACION = document.querySelector("#ubicacion");
const BUSCAR = document.querySelector("#btn");
const RESULT = document.querySelector("#result");

function search() {
    const options = { 
        method: 'POST',
        body: JSON.stringify({keyword: KEYWORD.value, ubicacion: UBICACION.value}),
        headers:{'Content-Type': 'application/json'}
      }

    fetch("/search", options)
      .then(res => res.json())
      .then(res => res.map(el => pintar(el)))
      .catch(err => console.log(err))
}

function prueba() {
  const options = { 
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    }

  fetch("/read", options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

BUSCAR.addEventListener("click", () => prueba());

SIGNIN.addEventListener("click",() => {
    window.location.href = "sign/signin/login.html"
} )

SIGNUP.addEventListener("click",() => {
    window.location.href = "sign/signup/index.html"
} )

