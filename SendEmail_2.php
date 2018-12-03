<?php

	$emailAddress="purab@parekh.com";
	$name="Purab";
	$message="Hi Rajesh";
	$information="From : ".$emailAddress."<br> Name: ".$name."<br> Message :".$message;
	

require_once 'class.phpmailer.php';
require_once 'PHPMailerAutoload.php';
require 'class.smtp.php';

date_default_timezone_set('Asia/Calcutta');

	
	$to="youthbuild.org@gmail.com,shahrajesh2113@yahoo.com";
	$Bcc="rajeshshah2121@gmail.com";
	$cc="kiranparekhoffice@gmail.com";
	$subject="YouthBuild Website Request";
	
	// Mailer code
	$mail = new PHPMailer; //for sending mail
	$mail->isSMTP();// for telling smtp
	$mail->SMTPDebug = 1;
	
//	$mail->SMTPSecure = 'ssl';
	
	
	// $mail->Host = "smtp.mail.yahoo.com"; // yahoo because we are using mine account to send email
	// $mail->Port = 567;
	$mail->Host = "mail.supremecluster.com"; // yahoo because we are using mine account to send email
	$mail->Port = 25;
	$mail->SMTPAuth = true;
	
	// $mail->SMTPKeepAlive = true;  
	// $mail->Mailer = "smtp"; 
	$mail->CharSet = 'UTF-8';// For universely accepted
	
	$mail->Username = "r.shah@ftb.co.in";
	//Password to use for SMTP authentication
	$mail->Password = "Rajesh@21";
	//Set who the message is to be sent from
	$mail->setFrom('r.shah@ftb.co.in', 'Rajesh@21');
	
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

	$addresses = explode(',', $cc);
	if(count($addresses)>1)
	{
		foreach ($addresses as $address) {
			$mail->addCC($address);
			}
	}
	else
	{		
	$mail->addCC($cc);
	}


	$addresses = explode(',', $Bcc);
	if(count($addresses)>1)
	{
		foreach ($addresses as $address) {
			$mail->addBCC($address);
			}
	}
	else
	{		
	$mail->addBCC($Bcc);
	}

	
	//Set the subject line
	$mail->Subject = $subject;
	$mail->isHTML(true);

// $msg=str_replace("<GO>", "&lt;GO&gt;",$message);
// $msg = str_replace(">", "&gt;",$msg);
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML($information);
//Replace the plain text body with one created manually
//$mail->AltBody = $msg;
//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
var_dump($mail);
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
	// $stream = imap_open("{smtp.mail.yahoo.com:465}Sent", "shahrajesh2121@yahoo.in", "YouthBuild");
	// $mail_string = $mail->getSentMIMEMessage();
	// echo $mail_string;
	// imap_append($stream, "{smtp.mail.yahoo.com:465}Sent", $mail_string, "\\Seen");
    echo "Message sent!";
}

	
	
	
?>