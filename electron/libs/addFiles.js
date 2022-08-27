(function () {
    const mammoth       = require('mammoth');
    const addFilesInput = document.getElementById('addFiles');
    const addFilesLabel = document.querySelector('label[for="addFiles"]');
    const addedFileList = document.querySelector('#added-files_field ul');

    addFilesLabel.addEventListener('dragover', e => e.preventDefault());
    addFilesLabel.addEventListener('drop', async (e) => {
        setLoader(addedFileList);

        let parsedFiles = await getParsedFiles(e.dataTransfer.files);

        updateFileToSendList(parsedFiles);

        addFilesInput.value = null;

        deleteLoader();
    });

    addFilesInput.onchange = async function () {
        setLoader(addedFileList);

        let parsedFiles = await getParsedFiles(this.files);

        updateFileToSendList(parsedFiles);

        this.value = null;

        deleteLoader();
    };

    /**
     * Функция для парсинга файлов
     *
     * @param files
     * @returns {Promise<*[]>}
     */
    async function getParsedFiles(files) {
        const fileList        = Array.from(files);
        const parsedDocuments = [];

        for (let i = 0; i < fileList.length; i++) {
            const fileName      = fileList[i].name;
            const fileExtension = getFileExtension(fileName);

            if (!isWordDocument(fileExtension)) {
                errorNotification(
                    'Ошибка обработки файла',
                    `Файл типа ${fileExtension} не поддерживается для обработки. Используйте документы doc или docx!`,
                );

                continue;
            }

            await mammoth.convertToHtml(fileList[i]).then(function (result) {
                let stringHtml   = result.value; // The generated HTML
                let htmlDocument = new DOMParser().parseFromString(stringHtml, 'text/html').body;

                htmlDocument.querySelectorAll('img, table, a, br').forEach(element => {
                    if (element.getAttribute('href')) {
                        if (!element.getAttribute('href').includes('http')) {
                            return;
                        }
                    }

                    element.remove();
                });

                parsedDocuments.push({
                    name : fileName,
                    file : htmlDocument,
                });
            });
        }

        return parsedDocuments;
    }

    /**
     * Функция проверки файла на word тип (doc, docx)
     *
     * @param fileExtension
     *
     * @returns {boolean}
     */
    function isWordDocument(fileExtension) {
        return fileExtension === 'docx' || fileExtension === 'doc';
    }

    /**
     * Функция получения расширения файла
     *
     * @param fileName
     *
     * @returns {*}
     */
    function getFileExtension(fileName) {
        return fileName.split('.').at(-1);
    }

    function updateFileToSendList(parsedFiles) {
        parsedFiles.forEach(parsedFile => {
            fileForSend.push(parsedFile);
        });

        addedFileList.innerHTML = '';

        fileForSend.forEach((file) => {
            let li = document.createElement('li');
            li.classList.add('added_file');

            let deleteSpan = document.createElement('span');
            deleteSpan.classList.add('delete_file');

            deleteSpan.innerHTML = '&#10006;';
            li.innerText         = file.name;

            li.appendChild(deleteSpan);
            addedFileList.appendChild(li);

            li.onclick = () => {
                fileForSend = fileForSend.filter((deleteFile) => deleteFile.name !== file.name);
                li.remove();

                console.log(fileForSend);
            }
        });
    }
})();