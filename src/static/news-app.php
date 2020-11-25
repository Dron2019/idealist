<?php

$arr = [
    [   "name" => "bar","date" => $_POST['month'], "text" => $_POST['year'],],
    [   "name" => "bar","date" => $_POST['month'], "text" => $_POST['year'],],
    [   "name" => "bar","date" => $_POST['month'], "text" => $_POST['year'],],
    [   "name" => "bar","date" => $_POST['month'], "text" => $_POST['year'],],
    [   "name" => "bar","date" => $_POST['month'], "text" => $_POST['year'],],
    [   "name" => "bar","date" => $_POST['month'], "text" => $_POST['year'],],
];


if ($_POST['action'] === 'news-list') {
    echo json_encode($arr);
}else if ($_POST['action'] === 'news-single'){
    $arr = [
        "text"=>'
       
            <div class="parent"> <img src="./assets/images/build-progrees-test.jpg">
                <h2>На сайте'.$_POST['ID'].' произошли обновления</h2><a target="_blank" href="https://comfort-life.ua">https://comfort-life.ua</a>
                <p>Для того, чтобы использование встроенного механизированного паркинга в ЖК “Idealist” было ещё комфортнее, на въезде мы установили немецкие ворота Hörmann. Такие компоненты, как ворота, привод и блок управления, оптимально согласованы друг с другом и испытаны как единый функциональный блок. Встроенные функции плавного пуска и остановки привода обеспечивают бесшумное движение ворот и их бережную эксплуатацию. Ещё больше свежих фотографий ЖК “Idealist” вы можете увидеть на нашем сайте в разделе “Ход строительства”.</p><img src="./assets/images/build-progrees-test.jpg"><img src="./assets/images/build-progrees-test.jpg">
            </div>

    '];
    echo json_encode($arr);
}