<?php

$dataBase = json_decode(file_get_contents("dataBase.json"), true);
$temp = 0;
$str = "Понятия, используемые в настоящих Правилах, означают следующее: ";
foreach ($dataBase as $phraseCluster) {
    foreach ($phraseCluster as $phrase) {
        if ($phrase === $str) {
            $temp++;

            break;
        }
    }
}

echo print_r($temp, true);