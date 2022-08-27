const sendCheckDocFiles = document.getElementById('check-documents');
let fileForSend         = [];

sendCheckDocFiles.onclick = async () => {
    let forSortDocuments = [];
    let addedFiles       = document.querySelectorAll('.added_file');

    if (!addedFiles.length) {
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

        console.log(filesForSend);

        // const statusDiv = document.createElement('div');
        // statusDiv.classList.add('check-status')

        // let checkStatusProc = getRandomInt(10, 100);
        // let status = 'success';
        //
        // if (checkStatusProc < 60) {
        //     status = 'fail';
        // } else if (checkStatusProc >= 60 && checkStatusProc <= 80) {
        //     status = 'middle'
        // }
        //
        // forSortDocuments.push({
        //     status: checkStatusProc,
        //     element: li
        // })
        //
        // statusDiv.classList.add(status);
        //
        // li.appendChild(statusDiv);
        // li.remove();
    });

    // sendCheckDocFiles.setAttribute('disabled', 'true');
    //
    // const sortedDocuments = forSortDocuments.sort((a, b) => b.status - a.status);
    // const addedFilesField = document.querySelector('#added-files_field ul');
    //
    // sortedDocuments.forEach(doc => {
    //     addedFilesField.appendChild(doc.element);
    //
    //     setTimeout(() => {
    //         doc.element.querySelector('.check-status').style.width = doc.status + '%';
    //         doc.element.querySelector('.delete_file').classList.add('info');
    //         doc.element.querySelector('.delete_file').innerText = doc.status + '%';
    //     }, 10)
    // })
};

function getParseText(textParse) {
    let start = textParse.indexOf('}');
    let end   = textParse.indexOf('{', start + 1);
    let key   = textParse.substring(0, start);

    if (key.includes('{')) {
        key = key.slice(key.length - 2).replaceAll(/\D/g, '');
    }

    let offer         = textParse.substring(start + 1, end);
    let charCodeOffer = [];

    for (let i = 0; i < offer.length; i++) {
        charCodeOffer.push(offer.charCodeAt(i));
    }

    return {key, offer : offer};
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
