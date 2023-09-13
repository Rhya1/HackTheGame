let validationBox = document.querySelector(".check-validi");
let campoPassword = document.getElementById("campoPassword");
let listaControlli = document.querySelector(".listaControlli").getElementsByTagName("li");
let lowerCount = 0,
    numberCount = 0,
    upperCount = 0;
let icon = document.querySelector(".icon");
let mostra = true;


icon.addEventListener("click", () => {
  if (mostra) {
    campoPassword.type = "text";
    mostra = false;
  } else {
    campoPassword.type = "password";
    mostra = true;
  }
  icon.querySelector(".mostra").classList.toggle("nascondi");
  icon.querySelector(".slash").classList.toggle("nascondi");
});



campoPassword.addEventListener("focus", () => {
  validationBox.classList.remove("nascondi");
});

campoPassword.addEventListener("focusout", () => {
  validationBox.classList.add("nascondi");
}); 



campoPassword.addEventListener("input", () => {
  let value = campoPassword.value.trim();
  let ultimoCarattere = value.slice(value.length - 1);
  let index = checkUltimoCarattere(ultimoCarattere);

  if (value.length != 0) {
    listaControlli[index].classList.add("checked");
    campoPassword.addEventListener("keydown", condizioniNonVerificate);
  } else {
    campoPassword.removeEventListener("keydown", condizioniNonVerificate);
    resetValues();
  }

  if (value.length >= 8) {
    listaControlli[3].classList.add("checked");
  } else {
    listaControlli[3].classList.remove("checked");
  }
});

function condizioniNonVerificate(event) {
  let value = campoPassword.value.trim();
  let index = checkUltimoCarattere(value.slice(value.length - 1));

  if (event.key == "Backspace") {
    contatoreDecremento(index);
    checkCount();
  } else {
    contatoreIncremento(index);
  }
}

function checkUltimoCarattere(ultimoCarattere) {
  if (!Number.isNaN(Number(ultimoCarattere))) {
    return 2;

  } else if (ultimoCarattere === ultimoCarattere.toUpperCase()) {
    return 1;

  } else if (ultimoCarattere === ultimoCarattere.toLowerCase()) {
    return 0;
  }
}

function contatoreIncremento(index) {
  switch (index) {
    case 0:
    lowerCount++;
    console.log("lower Count is ", lowerCount);
    break;
    case 1:
    upperCount++;
    console.log("upper Count is ", upperCount);
    break;
    case 2:
    numberCount++;
    console.log("number Count is ", numberCount);
    break;
  }
}

function contatoreDecremento(index) {
  switch (index) {
    case 0:
    lowerCount--;
    console.log("lower Count is ", lowerCount);
    break;
    case 1:
    upperCount--;
    console.log("upper Count is ", upperCount);
    break;
    case 2:
    numberCount--;
    console.log("number Count is ", numberCount);
    break;
  }
}

function checkCount() {
  if (lowerCount <= 1) {
    listaControlli[0].classList.remove("checked");
    lowerCount = 0;
  }

  if (upperCount <= 1) {
    listaControlli[1].classList.remove("checked");
    upperCount = 0;
  }

  if (numberCount <= 1) {
    listaControlli[2].classList.remove("checked");
    numberCount = 0;
  }
}

function resetValues() {
  lowerCount = 0;
  upperCount = 0;
  numberCount = 0;

  for (let i = 0; i < listaControlli.length; i++) {
  listaControlli[i].classList.remove("checked");
  }
}



