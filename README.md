### Приложение для оценки нормативно-правовых актов

## Код стайл

1. для названия методов/переменных используем стиль  `camel case`:
 
- Для переменных `let testName` или `$perName`
- Для эндпоинтов бэка `getIiTextAction`
- Для эндпоинтов ИИ `detectDocumentClassAction`
- Для ключей при передаче данных, для селекторов использовать `snake case`

2. Использовать полное и осмысленное название переменных/методов

- Не `f()`, а `getText()`

3. Использовать описание методов `phpDoc`
4. Написание кода лучше делать в редакторах типа `phpstorm` для использования форматирования кода

## Структура

Директория `api` содержит файлы бэка 

- `index.php` - файл для обработки данных, здесь же и просходит проверка нормативно правовых актов с помощью алгортма проверки

## Структура настольного приложения

Настольное приложение создано с помощью фреймворка `electron` 

Директория `electron` содержит файлы клиенской части приложения

- `libs` - директория, где вспомогательные файлы для работы с js
- `style` - директория, где хранятся файлы стилей приложения

Файл `index.html` - это главная и единственная страница приложения
`main.js` - Файл, отвечающий за отображение окна и работы приложения
`index.js` - скрипты для страницы `index.html`

## Сервер

Сервер поднимается с помощью `vagrant`, используется `ubuntu 18 версии`, а  именно `ubuntu/focal64`

## Структура сервера

- `provisions` - директория, содержащая в себе скрипты для установки компонентов для корректного взаимодействия с клиентом

## Стек сервера:

`Nginx, PHP 8.1.8, PHP-FPM 7.4, Node 14.20.0, npm 8.17.0`