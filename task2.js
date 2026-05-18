/**
 * ЗАДАЧА:
 * Реализовать функцию, которая для двух списков идентификаторов вычисляет 
 * последовательность мощностей их пересечения по префиксам.
 * 
 * Описание:
 * - Даны два списка top1 и top2 длины N.
 * - На шаге i берём префиксы длины i из обоих списков, рассматриваем их как 
 *   множества и находим мощность (размер) их пересечения.
 * - Числа в списках могут повторяться, но при вычислении пересечения 
 *   учитываются только уникальные элементы.
 * - В результате получается список из N чисел, где каждое число — это размер 
 *   пересечения соответствующих префиксов.
 * 
 * Ограничения:
 * - Длины входных списков одинаковы (N)
 * - Можно использовать дополнительную память (Set, Map)
 * - Оптимальное решение: O(N) по времени и O(N) по памяти
 * 
 * Примеры:
 * 
 * Вход: [1, 2, 3, 4], [3, 4, 5, 6]  
 * Выход: [0, 0, 1, 2]  
 * 
 * Вход: [1, 1, 1], [1, 1, 1]  
 * Выход: [1, 1, 1]  
 * 
 * Вход: [10, 7, 9], [1, 7, 3]  
 * Выход: [0, 1, 1]  
 * 
 * Вход: [3, 4, 5, 6], [1, 2, 3, 4]  
 * Выход: [0, 0, 1, 2]  
 * 
 * Вход: [1], [2]  
 * Выход: [0]
 */

/**
 * TODO: Реализовать функцию
 * @param {number[]} top1 - первый список идентификаторов
 * @param {number[]} top2 - второй список идентификаторов
 * @returns {number[]} - массив размеров пересечений для каждого префикса
 */
function prefixIntersectionSizes(top1, top2) {
    // Ваше решение здесь
}

// ============================================
// ТЕСТЫ
// ============================================

function assertDeepEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr === expectedStr) {
        console.log(`✓ ${testName}`);
    } else {
        console.error(`✗ ${testName}`);
        console.error(`  Expected: ${expectedStr}`);
        console.error(`  Actual:   ${actualStr}`);
    }
}

// Тест 1: Пример из условия
function testExample1() {
    const top1 = [1, 2, 3, 4];
    const top2 = [3, 4, 5, 6];
    const expected = [0, 0, 1, 2];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Пример 1: [1,2,3,4] и [3,4,5,6]');
}

// Тест 2: Все одинаковые числа
function testAllSame() {
    const top1 = [1, 1, 1];
    const top2 = [1, 1, 1];
    const expected = [1, 1, 1];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Все одинаковые числа');
}

// Тест 3: Пересечение появляется не сразу
function testIntersectionAppears() {
    const top1 = [10, 7, 9];
    const top2 = [1, 7, 3];
    const expected = [0, 1, 1];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Пересечение на втором шаге');
}

// Тест 4: Обратный порядок
function testReverseOrder() {
    const top1 = [3, 4, 5, 6];
    const top2 = [1, 2, 3, 4];
    const expected = [0, 0, 1, 2];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Обратный порядок');
}

// Тест 5: Один элемент
function testSingleElement() {
    const top1 = [1];
    const top2 = [2];
    const expected = [0];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Один элемент, нет пересечения');
}

// Тест 6: Один элемент с пересечением
function testSingleElementIntersection() {
    const top1 = [1];
    const top2 = [1];
    const expected = [1];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Один элемент, есть пересечение');
}

// Тест 7: Повторяющиеся элементы с разным порядком
function testDuplicatesDifferentOrder() {
    const top1 = [1, 2, 2, 3];
    const top2 = [2, 3, 3, 4];
    const expected = [0, 1, 1, 2];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Повторяющиеся элементы');
}

// Тест 8: Пустые списки (крайний случай)
function testEmpty() {
    const top1 = [];
    const top2 = [];
    const expected = [];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Пустые списки');
}

// Тест 9: Большие числа
function testLargeNumbers() {
    const top1 = [1000, 2000, 3000];
    const top2 = [2000, 3000, 4000];
    const expected = [0, 1, 2];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Большие числа');
}

// Тест 10: Нет пересечения вообще
function testNoIntersection() {
    const top1 = [1, 2, 3];
    const top2 = [4, 5, 6];
    const expected = [0, 0, 0];
    
    const result = prefixIntersectionSizes(top1, top2);
    assertDeepEqual(result, expected, 'Нет пересечения');
}

// Запуск всех тестов
console.log('=== ЗАПУСК ТЕСТОВ ===\n');
testExample1();
testAllSame();
testIntersectionAppears();
testReverseOrder();
testSingleElement();
testSingleElementIntersection();
testDuplicatesDifferentOrder();
testEmpty();
testLargeNumbers();
testNoIntersection();
console.log('\n=== ТЕСТЫ ЗАВЕРШЕНЫ ===');

// ============================================
// ПОДСКАЗКИ (раскомментировать при необходимости)
// ============================================

/*
ПОДСКАЗКА 1: Подход с Set
- Используйте Set для хранения уникальных элементов из top1
- Используйте Set для хранения уникальных элементов из top2
- На каждом шаге добавляйте новый элемент в соответствующий Set
- Пересечение = количество элементов, которые есть в обоих Set

ПОДСКАЗКА 2: Оптимизация
- Вместо двух Set можно использовать один Set для top1 и 
  отслеживать пересекающиеся элементы отдельно
- Или использовать Map для подсчета вхождений

ПОДСКАЗКА 3: Алгоритм
result[0] всегда 0 (пустые множества)
На каждом шаге i (1..N):
  - Добавляем top1[i-1] в set1
  - Добавляем top2[i-1] в set2
  - Пересечение = |set1 ∩ set2|
  - result[i] = размер пересечения

ПОДСКАЗКА 4: Эффективное вычисление пересечения
Вместо вычисления пересечения с нуля на каждом шаге:
  - Храните текущий размер пересечения
  - При добавлении нового элемента в set1 или set2:
    - Если элемент уже есть в другом множестве и не был учтен → увеличиваем счетчик
  - Но нужно аккуратно обрабатывать дубликаты
*/

// Экспорт для модульного тестирования (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = prefixIntersectionSizes;
}