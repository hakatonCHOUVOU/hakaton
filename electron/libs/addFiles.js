(function () {
    const mammoth       = require('mammoth');
    const addFilesInput = document.getElementById('addFiles');
    const addFilesLabel = document.querySelector('label[for="addFiles"]');
    const addedFileList = document.querySelector('#added-files_field ul');

    addFilesLabel.addEventListener('dragover', e => e.preventDefault());
    addFilesLabel.addEventListener('drop', async (e) => {
        setLoader(addedFileList);

        let parsedFiles = await getParsedFiles(e.dataTransfer.files);

        prepareFileListForSend(parsedFiles);

        addFilesInput.value = null;

        deleteLoader();
    });

    addFilesInput.onchange = async function () {
        setLoader(addedFileList);

        let parsedFiles = await getParsedFiles(this.files);

        prepareFileListForSend(parsedFiles);

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

            let options = {
                ignoreEmptyParagraphs   : true,
                idPrefix                : true,
                includeEmbeddedStyleMap : true,
            };

            let record = false;
            let isEnd  = false;

            await mammoth.convertToHtml({buffer : fileList[i]}, options).then(function (result) {
                let stringHtml   = result.value;
                let htmlDocument = new DOMParser().parseFromString(stringHtml, 'text/html').body;

                htmlDocument.querySelectorAll('img, table, a, br').forEach(element => {
                    if (element.getAttribute('href')) {
                        if (!element.getAttribute('href').includes('http')) {
                            return;
                        }
                    }

                    element.remove();
                });

                htmlDocument.querySelectorAll('p').forEach(p => {
                    if (p.innerText.match(/^[0-9]*[.]/)) {
                        record = true;
                    }

                    if (p.innerText === 'Утверждено') {
                        record = false;
                    } else if (p.innerText === 'Приложение') {
                        isEnd = true;
                    }

                    if (!record || isEnd) {
                        p.remove();

                        return;
                    }

                    if (p.innerText.toUpperCase() === p.innerText) {
                        p.remove();

                        return;
                    }

                    if (p.innerText.split(' ').length < 2) {
                        p.remove();
                    }
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

    /**
     * Функция для подготовки и отрисовки файлов к отправке
     *
     * @param parsedFiles
     */
    function prepareFileListForSend(parsedFiles) {
        parsedFiles.forEach(parsedFile => {
            fileForPrepare.push(parsedFile);
        });

        addedFileList.innerHTML = '';

        fileForPrepare.forEach((file) => {
            let li = document.createElement('li');
            li.classList.add('added_file');

            let fileNameSpan = document.createElement('span');
            fileNameSpan.classList.add('file_name');

            let deleteSpan = document.createElement('span');
            deleteSpan.classList.add('delete_file');

            deleteSpan.innerHTML   = '&#10006;';
            fileNameSpan.innerText = file.name;

            li.appendChild(fileNameSpan);
            li.appendChild(deleteSpan);
            addedFileList.appendChild(li);

            li.onclick = () => {
                fileForPrepare = fileForPrepare.filter((deleteFile) => deleteFile.name !== file.name);
                li.remove();
            };
        });
    }
})();