/**
 * Функция для получения числа из стиля типа width и т.п.
 *
 * @param element
 * @param style
 */
function getNumberFromStyle(element, style) {
    return Number(getComputedStyle(element)[style].replaceAll('px', ''));
}

// for(let i = 0; i < 10; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 2000)
// }
//
// await awaitCycle(10, setTimeout(() => {console.log('я выполнился!')}, 2000))
//
// async function awaitCycle(iteration = -1, func) {
//     if (iteration < 0) {
//         return;
//     }
//
//     await func();
//
//     awaitCycle(iteration--, func);
// }