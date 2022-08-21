const copyButton = document.querySelector("#copyButton");
const content = document.querySelector("#block");
const deleteButton = document.querySelector("#deleteButton");
const sendingServer = document.querySelector("#ToRunServer");
document.querySelector('body').style.backgroundColor = "white";
document.querySelector('body').style.color = "black";
const notifElem = document.querySelector('.nothification');
const textNorif = document.querySelector("#textNotif");

const notif = {
    open: (color = 'pink') => notifElem.classList.add('go', color),
    close: () => notifElem.classList.remove('go')
}


/**
 * Метод для удаление текста
 */
deleteButton.addEventListener("click", function () {

    if (content.innerHTML !== "") {
        content.innerHTML = "";
        console.log("Текст удалён");
        setTimeout(() => {
            notif.open('green')
            textNorif.innerHTML = "Текст удалён"
            setTimeout(() => {
                notif.close()
            }, 1700)
        }, 10)
    }
})

/**
 * Метод для копирования текста
 */
copyButton.addEventListener("click", function () {

    navigator.clipboard.writeText(content.innerHTML)
        .then(function () {
            setTimeout(() => {
                notif.open('green')
                textNorif.innerHTML = "Текст скопирован"
                setTimeout(() => {
                    notif.close()
                }, 1700)
            }, 10)
        })
        .catch(function () {
            setTimeout(() => {
                notif.open('red')
                textNorif.innerHTML = "Не удалось скопировать текст"
                setTimeout(() => {
                    notif.close()
                }, 1700)
            }, 10)
        })
})

/**
 * Метод для отправки данных на серверя
 */
sendingServer.addEventListener("click", async function () {

    await fetch('https://server-cahef34500.pagekite.me/', {method:'POST', body:JSON.stringify({name: content.innerHTML}), headers:{"Content-type":"application/json"}})
        .then(async data => {
            let text = await data.text();
            setTimeout(() => {
                notif.open('green')
                textNorif.innerHTML = "Отправка прошла успешно"
                setTimeout(() => {
                    notif.close()
                }, 1700)
            }, 10)
            console.log(text);
        })
        .catch(async data => {
            setTimeout(() => {
                notif.open('red')
                textNorif.innerHTML = "Отправка не прошла"
                setTimeout(() => {
                    notif.close()
                }, 1700)
            }, 10)
        })
})


window.notif = notif;