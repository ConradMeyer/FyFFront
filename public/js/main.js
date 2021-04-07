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
      .then(res => res.map(el => pintar(el)))
      .catch(err => console.log(err))
}

function pintar(data) {
  let div = document.createElement("div");
  div.setAttribute("class", "oferta")

  let h2 = document.createElement("h2")
  let title = document.createTextNode(data.titulo)
  h2.appendChild(title)
  div.appendChild(h2)

  let text = document.createElement("h3")
  let resm = document.createTextNode(data.resumen)
  text.appendChild(resm)
  div.appendChild(text)

  RESULT.appendChild(div)
}

BUSCAR.addEventListener("click", () => search());

SIGNIN.addEventListener("click",() => {
    window.location.href = "sign/signin/login.html"
} )

SIGNUP.addEventListener("click",() => {
    window.location.href = "sign/signup/index.html"
} )

