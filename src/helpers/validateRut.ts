export function validarRutSinDigitoVerificador(rut: string): boolean {
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