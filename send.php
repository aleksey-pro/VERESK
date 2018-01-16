<?php
// Файлы phpmailer
require 'lib/class.phpmailer.php';
require 'lib/class.smtp.php';

// Настройки
$mail = new PHPMailer;

$mail->isSMTP();
$mail->CharSet = 'UTF-8';
$mail->Host = 'mail.nic.ru';
$mail->SMTPAuth = true;
$mail->Username = 'postmaster@ptd.spb.ru';
$mail->Password = '';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465; //587, 25 или 2525
$mail->setFrom('postmaster@ptd.spb.ru'); //  Ваш Email
$mail->addAddress('office@veresk-vafli.ru'); // Email получателя

// Письмо
$mail->isHTML(true);
$mail->Subject = "Сообщение с сайта veresk-vafli.ru"; // Заголовок письма

$mail->Body = "Имя: {$_POST['name']}<br> Email: {$_POST['email']}<br> Телефон: {$_POST['phone']}<br> Сообщение: " . nl2br($_POST['mess']);

// Результат
if(!$mail->send()) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'ok';
}
?>
