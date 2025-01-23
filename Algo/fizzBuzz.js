/**
 * Retourne un tableau FizzBuzz pour les nombres de 1 à n.
 *
 * @param {number} n - Limite supérieure
 * @returns {string[]} - Tableau contenant "Fizz", "Buzz", "FizzBuzz" ou le nombre en string.
 */
function fizzBuzz(n) {
    const result = [];
  
    for (let i = 1; i <= n; i++) {
      let output = '';
  
      if (i % 3 === 0) output += 'Fizz';
      if (i % 5 === 0) output += 'Buzz';
  
      result.push(output || i.toString());
    }
  
    return result;
  }
  
// Export pour le fichier de test
module.exports = fizzBuzz;