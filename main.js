window.onload = function () {
  document.getElementById("aniosMin").focus();
};

let minimo;
let resultado;
let factor;
let modificador;
let descripcion;

function establecerFactor() {
  let modificadores = document.getElementsByName("modificador");
  for (var i = 0; i < modificadores.length; i++) {
    if (modificadores[i].checked) {
      console.log(modificadores[i].value);
      modificador = modificadores[i].value;
      break;
    }
  }

  switch (modificador) {
    case "auntercio":
      descripcion = "reducir a un tercio";
      factor = 3;
      break;

    case "menosmitad":
      descripcion = "reducir a la mitad";
      factor = 2;
      break;
    case "menostercio":
      descripcion = "reducir en un tercio";
      factor = 3;
      break;
    case "mastercio":
      descripcion = "aumentar en un tercio";
      factor = 3;
      break;
    case "masmedio":
      descripcion = "aumentar en un medio";
      factor = 2;
      break;
    case "doble":
      descripcion = "aumentar al doble";
      factor = 2;
      break;

    default:
      break;
  }
  calcular();
}

function calcular() {
  let aniosMin = Number(document.getElementById("aniosMin").value);
  let mesesMin = Number(document.getElementById("mesesMin").value);
  let diasMin = Number(document.getElementById("diasMin").value);
  let diasRestantes;
  //establecerFactor();

  // paso todo a meses y lo sumo
  let mesesTotMin = aniosMin * 12 + mesesMin;

  // bifurcacion para ver que tipo de operaciòn es(suma resta) y en su caso qué fracción le aplico
  if (modificador == "menostercio" || modificador == "menosmitad") {
    // si le resto un tercio o un medio: le resto la fracción
    resultado = mesesTotMin - mesesTotMin / factor;
  }
  if (modificador == "mastercio" || modificador == "masmedio") {
    // si le sumo un tercio o un medio: le sumo la fracción
    resultado = mesesTotMin + mesesTotMin / factor;
  }

  if (modificador == "auntercio") {
    // si lo reduzco a un tercio: le resto 2 tercios
    resultado = mesesTotMin - (mesesTotMin / factor) * 2;
  }

  if (modificador == "doble") {
    // si lo duplico
    resultado = mesesTotMin * 2;
  }

  // calculo la cantidad de años extrayendo la parte entera de dividir los meses totales por 12
  let resultadoEnAnios = Math.trunc(resultado / 12);

  // calculo los meses restantes restándole al resultado la parte entera multiplicada por 12
  let resultadoEnMeses = resultado - resultadoEnAnios * 12;

  // calculo los días restantes separándole al resultado en meses la parte decimal y luego multiplicándola por treinta
  let decimalMeses = resultadoEnMeses - Math.trunc(resultadoEnMeses);

  // el resto de los días en caso de haber los calculo y en su caso los sumo
  if (modificador == "menostercio" || modificador == "menosmitad") {
    // si le resto un tercio o un medio: le resto la fracción
    diasRestantes = decimalMeses * 30 + diasMin - diasMin / factor;
  }
  if (modificador == "mastercio" || modificador == "masmedio") {
    // si le resto un tercio o un medio: le resto la fracción
    diasRestantes = decimalMeses * 30 + diasMin + diasMin / factor;
  }
  if (modificador == "auntercio") {
    // si le resto dos tercios: le resto la fracción por dos
    diasRestantes = decimalMeses * 30 + diasMin + (diasMin / factor) * 2;
  }

  if (modificador == "doble") {
    // si lo duplico

    diasRestantes = decimalMeses * 30 + diasMin * 2;
    // console.log(resultado,diasRestantes,decimalMeses,diasMin)
  }

  /*   document.getElementById(
    "resultados"
  ).innerHTML = `<strong>(${mesesTotMin} meses) ${descripcion} <br>
  ${resultado} meses, lo que equivale a ${resultadoEnAnios} años y ${Math.trunc(
    resultadoEnMeses
  )} meses y ${Math.trunc(Math.floor(diasRestantes))} dias</strong>`; */

  setResults(resultadoEnAnios, resultadoEnMeses, diasRestantes);
}

function setResults(resultadoEnAnios, resultadoEnMeses, diasRestantes) {
  let resultados = document.getElementById("resultados");

  // 1- si año y mes y días son cero
  if (
    resultadoEnAnios === 0 &&
    Math.trunc(resultadoEnMeses) === 0 &&
    Math.trunc(Math.round(diasRestantes)) === 0
  ) {
    resultados.innerHTML = "ingrese un período";
  }

  // 2- si año y mes son cero y días son distinto de cero
  if (
    resultadoEnAnios === 0 &&
    Math.trunc(resultadoEnMeses) === 0 &&
    Math.trunc(Math.round(diasRestantes)) !== 0
  ) {
    resultados.innerHTML = `${Math.trunc(Math.floor(diasRestantes))} dias`;
  }

  // 3- si año es cero pero mes no es cero pero días si es cero
  if (
    resultadoEnAnios === 0 &&
    Math.trunc(resultadoEnMeses) !== 0 &&
    Math.trunc(Math.round(diasRestantes)) === 0
  ) {
    if (resultadoEnMeses === 1) {
      resultados.innerHTML = ` ${Math.trunc(resultadoEnMeses)} mes`;
    } else {
      resultados.innerHTML = ` ${Math.trunc(resultadoEnMeses)} meses`;
    }
  }

  // 4- si año es cero pero mes no es cero pero días no es cero
  if (
    resultadoEnAnios === 0 &&
    Math.trunc(resultadoEnMeses) !== 0 &&
    Math.trunc(Math.round(diasRestantes)) !== 0
  ) {
    if (resultadoEnMeses === 1) {
      resultados.innerHTML = ` ${Math.trunc(
        resultadoEnMeses
      )} mes y ${Math.trunc(Math.round(diasRestantes))} dias`;
    } else {
      resultados.innerHTML = ` ${Math.trunc(
        resultadoEnMeses
      )} meses y ${Math.trunc(Math.round(diasRestantes))} dias`;
    }
  }

  // 5- si año no es cero pero mes es cero pero días es cero
  if (
    resultadoEnAnios !== 0 &&
    Math.trunc(resultadoEnMeses) === 0 &&
    Math.trunc(Math.round(diasRestantes)) === 0
  ) {
    if (resultadoEnAnios === 1) {
      resultados.innerHTML = `${resultadoEnAnios} año`;
    } else {
      resultados.innerHTML = `${resultadoEnAnios} años`;
    }
  }

  // 6- si año no es cero pero mes no es cero pero días no es cero
  if (
    resultadoEnAnios !== 0 &&
    Math.trunc(resultadoEnMeses) !== 0 &&
    Math.trunc(Math.round(diasRestantes)) !== 0
  ) {
    if (resultadoEnAnios === 1 && resultadoEnMeses === 1) {
      resultados.innerHTML = `${resultadoEnAnios} año, ${Math.trunc(
        resultadoEnMeses
      )} mes y ${Math.trunc(Math.round(diasRestantes))} dias`;
    }
    if (resultadoEnAnios === 1 && resultadoEnMeses !== 1) {
      resultados.innerHTML = `${resultadoEnAnios} año, ${Math.trunc(
        resultadoEnMeses
      )} meses y ${Math.trunc(Math.round(diasRestantes))} dias`;
    }
    if (resultadoEnAnios !== 1 && resultadoEnMeses !== 1) {
      resultados.innerHTML = `${resultadoEnAnios} años, ${Math.trunc(
        resultadoEnMeses
      )} meses y ${Math.trunc(Math.round(diasRestantes))} dias`;
    }
  }
  // 7- si año no es cero mes no es cero pero días es cero
  if (
    resultadoEnAnios !== 0 &&
    Math.trunc(resultadoEnMeses) !== 0 &&
    Math.trunc(Math.round(diasRestantes)) === 0
  ) {
    if (resultadoEnAnios === 1 && resultadoEnMeses === 1) {
      resultados.innerHTML = `${resultadoEnAnios} año y ${Math.trunc(
        resultadoEnMeses
      )} mes`;
    }
    if (resultadoEnAnios !== 1 && resultadoEnMeses !== 1) {
      resultados.innerHTML = `${resultadoEnAnios} años y ${Math.trunc(
        resultadoEnMeses
      )} meses`;
    }
    if (resultadoEnAnios === 1 && resultadoEnMeses !== 1) {
      resultados.innerHTML = `${resultadoEnAnios} año y ${Math.trunc(
        resultadoEnMeses
      )} meses`;
    }
    if (resultadoEnAnios !== 1 && resultadoEnMeses === 1) {
      resultados.innerHTML = `${resultadoEnAnios} años y ${Math.trunc(
        resultadoEnMeses
      )} mes`;
    }
  }

  // 8- si año no es cero pero mes es cero pero días no es cero
  if (
    resultadoEnAnios !== 0 &&
    Math.trunc(resultadoEnMeses) === 0 &&
    Math.trunc(Math.round(diasRestantes)) !== 0
  ) {
    resultados.innerHTML = `${resultadoEnAnios} años y ${Math.trunc(
      Math.round(diasRestantes)
    )} dias`;
  }
}

function checkFocus(option) {
  if (option === "aniosMin" || option === "mesesMin") {
    let inputDias = document.getElementById("diasMin");
    //inputDias.setAttribute("disabled", "");
  } else {
    let inputAnios = document.getElementById("aniosMin");
    let inputMeses = document.getElementById("mesesMin");
    inputAnios.setAttribute("disabled", "");
    inputMeses.setAttribute("disabled", "");
    inputDias.setAttribute("enabled", "");
  }
}

function btnLimpiarClick() {
  window.location.reload();
  document.getElementById("diasMin").setAttribute("enabled", "");
  document.getElementById("aniosMin").focus();
}
