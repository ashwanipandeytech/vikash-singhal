<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON data from the request body
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Collect form data
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $message = htmlspecialchars($data['message']);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com'; // Hostinger's SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'noreply@vikasmohansinghal.in'; // Your Hostinger email
        $mail->Password = 'VMSWebsite@123'; // Your Hostinger email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use SSL
        $mail->Port = 465; // Port for SSL

        // Recipients
        $mail->setFrom('noreply@vikasmohansinghal.in', 'Vikas mohan singhal');
        $mail->addAddress('vikasmohansinghal9@gmail.com'); // Owner's email
        $mail->addReplyTo($email, $name); // Submitter's email

        // Content
        $mail->isHTML(true);

        if (!isset($name) || $name === '') {
            // If name is not set or is an empty string, treat it as a subscription
            $mail->Subject = 'New User Subscription Notification';
            $mail->Body = "A new user has subscribed to your service!<br><br>Email: $email";
            
        } else {
            $mail->Subject = 'New Contact Form Submission';
           $mail->Body = "Name: $name<br>Email: $email<br>Message: $message";
        }

      

        // Send the email
        $mail->send();

        // Send acknowledgment email to the submitter
        $mail->clearAddresses();
        $mail->addAddress($email, $name);
        if (!isset($name) || $name === '') {
            $mail->Subject = 'Thank you for subscribing!';
            $mail->Body = "Hello,<br><br>Thank you for subscribing to our newsletter!<br><br>We are excited to have you with us. Stay tuned for updates and offers.<br><br>Best regards,<br>Vikas Mohan Singhal";

        }else{
            $mail->Subject = 'Thank you for contacting us!';
            $mail->Body = "Dear $name,<br><br>Thank you for contacting us. We have received your message and will get back to you soon.<br><br>Best regards,<br>Vikas Mohan Singhal";
    
        }
     
        $mail->send();

        echo json_encode(['status' => 'success', 'message' => 'Thank you for contacting us. We will get back to you soon!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Oops! Something went wrong and we couldn\'t send your message.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'There was a problem with your submission, please try again.']);
}
?>