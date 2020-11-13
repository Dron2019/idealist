<?
if ($_POST['action'] === 'add') {
    echo 'add';
}else if ($_POST['action'] === 'remove'){
    echo 'remove';
}else {
    echo 'fail';
}
?>