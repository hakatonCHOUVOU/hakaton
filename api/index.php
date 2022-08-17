<?php

$restJson = file_get_contents("php://input");
$post     = json_decode($restJson ?? '{}', true);

echo json_encode($post, true);