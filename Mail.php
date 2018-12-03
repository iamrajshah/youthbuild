<?php
/**
 * This example shows making an SMTP connection with authentication.
 */

 
 // $to=$_POST["to"];
 // $cc=$_POST["cc"];
 // $subject=$_POST["subject"];
 // $msg=$_POST["msg"];
 
 $emailAddress=$_POST['email'];
	$name=$_POST['senderName'];
	$message=$_POST['message'];
// echo $msg;
 
 
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Asia/Calcutta');

require_once 'PHPMailerAutoload.php';
require_once 'class.phpmailer.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages

$mail->CharSet = 'UTF-8';

//$mail->SMTPDebug = 2;
//Ask for HTML-friendly debug output

//$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = "mail.supremecluster.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 25;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "preeti.thakar@vizitechsolutions.com";
//Password to use for SMTP authentication
$mail->Password = "welcome1";
//Set who the message is to be sent from
$mail->setFrom('preeti.thakar@vizitechsolutions.com', 'vizitech Solutions');
//Set an alternative reply-to address
//$mail->addReplyTo('r.shah@ftb.co.in', 'Raj Shah');
//Set who the message is to be sent to



// $addressesTo = explode(',', $to);
// if(count($addressesTo)>1)
// {
	// foreach ($addressesTo as $address) {
		// $mail->addAddress($address);
		// }
// }
// else
// {		
	// $mail->addAddress($to);
	
// }


// //$mail->addAddress('smstest@ftb.co.in', 'Rajesh');

// $addresses = explode(',', $cc);
// if(count($addresses)>1)
// {
	// foreach ($addresses as $address) {
		// $mail->addCC($address);
		// }
// }
// else
// {		
// $mail->addCC($cc);
// }


// //Set the subject line
// $mail->Subject = $subject;
// $mail->isHTML(true);

 // $msg=str_replace("<GO>", "&lt;GO&gt;",$msg);
// // $msg = str_replace(">", "&gt;",$msg);
// //Read an HTML message body from an external file, convert referenced images to embedded,
// //convert HTML into a basic plain-text alternative body
// $mail->msgHTML($msg);
// //Replace the plain text body with one created manually
// //$mail->AltBody = $msg;
// //Attach an image file
// //$mail->addAttachment('images/phpmailer_mini.png');


//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
	$stream = imap_open("{mail.supremecluster.com:143}Sent", "preeti.thakar@vizitechsolutions.com", "welcome1");
	$mail_string = $mail->getSentMIMEMessage();
	echo $mail_string;
	imap_append($stream, "{mail.supremecluster.com:143}Sent", $mail_string, "\\Seen");
    echo "Message sent!";
}

?>