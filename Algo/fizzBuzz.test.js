const fizzBuzz = require('./fizzbuzz');

describe('Test FizzBuzz', () => {
  test('Retourne la séquence correcte pour n=15', () => {
    const result = fizzBuzz(15);
    const expected = [
      '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz',
      '11', 'Fizz', '13', '14', 'FizzBuzz'
    ];

    expect(result).toEqual(expected);
  });

  test('Retourne ["1"] pour n=1', () => {
    expect(fizzBuzz(1)).toEqual(['1']);
  });

  test('Retourne ["1", "2", "Fizz"] pour n=3', () => {
    expect(fizzBuzz(3)).toEqual(['1', '2', 'Fizz']);
  });
});