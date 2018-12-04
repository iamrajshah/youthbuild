<?php

	$emailAddress=$_POST['email'];
	$name=$_POST['senderName'];
	$message=$_POST['message'];
	$information="From : ".$emailAddress."<br /> Name: ".$name."<br /> Message :".$message;
	

require_once 'class.phpmailer.php';
require_once 'PHPMailerAutoload.php';
require 'class.smtp.php';

date_default_timezone_set('Asia/Calcutta');

	
	$to="youthbuild.org@gmail.com,shahrajesh2113@yahoo.com";

	$subject="YouthBuild Website Request";
	 $mail = new PHPMailer();  // create a new object
    $mail->IsSMTP(); // enable SMTP
    // $mail->SMTPDebug = 2;  // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true;  // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
    $mail->SMTPAutoTLS = false;
    $mail->Host = 'sg2plcpnl0204.prod.sin2.secureserver.net';
    $mail->Port = 465;
	$mail->CharSet = 'UTF-8';// For universely accepted
	// $mail->SMTPSecure = 'ssl';
	// $mail->Host = 'smtp.gmail.com';
	// $mail->Port = 465;
	// $mail->Host = 'ssl://smtp.gmail.com:465';
	$from="iamrajshah@youthbuildindia.com";
	$mail->Username = $from;
	$mail->Password = "Rajesh@21";
	$mail->setFrom($from, 'YouthBuild Website Email');
	$addressesTo = explode(',', $to);
	if(count($addressesTo)>1)
	{
		foreach ($addressesTo as $address) {
			$mail->addAddress($address);
			}
	}
	else
	{		
		$mail->addAddress($to);
		
	}

	$mail->Subject = $subject;
	$mail->isHTML(true);


$mail->msgHTML($information);

if (!$mail->Send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {

    echo "Message sent!";
}
?>