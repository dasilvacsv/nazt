export function procesarCedula(cedula) {
    const parteNumerica = cedula.replace(/\D/g, '');
    return parteNumerica;
  }