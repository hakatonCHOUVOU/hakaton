<?php

define("DATABASE_FILE_PATH", $_SERVER['DOCUMENT_ROOT'] . '/dataForAI/database.json');
define("CRITERION_COUNT", 39);

error_reporting(E_ALL);
ini_set('error_log', './log/error.log');
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);

/**
 * Обёртка для ответа в случае неудачи
 *
 * @param string $error
 *
 * @return string
 */
function badResponse(string $error): string
{
    return json_encode(
        [
            'error'   => $error,
            'success' => false,
        ]
    );
}

/**
 * Обёртка для ответа в случае успеха
 *
 * @param array $data
 *
 * @return string
 */
function successResponse(array $data = []): string
{
    return json_encode(
        [
            'data'    => $data,
            'success' => true,
        ]
    );
}

/**
 * Функция для установки глобальному маасиву $_POST данных от POST запроса
 *
 * @return void
 */
function setPostData()
{
    $content = file_get_contents('php://input');
    $_POST   = json_decode($content ?? '{}', true);
}

if (!file_exists(DATABASE_FILE_PATH)) {
    error_log('Не удалось найти файл базы данных по пути ' . DATABASE_FILE_PATH);

    echo badResponse('Возникла ошибка при обработке данных');

    die();
}

setPostData();

$database      = json_decode(file_get_contents(DATABASE_FILE_PATH), true);
$documentText  = $_POST['document_text'];
$matches       = 0;
$criterionList = [];

foreach ($database as $criterion => $phraseCluster) {
    foreach ($phraseCluster as $phrase) {
        foreach ($documentText as $text) {
            if ($text === $phrase && !in_array($criterion, $criterionList)) {
                $matches++;
                $criterionList[] = $criterion;

                break;
            }
        }
    }
}

$countDocumentText = count($documentText);

if ($countDocumentText < CRITERION_COUNT) {
    $matchEquivalent = 100 / $countDocumentText;
} else {
    $matchEquivalent = 100 / CRITERION_COUNT;
}

$coefficient = round($matchEquivalent * $matches, 0);

echo successResponse(['coefficient' => $coefficient]);