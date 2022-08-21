const copyButton = document.querySelector("#copyButton");
const content = document.querySelector("#block");
const deleteButton = document.querySelector("#deleteButton");
const sendingServer = document.querySelector("#ToRunServer");
const notifElem = document.querySelector('.nothification');
const textNorif = document.querySelector("#textNotif");
const dowlandDocx = document.querySelector("#dowlanddoc");

const notif = {
    open: (color = 'pink') => notifElem.classList.add('go', color),
    close: () => notifElem.classList.remove('go')
}

function ShowNoficationDeleteText() {
    setTimeout(() => {
        notif.open('green')
        textNorif.innerHTML = "Текст удалён"

        setTimeout(() => {
            notif.close()
        }, 1700)
    }, 10)
}

function CopyText(){
    setTimeout(() => {
        notif.open('green')
        textNorif.innerHTML = "Текст скопирован"
        
        setTimeout(() => {
            notif.close()
        }, 1700)
    }, 10)
}

function ShowNotificationSending() {
    setTimeout(() => {
        notif.open('green')
        textNorif.innerHTML = "Отправка прошла успешно"

        setTimeout(() => {
            notif.close()
        }, 1700)
    }, 10)
}

function ShowNotNotificationSending() {
    setTimeout(() => {
        notif.open('red')
        textNorif.innerHTML = "Отправка не прошла"

        setTimeout(() => {
            notif.close()
        }, 1700)
    }, 10)
}


/**
 * Метод для удаление текста
 */
deleteButton.onclick = function () {

    if (content.innerHTML === "") {
        return;
    }
    content.innerHTML = "";
    console.log("Текст удалён");
    ShowNoficationDeleteText();
}

/**
 * Метод для копирования текста
 */
copyButton.onclick = function () {
    navigator.clipboard.writeText(content.innerHTML)
        .then(function () {
            CopyText();
        })
}

/**
 * Метод для отправки данных на серверя
 */
sendingServer.onclick = async function() {

    await fetch('https://server-cahef34500.pagekite.me/', {
        method: 'POST',
        body: JSON.stringify({name: content.innerHTML}),
        headers: {"Content-type": "application/json"}
    })
        .then(async data => {
            let text = await data.text();
            ShowNotificationSending();
            console.log(text);
        })
        .catch(async data => {
            ShowNotNotificationSending()
        })
}

window.notif = notif;