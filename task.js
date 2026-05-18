/**
 * ЗАДАЧА:
 * Заменить все пробелы в строке на "%20" inplace.
 * На вход подается массив символов (строка) с зарезервированными под расширение символами.
 *
 * Пример:
 * Input: ['j','a','v','a',' ', 't','a','s','k', ' ', ' ']
 * Output: ['j','a','v','a','%','2','0','t','a','s','k']
 *
 * Ограничения:
 * - O(1) дополнительной памяти (не создавать новые массивы/строки)
 * - O(N) по времени
 * - Менять исходный массив можно
 */

/**
 * TODO: Реализовать функцию
 * @param {string[]} chars - массив символов (строка) с зарезервированным местом
 * @return {void} - ничего не возвращаем, меняем исходный массив
 */
function replaceSpaces(chars) {
  let spaceCount = 0;

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === " ") {
      spaceCount += 1;
    }
  }

  const oldLength = chars.length;
  const newLength = oldLength + spaceCount * 2;

  chars.length = newLength;

  let readPointer = oldLength;
  let writePointer = newLength;
  while (readPointer >= 0) {
    if (chars[readPointer] === " ") {
      chars[writePointer] = "0";
      chars[writePointer - 1] = "2";
      chars[writePointer - 2] = "%";
      writePointer -= 3
    } else {
        chars[writePointer] = chars[readPointer]
        writePointer -= 1
    }
    readPointer -= 1;
  }
}

// ============================================
// ТЕСТЫ
// ============================================

function assertEqual(actual, expected, testName) {
  const actualStr = Array.isArray(actual) ? actual.join("") : actual;
  const expectedStr = Array.isArray(expected) ? expected.join("") : expected;

  if (actualStr === expectedStr) {
    console.log(`✓ ${testName}`);
  } else {
    console.error(`✗ ${testName}`);
    console.error(`  Expected: ${expectedStr}`);
    console.error(`  Actual:   ${actualStr}`);
  }
}

// Тест 1: Пример из условия
function testExample() {
  const input = ["j", "a", "v", "a", " ", "t", "a", "s", "k", " ", " "];
  const expected = ["j", "a", "v", "a", "%", "2", "0", "t", "a", "s", "k"];

  replaceSpaces(input);
  assertEqual(input, expected, "Пример из условия");
}

// Тест 2: Нет пробелов
function testNoSpaces() {
  const input = ["h", "e", "l", "l", "o"];
  const expected = ["h", "e", "l", "l", "o"];

  replaceSpaces(input);
  assertEqual(input, expected, "Нет пробелов");
}

// Тест 3: Только пробелы
function testOnlySpaces() {
  const input = [" ", " ", " "];
  const expected = ["%", "2", "0", "%", "2", "0", "%", "2", "0"];

  replaceSpaces(input);
  assertEqual(input, expected, "Только пробелы");
}

// Тест 4: Пробел в начале
function testSpaceAtStart() {
  const input = [" ", "c", "a", "t"];
  const expected = ["%", "2", "0", "c", "a", "t"];

  replaceSpaces(input);
  assertEqual(input, expected, "Пробел в начале");
}

// Тест 5: Пробел в конце
function testSpaceAtEnd() {
  const input = ["d", "o", "g", " "];
  const expected = ["d", "o", "g", "%", "2", "0"];

  replaceSpaces(input);
  assertEqual(input, expected, "Пробел в конце");
}

// Тест 6: Несколько пробелов подряд
function testMultipleSpaces() {
  const input = ["a", " ", " ", "b"];
  const expected = ["a", "%", "2", "0", "%", "2", "0", "b"];

  replaceSpaces(input);
  assertEqual(input, expected, "Несколько пробелов подряд");
}

// Тест 7: Пустая строка
function testEmpty() {
  const input = [];
  const expected = [];

  replaceSpaces(input);
  assertEqual(input, expected, "Пустая строка");
}

// Тест 8: Сложный случай
function testComplex() {
  const input = ["h", "i", " ", "t", "h", "e", "r", "e", " ", " ", " ", "!"];
  const expected = [
    "h",
    "i",
    "%",
    "2",
    "0",
    "t",
    "h",
    "e",
    "r",
    "e",
    "%",
    "2",
    "0",
    "%",
    "2",
    "0",
    "%",
    "2",
    "0",
    "!",
  ];

  replaceSpaces(input);
  assertEqual(input, expected, "Сложный случай");
}

// Запуск всех тестов
console.log("=== ЗАПУСК ТЕСТОВ ===\n");
testExample();
testNoSpaces();
testOnlySpaces();
testSpaceAtStart();
testSpaceAtEnd();
testMultipleSpaces();
testEmpty();
testComplex();
console.log("\n=== ТЕСТЫ ЗАВЕРШЕНЫ ===");

// ============================================
// ПОДСКАЗКИ (раскомментировать при необходимости)
// ============================================

/*
ПОДСКАЗКА 1: Алгоритм в 2 прохода
1. Первый проход: подсчитать количество пробелов
2. Второй проход: идти с конца и заменять пробелы на '%20'

ПОДСКАЗКА 2: Формулы
- Новая длина = старая_длина + количество_пробелов * 2
- Старая_длина = chars.length
- Нужно расширить массив до новой длины перед заменой

ПОДСКАЗКА 3: Движение с конца
- Указатель i идет по исходной строке с конца
- Указатель j идет по новой позиции с конца
- Когда встречаем пробел - вставляем '0','2','%' (в обратном порядке!)
*/

// Экспорт для модульного тестирования (если нужно)
if (typeof module !== "undefined" && module.exports) {
  module.exports = replaceSpaces;
}
