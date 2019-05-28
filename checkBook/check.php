<?php
	$bookCode = $_POST['bookCode'];

	$books = array();
	$books['sgyy'] = array('name'=>'《三国演义》', 'author'=>'罗贯中', 'desc'=>'王朝兴衰史');
	$books['xyj'] = array('name'=>'《西游记》', 'author'=>'吴承恩', 'desc'=>'道教与佛教的交融');
	$books['hlm'] = array('name'=>'《红楼梦》', 'author'=>'曹雪芹', 'desc'=>'王朝缩影');
	$books['shz'] = array('name'=>'《水浒传》', 'author'=>'吴承恩', 'desc'=>'108好汉');

	if(array_key_exists($bookCode, $books) == 1) {
		// 存在
		$book = $books[$bookCode];
		echo json_encode($book);
	} else {
		// 不存在
		echo 0;
	}

?>