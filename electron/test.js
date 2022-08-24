const copyButton    = document.querySelector('#copyButton');
const content       = document.querySelector('#block');
const deleteButton  = document.querySelector('#deleteButton');
const sendingServer = document.querySelector('#ToRunServer');
const notifElem     = document.querySelector('.nothification');
const textNotif     = document.querySelector('#textNotif');
const buttonText    = document.querySelector('#buttonText');
const textBut       = document.querySelector('#ShowTextBut');

const notif = {
    open  : (color = 'green') => notifElem.classList.add('showNotification', color),
    close : () => notifElem.classList.remove('showNotification'),
};

const butText = {
    open  : (color = 'aqua') => buttonText.classList.add('showText'),
    close : () => buttonText.classList.remove('showText'),
};

function ShowGreenNotif(text) {
    setTimeout(() => {
        notif.open('green');
        textNotif.innerHTML = text;

        setTimeout(() => {
            notif.close();
        }, 1700);
    }, 10);
}

function ShowRedNotif(text) {
    setTimeout(() => {
        notif.open('red');
        textNotif.innerHTML = text;

        setTimeout(() => {
            notif.close();
        }, 1700);
    }, 10);
}

/**
 * Метод для удаление текста
 */
deleteButton.onclick = function () {
    if (content.innerHTML === '') {
        return;
    }
    content.innerHTML = '';
    ShowGreenNotif('Текс удалён');
};

/**
 * Метод для копирования текста
 */
copyButton.onclick = function () {
    navigator.clipboard.writeText(content.innerHTML)
        .then(function () {
            ShowGreenNotif('Текст скопирован');
        })
        .catch(function () {
            ShowRedNotif('Не получилось скопировать текст');
        });
};

/**
 * Метод для отправки данных на серверя
 */
sendingServer.onclick = async function () {

    if (content.innerHTML === '') {
        return;
    }

    await fetch('https://server-cahef34500.pagekite.me/', {
        method  : 'POST',
        body    : JSON.stringify({name : content.innerHTML}),
        headers : {'Content-type' : 'application/json'},
    })
        .then(async data => {
            let text = await data.text();
            ShowGreenNotif('Отправка прошла');
            console.log(text);
        })
        .catch(async data => {
            let text = await data.text();
            ShowRedNotif('Отправка не прошла');
        });
};

