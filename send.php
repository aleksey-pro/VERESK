<?php
// Файлы phpmailer
require 'source/PHPMailer/class.phpmailer.php';
require 'source/PHPMailer/class.smtp.php';

// Настройки
$mail = new PHPMailer;

$mail->isSMTP();
$mail->CharSet = 'UTF-8';
$mail->Host = 'mail.nic.ru';
$mail->SMTPAuth = true;
$mail->Username = 'postmaster@ptd.spb.ru';
$mail->Password = 'YpAt8NcBgE';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465; //587, 25 или 2525
$mail->setFrom('postmaster@ptd.spb.ru'); //  Ваш Email
$mail->addAddress('ptd@fgr.ru'); // Email получателя


// $Mailer->SMTPDebug = 3;
// $Mailer->SMTPDebug = 4;

// Письмо
$mail->isHTML(true);
$mail->Subject = "Сообщение с сайта ptd.spb.ru"; // Заголовок письма

$mail->Body = "Имя: {$_POST['name']}<br> Email: {$_POST['email']}<br> Телефон: {$_POST['phone']}<br> Сообщение: " . nl2br($_POST['mess']);

// Результат
if(!$mail->send()) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'ok';
}
?>
