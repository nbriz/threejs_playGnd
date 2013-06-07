<!DOCTYPE html>
<html>
<head>
    <title>_playGnd - Archive</title>
    <meta charset="utf-8">
    <style>
        body {
            font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            font-weight: 300; letter-spacing: 1px; line-height: 120%;
            color:#000; background-color: #fff;
        }  
        .wrapper {
            width:490px;
            margin: 44px auto;
        }
        .item {
            background-color: #000;
            height: 20px;
            color:#fff;
            margin-bottom: 10px;
            padding: 10px; 
        }
        .item:hover {
            background-color: #e43f8c;
            /*color:#e43f8c;*/
        }

        .menu {
            position: absolute;
            top:0px; left:0px;
            height: 22px; width:100%;
            color:#fff; background-color: #000;
            font-size: 11px;
            padding: 6px 0 5px 12px;
        }

        a:link, a:visited{ text-decoration: none; color: #fff; }
        a:hover, a:active{ text-decoration: none; color: #000; outline: 0; border:0px; cursor: pointer; }
        .menu a:hover, .menu a:active{ text-decoration: none; color: #e43f8c; outline: 0; border:0px; cursor: pointer; }

    </style>
	<?php

	$sketchdata = $_POST['sketchdata'];  

	if(isset($_POST['sketchdata'])) {

		$csv = fopen("sketches/playGNDarchive.csv", 'a') or die("can't open file");
		$name = $_POST['name'];
        $author = $_POST['author'];
		$time = date('m/d/Y--H:i:s');
	    $entry = $name . "," . $author . "," . $time . "," . $sketchdata ."\n";
	    fwrite($csv, $entry);
		fclose($csv);

	}
	?>
</head>

<body>

    <div class="menu">
        <a href="../" style="margin-right:50px">goto_index</a>
        <a href="../gui" style="margin-right:50px">goto_gui</a>
        <a href="../editor/indexb.html">goto_editor</a>
    </div>

    <div class="wrapper">

       
            <?php

                    if (($list = fopen("sketches/playGNDarchive.csv", "r")) !== FALSE) {  
                        while (($data = fgetcsv($list, 10000, ",")) !== FALSE) {
                            echo '<a href="http://brangerbriz.net/labs/threejs_playGnd/editor/#B/'.htmlspecialchars( $data[3]).'" target="_blank"><div class="item">' . $data[0] . " &nbsp;&nbsp;[by]&nbsp;&nbsp; ".$data[1]." &nbsp;&nbsp;[on]&nbsp;&nbsp; ".$data[2]."</div></a>"; 
                        }
                        fclose($list);
                    }

            ?>
        
    </div>


    
</body>
</html>
