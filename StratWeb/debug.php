<?php
echo "<pre>";
echo "HTTP_HOST: " . $_SERVER['HTTP_HOST'] . "\n";
echo "DOCUMENT_ROOT: " . $_SERVER['DOCUMENT_ROOT'] . "\n";
echo "SCRIPT_FILENAME: " . $_SERVER['SCRIPT_FILENAME'] . "\n";
echo "REQUEST_URI: " . $_SERVER['REQUEST_URI'] . "\n";
echo "PHP_SELF: " . $_SERVER['PHP_SELF'] . "\n";

// Trace the rewrite
if (isset($_SERVER['REDIRECT_URL'])) {
    echo "REDIRECT_URL: " . $_SERVER['REDIRECT_URL'] . "\n";
}
if (isset($_SERVER['REDIRECT_STATUS'])) {
    echo "REDIRECT_STATUS: " . $_SERVER['REDIRECT_STATUS'] . "\n";
}

// Check what path Apache is actually trying to serve
$path = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'];
echo "Calculated path: $path\n";
echo "Real path: " . realpath($path) . "\n";

// Check if there's any rewrite happening
echo "\nAll headers:\n";
foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'REDIRECT') === 0 || strpos($key, 'REQUEST') === 0) {
        echo "$key: $value\n";
    }
}// Add to debug.php
error_log("DEBUG: Serving " . $_SERVER['SCRIPT_FILENAME'] . " for " . $_SERVER['REQUEST_URI']);
echo "DEBUG: Serving " . $_SERVER['SCRIPT_FILENAME'] . " for " . $_SERVER['REQUEST_URI'];
?>