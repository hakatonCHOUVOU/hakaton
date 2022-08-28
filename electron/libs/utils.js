/**
 * Функция для получения числа из стиля типа width и т.п.
 *
 * @param element
 * @param style
 */
function getNumberFromStyle(element, style) {
    return Number(getComputedStyle(element)[style].replaceAll('px', ''));
}

/**
 * Метод установки лоадера
 *
 * @param element
 * @param className
 */
function setLoader(element, className) {
    let loader = `
    <svg id = "loader" class="${className}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;background: rgb(241 242 243 / 0%);display: block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" r="40" stroke-width="1" stroke="#3e6d8d" stroke-dasharray="100.707963 21.707963" fill="none" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
        </circle>
    </svg>
    `;

    element.innerHTML = loader;
}

/**
 * Функция удаления лоадера
 */
function deleteLoader() {
    let loader = document.getElementById('loader');

    if (loader) {
        loader.remove();
    }
}

/**
 * Функция запроса на сервер
 *
 * @param url
 * @param method
 * @param params
 * @param body
 *
 * @returns {Promise<*>}
 */
function request(url, method = 'GET', params = '', body = {}) {
    return new Promise((resolve,reject) => {
        let headers = {};

        if (method === 'POST') {
            headers = {'Content-type' : 'application/json'};
            body    = JSON.stringify(body);
        }

        fetch(url, {method, headers,body}).then(async response => {
            if (!response.ok) {
                return reject('Возникла ошибка при запросе');
            }

            let data = await response.json();

            if (!data.success) {
                return reject(data);
            }

            return resolve(data);
        }).catch(error => {
            return reject(error);
        });
    })
}

/**
 * Функция временной остановки скрипта
 *
 * @param ms
 * @returns {*}
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}