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
  tabela.innerHTML = "";
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

const dodajTag = () => {
  let addBtn = document.querySelector(".addBtn");

  addBtn.addEventListener("click", () => {
    let tags = document.querySelector("#tagovi");
    let tag = document.createElement("div");
    tag.classList.add("tags");

    let tagText = document.createElement("p");

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("removeBtn");

    let tagInput = document.querySelector("input[name='tag']");
    tagText.textContent = tagInput.value;

    tag.appendChild(tagText);
    tag.appendChild(removeBtn);

    removeBtn.addEventListener("click", () => {
      tags.removeChild(tag);
    });

    tags.appendChild(tag);
    tagInput.value = "";
  });
};

const dodajTuru = () => {
  let submitBtn = document.querySelector("#novaTura");
  dodajTag();

  submitBtn.addEventListener("click", (e) => {
    let forma = document.querySelector("form");
    if (forma.checkValidity()) {
      e.preventDefault();

      const formData = new FormData(forma);
      let naziv = formData.get("naziv");
      let opis = formData.get("opis");
      let duzina = formData.get("duzina");

      let tagsParent = document.querySelector("#tagovi");
      let tags = document.querySelectorAll(".tags");
      let tagovi = [...tags].map((tag) => {
        return tag.textContent.substring(0, tag.textContent.length - 1);
      });

      ture.push(new Tura(naziv, opis, duzina, tagovi));
      saveToStorage(ture);
      createRows(ture);
      forma.reset();
      tagsParent.innerHTML = "";
    }
  });
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
  dodajTuru();
};

document.addEventListener("DOMContentLoaded", initializeTable);
