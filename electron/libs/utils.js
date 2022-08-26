/**
 * Функция для получения числа из стиля типа width и т.п.
 *
 * @param element
 * @param style
 */
function getNumberFromStyle(element, style) {
    return Number(getComputedStyle(element)[style].replaceAll('px', ''));
}