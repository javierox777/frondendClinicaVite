export function formatRut(rut: string): string {
    // Convert the number to a string
    const numStr = rut
  
    // Insert dots appropriately
    const formattedNumber = `${numStr.slice(0, -6)}.${numStr.slice(-6, -3)}.${numStr.slice(-3)}`;
  
    return formattedNumber;
  }