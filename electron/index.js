const sendCheckDocFiles = document.getElementById('check-documents');
let fileForSend         = [];

sendCheckDocFiles.onclick = async () => {
    let addedFiles = document.querySelectorAll('.added_file');

    if (!addedFiles.length) {
        infoNotification('Внимание', 'Перед тем как проверить документ - необходимо его добавитьб')

        return;
    }

    const filesForSend = {};

    fileForSend.forEach(({file}) => {
        file.querySelectorAll('p').forEach(p => {
            let text = p.innerText;

            if (text.indexOf('} {') === -1) {
                let {key, offer} = getParseText(text);

                if (!key) {
                    return;
                }

                if (filesForSend[key] === undefined) {
                    filesForSend[key] = [];
                }

                filesForSend[key].push(offer);

                return;
            }

            text.split('} {').forEach(textSplit => {
                let {key, offer} = getParseText(textSplit);

                if (!key) {
                    return;
                }

                if (filesForSend[key] === undefined) {
                    filesForSend[key] = [];
                }

                filesForSend[key].push(offer);
            });
        });
    });
};

/**
 * Парсинг текста
 *
 * @param textParse
 *
 * @returns {{offer: string, key: string}}
 */
function getParseText(textParse) {
    let start = textParse.indexOf('}');
    let end   = textParse.indexOf('{', start + 1);
    let key   = textParse.substring(0, start);

    if (key.includes('{')) {
        key = key.slice(key.length - 2).replaceAll(/\D/g, '');
    }

    let offer = textParse.substring(start + 1, end);

    return {key, offer};
}