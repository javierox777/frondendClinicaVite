export function validarRutSinDigitoVerificador(rut: string): boolean {
  // Eliminar puntos si existen
  rut = rut.replace(/\./g, '');

  // Expresión regular: Solo números, entre 7 y 8 dígitos
  const rutRegex = /^[0-9]{7,8}$/;

  if (!rutRegex.test(rut)) {
    return false;
  }

  const rutNumerico = parseInt(rut, 10);

  if (rutNumerico < 1000000 || rutNumerico > 99999999) {
    return false;
  }

  return true;
}
export function validarRutConDigitoVerificador(rutCompleto: string): boolean {
  // Eliminar puntos y separar el DV
  const rutLimpio = rutCompleto.replace(/\./g, '').toLowerCase();
  const regex = /^(\d{7,8})-([\dk])$/;

  const match = rutLimpio.match(regex);
  if (!match) return false;

  const cuerpo = match[1];
  const dvIngresado = match[2];

  // 🔹 Calcular el DV esperado
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvCalculado = 11 - (suma % 11);
  const dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'k' : dvCalculado.toString();

  return dvIngresado === dvEsperado;
}
