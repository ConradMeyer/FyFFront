const SIGNIN = document.querySelector("#signin");
const SIGNUP = document.querySelector("#signup");
const KEYWORD = document.querySelector("#keyword");
const UBICACION = document.querySelector("#ubicacion");
const BUSCAR = document.querySelector("#btn");
const RESULT = document.querySelector("#result");

function search() {
    const options = { 
        method: 'POST',
        body: JSON.stringify({keyword: KEYWORD.value}),
        headers:{'Content-Type': 'application/json'}
      }

    fetch("/search", options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
}

function pintar(data) {


}

BUSCAR.addEventListener("click", () => search());

SIGNIN.addEventListener("click",() => {
    window.location.href = "sign/signin/login.html"
} )

SIGNUP.addEventListener("click",() => {
    window.location.href = "sign/signup/index.html"
} )

