const sendCheckDocFiles = document.getElementById('check-documents');
let fileForPrepare      = [];

sendCheckDocFiles.onclick = async () => {
    let addedFiles = document.querySelectorAll('.added_file');

    if (!addedFiles.length) {
        infoNotification('Внимание', 'Перед тем как проверить документ - необходимо его добавить');

        return;
    }

    let allFileLies = document.querySelectorAll('.added_file:not(.checked)');

    if (!allFileLies.length) {
        return;
    }

    for (let i = 0; i < fileForPrepare.length; i++) {
        let fileLi = allFileLies[i];

        if (!fileLi) {
            continue;
        }

        const file        = fileForPrepare[i].file;
        const textForSend = [];

        file.querySelectorAll('p').forEach(p => {
            let text          = p.innerText.trim().toLowerCase();
            let firstPartText = text.slice(0, text.indexOf('.'));

            if (firstPartText.length <= 4 && firstPartText.match(/[0-9]/)) {
                text = text.slice(text.indexOf('.') + 1).trim();
            }

            textForSend.push(text);
        });

        let deleteFileSpan = fileLi.querySelector('.delete_file');
        let coefficient    = 0;
        let error          = false;

        fileLi.classList.add('preparing');

        setLoader(deleteFileSpan, 'document_file_loader');

        await request('https://server-cahef34500.pagekite.me/', 'POST', '', {document_text : textForSend})
            .then(({data}) => {
                coefficient   = data?.coefficient ?? 0;
            })
            .catch(errors => {
                error = true;

                fileLi.classList.remove('preparing');
                fileLi.classList.add('error');
            });

        deleteLoader();

        if (error) {
            deleteFileSpan.innerHTML = '✖';

            return;
        }

        fileLi.classList.remove('preparing');
        fileLi.classList.add('checked');

        fileLi.dataset.coefficient = coefficient;

        deleteFileSpan.classList.remove('delete_file');
        deleteFileSpan.classList.add('info');
        deleteFileSpan.innerText = coefficient + '%';

        setScoreCheck(fileLi, coefficient);
    }

    await sleep(1000);

    setLoader(document.querySelector('#added-files_field ul'));

    await sleep(300);

    deleteLoader();

    sortFieldList(allFileLies);
};

/**
 * Функция сортирует вывод файликов, исходя из их оценки (по убыванию)
 *
 * @param allFileLies
 */
function sortFieldList(allFileLies) {
    let sortedFiles = Array.from(allFileLies).sort((a, b) => {
        return Number(b.dataset.coefficient) - Number(a.dataset.coefficient);
    });

    const ul     = document.querySelector('#added-files_field ul');
    ul.innerHTML = '';

    fileForPrepare = [];

    sortedFiles.forEach(file => {
        ul.appendChild(file);
    });
}

/**
 * Функция утсановки оценки докумены
 *
 * @param li
 * @param checkResult
 */
function setScoreCheck(li, checkResult) {
    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('check-score');

    let score = 'success';

    if (checkResult < 60) {
        score = 'fail';
    } else if (checkResult >= 60 && checkResult <= 80) {
        score = 'middle';
    }

    li.appendChild(scoreDiv);

    setTimeout(() => {
        scoreDiv.classList.add(score);
        scoreDiv.style.width = checkResult + '%';
    }, 10);
}