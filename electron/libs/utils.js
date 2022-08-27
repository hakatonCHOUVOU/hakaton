/**
 * Функция для получения числа из стиля типа width и т.п.
 *
 * @param element
 * @param style
 */
function getNumberFromStyle(element, style) {
    return Number(getComputedStyle(element)[style].replaceAll('px', ''));
}

function setLoader(element) {
    let loader = `<svg id = "loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;background: rgb(241 242 243 / 0%);display: block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="40" stroke-width="1" stroke="#3e6d8d" stroke-dasharray="100.707963 21.707963" fill="none" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</circle>
</svg>`;

    element.innerHTML = loader;
}

function deleteLoader() {
    let loader = document.getElementById('loader');

    if (loader) {
        loader.remove();
    }
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