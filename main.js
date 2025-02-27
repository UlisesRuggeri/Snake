let h1 = document.getElementById("puntaje");

class Tabla {
  constructor() {
    this.table = document.createElement("table");
    this.crearTabla();
    document.body.appendChild(this.table);
  }

  crearTabla() {
    for (let i = 0; i < 20; i++) {
      let fila = document.createElement("tr");
      for (let j = 0; j < 20; j++) {
        let celda = document.createElement("td");
        celda.dataset.fila = i;
        celda.dataset.columna = j;
        fila.appendChild(celda);
      }
      this.table.appendChild(fila);
    }
  }

  obtenerCelda(fila, columna) {
    return document.querySelector(
      `td[data-fila="${fila}"][data-columna="${columna}"]`
    );
  }

  snake() {
    let muerte = false;
    let puntaje = 0;
    let valor1 = 17;
    let valor2 = 12;
    let direccion = "";
    let ultimaDireccion = "";
    let cabezaDeLaSerpiente = this.obtenerCelda(valor1, valor2);
    let historialDePosicionDeCabeza = [];
    let longitudDeCuerpo = 2;
    let cuerpo = [];
    let intervalo;

    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (ultimaDireccion !== "abajo") {
            direccion = "arriba";
            ultimaDireccion = "arriba";
          }
          break;
        case "ArrowDown":
          if (ultimaDireccion !== "arriba") {
            direccion = "abajo";
            ultimaDireccion = "abajo";
          }
          break;
        case "ArrowLeft":
          if (ultimaDireccion !== "derecha") {
            direccion = "izquierda";
            ultimaDireccion = "izquierda";
          }
          break;
        case "ArrowRight":
          if (ultimaDireccion !== "izquierda") {
            direccion = "derecha";
            ultimaDireccion = "derecha";
          }
          break;
      }
    });

    intervalo = setInterval(() => {
      if (muerte) {
        let celdas = document.querySelectorAll(".cabeza, .cuerpo, .manzana");
        celdas.forEach((celda) =>
          celda.classList.remove("cabeza", "cuerpo", "manzana")
        );

        this.valor1 = 17;
        this.valor2 = 12;
        this.direccion = "";
        this.ultimaDireccion = "";
        this.historialDePosicionDeCabeza = [];
        this.longitudDeCuerpo = 2;
        this.cuerpo = [];
        this.muerte = false;
        this.cabezaDeLaSerpiente = this.obtenerCelda(this.valor1, this.valor2);
        this.cabezaDeLaSerpiente.classList.add("cabeza");
        this.generacionDeManzanas();
        clearInterval(intervalo);
        this.snake();
        return;
      }
      if (direccion !== "") {
        let ultimaPosicionDeCabeza = cabezaDeLaSerpiente;
        historialDePosicionDeCabeza.push([valor1, valor2]);

        if (historialDePosicionDeCabeza.length > longitudDeCuerpo + 1) {
          historialDePosicionDeCabeza.shift();
        }

        if (direccion === "arriba") {
          valor1--;
        } else if (direccion === "abajo") {
          valor1++;
        } else if (direccion === "izquierda") {
          valor2--;
        } else if (direccion === "derecha") {
          valor2++;
        }

        if (valor1 > 19 || valor1 < 0 || valor2 > 19 || valor2 < 0) {
          muerte = true;
          alert("chocaste contra el mapa");
        } else {
          cabezaDeLaSerpiente = this.obtenerCelda(valor1, valor2);
          cabezaDeLaSerpiente.classList.add("cabeza");
          ultimaPosicionDeCabeza.classList.remove("cabeza");

          for (let i = 0; i <= longitudDeCuerpo; i++) {
            if (historialDePosicionDeCabeza[i] === undefined) {
              break;
            }
            cuerpo[i] = this.obtenerCelda(
              historialDePosicionDeCabeza[i][0],
              historialDePosicionDeCabeza[i][1]
            );
            cuerpo[i].classList.add("cuerpo");
          }
          cuerpo[cuerpo.length - cuerpo.length].classList.remove("cuerpo");
        }

        ///////////////////////////////////////////////////////////

        if (cabezaDeLaSerpiente.classList.contains("manzana")) {
          longitudDeCuerpo++;
          cabezaDeLaSerpiente.classList.remove("manzana");
          puntaje++;
          h1.textContent = 'puntaje: '+puntaje;
          this.generacionDeManzanas();
        } else if (cabezaDeLaSerpiente.classList.contains("cuerpo")) {
          alert("chocaste con tu cuerpo");
          muerte = true;
        }
      }
    
    }, 300);
  }

  generacionDeManzanas() {
    let numeroAleatorio1 = Math.floor(Math.random() * 20);
    let numeroAleatorio2 = Math.floor(Math.random() * 20);
    let manzana = this.obtenerCelda(numeroAleatorio1, numeroAleatorio2);
    manzana.classList.add("manzana");
  }
}

const tabla = new Tabla();
tabla.snake();
tabla.generacionDeManzanas();
