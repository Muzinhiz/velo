export function generateOrderCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    let part1 = '';
    let part2 = '';
  
    // Gera as 3 letras iniciais
    for (let i = 0; i < 3; i++) {
      part1 += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  
    // Gera os 6 caracteres (letras + números)
    for (let i = 0; i < 6; i++) {
      part2 += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return `${part1}-${part2}`;
  }
  
  // Exemplo de uso
  const order = generateOrderCode();
  console.log(order); // Ex: "VLO-U91KMJ"
  