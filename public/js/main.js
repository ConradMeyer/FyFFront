const SIGNIN = document.querySelector("#signin");
const SIGNUP = document.querySelector("#signup");
const KEYWORD = document.querySelector("#keyword");
const UBICACION = document.querySelector("#ubicacion");
const BUSCAR = document.querySelector("#btn");
const RESET = document.querySelector("#btnReset");
const RESULT = document.querySelector("#result");

// FUNCIONES
function search() { 
    fetch(`/search/${KEYWORD.value}`)
      .then(res => res.json())
      .then(res => res.map(el => pintar(el)))
      .catch(err => console.log("Algo va mal...", err))
}

async function pintar(data) {
  await document.querySelectorAll(".oferta").forEach(el => el.remove())

  let div = document.createElement("div");
  div.setAttribute("class", "oferta")

  let h2 = document.createElement("a")
  let title = document.createTextNode(data.titulo)
  h2.setAttribute("href", data.url)
  h2.appendChild(title)
  div.appendChild(h2)

  let text = document.createElement("h3")
  let resm = document.createTextNode(data.resumen)
  text.appendChild(resm)
  div.appendChild(text)

  RESULT.appendChild(div)
  
  if (sessionStorage.getItem("token")) {
    let btn = document.createElement("div")
    let btnC = document.createTextNode("SAVE")
    btn.appendChild(btnC)
    div.appendChild(btn)

    btn.addEventListener("click", ()=> favoritos(data))
  }
}

function favoritos(data) {
  const options = { 
    method: 'POST',
    body: JSON.stringify({titulo: data.titulo, resumen: data.resumen, url: data.url}),
    headers:{'Content-Type': 'application/json'}
  }

fetch("/favorito", options)
  .then(res => res.json())
  .then(res => res.map(el =>pintar(el)))
  .catch(err => console.log("Algo va mal...", err))
}

function logout () {
  fetch("/logout", {
    method: 'PUT',
    headers: {
        'authorization': sessionStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        alert(data.data)
        window.location.href = data.url
    })
    .catch(err => console.log(err))
}

// EVENTOS
BUSCAR.addEventListener("click", () => search());

RESET.addEventListener("click", () => document.querySelectorAll(".oferta").forEach(el => el.remove()))

SIGNIN.addEventListener("click",() => {
    window.location.href = "sign/signin"
} )

SIGNUP.addEventListener("click",() => {
    window.location.href = "sign/signup"
} )

