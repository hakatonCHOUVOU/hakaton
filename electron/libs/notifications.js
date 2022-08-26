/**
 * Функция показа информационной нотификации
 *
 * @param title
 * @param text
 * @param seconds
 */
function infoNotification(title, text, seconds = 4) {
    const notification = getNotification(title, text);

    liveLoopNotification(notification, 'information');
}

/**
 * Функция для показа успешной
 *
 * @param text
 * @param seconds
 */
function successNotification(title, text, seconds = 4) {
    const notification = getNotification(title, text);

    liveLoopNotification(notification, 'success');
}

/**
 * Функция для показа ошибки
 *
 * @param text
 * @param seconds
 */
function errorNotification(title, text, seconds = 4) {
    const notification = getNotification(title, text);

    liveLoopNotification(notification, 'error');
}

/**
 * Функция жизненого цикла уведомления (добавление на страницу, исчезновение и удаление)
 *
 * @param notification
 * @param classType
 */
function liveLoopNotification(notification = null, classType = 'information') {
    if (!notification) {
        return;
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        notification.classList.add(classType);
    }, 1);

    setTimeout(() => {
        notification.classList.remove('show');

        downNotification(notification);
    }, 4000);

    setTimeout(() => {
        notification.remove();
    }, 4500);
}

/**
 * Метод создания и получения тела нотификации
 *
 * @param title
 * @param text
 */
function getNotification(title, text) {
    const notificationComponent = document.createElement('div');
    notificationComponent.classList.add('notification_block');

    const titleComponent = document.createElement('h3');
    titleComponent.classList.add('notification_title');
    titleComponent.innerText = title;

    const descriptionComponent = document.createElement('div');
    descriptionComponent.classList.add('notification_description');
    descriptionComponent.innerText = text;

    notificationComponent.appendChild(titleComponent);
    notificationComponent.appendChild(descriptionComponent);

    const bottom = Array.from(document.querySelectorAll('.notification_block')).reduce((bottom, not) => {
        bottom += not.offsetHeight + 10;

        return bottom;
    }, 0);

    notificationComponent.style.bottom = bottom + 20 + 'px';

    return notificationComponent;
}

/**
 * Функция для перемещения уведомлений вниз
 */
function downNotification() {
    let notificationList = Array.from(document.querySelectorAll('.notification_block')).reverse();

    for (let i = 0; i < notificationList.length; i++) {
        let notificationBefore = notificationList[i];
        let nextNotification   = notificationList[i + 1];

        if (!nextNotification) {
            break;
        }

        notificationBefore.style.bottom = getNumberFromStyle(nextNotification, 'bottom') + 'px';
    }
}