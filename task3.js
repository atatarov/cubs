/**
 * Дан список целых чисел, повторяющихся элементов в списке нет.
 * Нужно преобразовать это множество в строку,
 * сворачивая соседние по числовому ряду числа в диапазоны.
 */
function compress(list) {
  // your code here
  const sortedList = list.sort((a, b) => a - b);
  let start = sortedList[0];
  const result = [];

  for (let i = 0; i < sortedList.length; i++) {
    const current = sortedList[i];
    const next = sortedList[i + 1];

    if (next === undefined || next !== current + 1) {
      if (start === current) {
        result.push(start);
      } else {
        result.push(`${start}-${current}`);
      }
      start = next
    }
  }

  return result.join(",");
}

console.clear();
check(compress([1, 4, 5, 2, 3, 9, 8, 11, 0]), "0-5,8-9,11");
check(compress([1, 4, 3, 2]), "1-4");
check(compress([1, 4]), "1,4");
check(compress([1, 2]), "1-2");

function check(input, expected) {
  console.assert(
    input === expected,
    `Test case %o: expected %o, but got %o`,
    expected,
    expected,
    input,
  );
}

console.log(`Tests finished`);
