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