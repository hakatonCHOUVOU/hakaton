const copyTextButton     = document.getElementById('copyText');
const showAddFilesModal  = document.getElementById('showAddFilesModal');
const addFilesModalField = document.getElementById('modal_add-files_field');

successNotification('test','test')

showAddFilesModal.onclick = () => {
    addFilesModalField.dataset.show = "true";
};

addFilesModalField.onclick = (e) => {
    if (e.target.getAttribute('id') === 'modal_add-files_field') {
        addFilesModalField.dataset.show = "false";
    }
}