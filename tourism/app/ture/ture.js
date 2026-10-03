class Tura {
  constructor(naziv, opis, duzina, tagovi) {
    this.naziv = naziv;
    this.opis = opis;
    this.duzina = duzina;
    this.tagovi = tagovi;
  }
}

let ture = [];

const saveToStorage = (ture) => {
  localStorage.setItem("ture", JSON.stringify(ture));
};

const prikaziDetalje = (tura) => {
  let detalji = document.querySelector(".details");
  detalji.innerHTML = "";

  let naziv = document.createElement("h4");
  let opis = document.createElement("p");
  opis.className = "opis";
  let duzina = document.createElement("p");
  let tagovi = document.createElement("p");
  tagovi.className = "tagovi";

  naziv.textContent = "Naziv:" + tura.naziv;
  opis.textContent = "Opis:" + tura.opis;
  duzina.textContent = "Duzina:" + tura.duzina + "km";
  tagovi.textContent = "Tagovi:" + tura.tagovi;

  detalji.appendChild(naziv);
  detalji.appendChild(opis);
  detalji.appendChild(duzina);
  detalji.appendChild(tagovi);
  detalji.style.display = "block";
};

const createRows = (ture) => {
  let tabela = document.querySelector(".tours-data");

  for (let i = 0; i < ture.length; i++) {
    let tr = document.createElement("tr");

    let naziv = document.createElement("td");
    let duzina = document.createElement("td");

    naziv.textContent = ture[i].naziv;
    duzina.textContent = ture[i].duzina + "km";

    tr.appendChild(naziv);
    tr.appendChild(duzina);

    tr.addEventListener("click", () => {
      prikaziDetalje(ture[i]);
    });

    tabela.appendChild(tr);
  }
};
const initializeTable = () => {
  ture = JSON.parse(localStorage.getItem("ture"));
  if (!ture) {
    ture = [
      {
        naziv: "Sejseli",
        opis: "Egzoticna destinacija sa prelepim plazama",
        duzina: "1000",
        tagovi: ["egzoticno"],
      },
      {
        naziv: "Prag",
        opis: "Istorijska destinacija koja je veoma posecena",
        duzina: "500",
        tagovi: ["istorijsko"],
      },
      {
        naziv: "Japan",
        opis: "Egzoticna destinacija sa velikom kulturnom bastinom",
        duzina: "2000",
        tagovi: ["kulturno", "istorijsko"],
      },
    ];
  }
  saveToStorage(ture);
  createRows(ture);
};

document.addEventListener("DOMContentLoaded", initializeTable);
