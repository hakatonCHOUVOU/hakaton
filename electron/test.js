const copyButton = document.querySelector("#copyButton");
const content = document.querySelector("#block");
const deleteButton = document.querySelector("#deleteButton");
const sendingServer = document.querySelector("#ToRunServer");


/**
 * Метод для удаление текста
 */
deleteButton.addEventListener("click", function () {

    content.innerHTML = "";
    console.log("Текст удалён");

})

/**
 * Метод для копирования текста
 */
copyButton.addEventListener("click", function () {

    if (content.innerHTML === "") {
        console.log("Пустота!!");
    } else {
        navigator.clipboard.writeText(content.innerHTML)
            .then(function () {
                console.log("Скопировалось");
            })
            .catch(err => {
                console.log("Не скопировалось");
            })
    }

})

/**
 * Метод для отправки данных на серверя
 */
sendingServer.addEventListener("click", async function () {

    if (content.innerHTML === "") {
        console.log("Пусто! Отправка не пройдёт");
    } else {
        await fetch('https://server-cahef34500.pagekite.me/')
            .then(async data => {
                let text = await data.text();
                console.log("Отправка прошла");
                console.log(content.innerHTML);
            })
    }

})