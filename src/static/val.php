<?php /*
	$name = htmlspecialchars($_POST["name"]);
	$email = htmlspecialchars($_POST["mail"]);
	$tema = htmlspecialchars($_POST["message"]);

$arr = array(
	'error' => [
			'tel' => 'какой телефон?',
			'name' => 'О_о',
	],
	'placeholder' => 1,
	'result' => 0
);

echo json_encode($arr);*/

$arr = [
	'./assets/images/watch-more1.jpg',
	'./assets/images/watch-more2.jpg',
	'./assets/images/build-progrees-test.jpg',
];
echo json_encode($arr);