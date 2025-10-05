<?php
$target_dir = "music/";
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0755, true);
}

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$maxFileSize = 15 * 1024 * 1024; // 15 MB

// Comprobar tamaño
if ($_FILES["fileToUpload"]["size"] > $maxFileSize) {
    echo "Archivo demasiado grande.";
    $uploadOk = 0;
}

// Comprobar extensión
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
if($fileType != "mp3") {
    echo "Solo se permiten archivos MP3.";
    $uploadOk = 0;
}

// Subir archivo
if ($uploadOk && move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "El archivo ". htmlspecialchars(basename($_FILES["fileToUpload"]["name"])). " se ha subido correctamente.";
} else if($uploadOk) {
    echo "Error subiendo el archivo.";
}
?>
