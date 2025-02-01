<?php
header('Content-Type: application/json'); // Set the response content type to JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON data from the request body
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Collect form data
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $message = htmlspecialchars($data['message']);



    
    // Set the recipient email address (owner's email)
    $to_owner = "ashwanipandeytech@gmail.com"; // Replace with the owner's email address

    // Set the email subject
    $subject_owner = "New Contact Form Submission";

    // Build the email content for the owner
    $email_content_owner = "Name: $name\n";
    $email_content_owner .= "Email: $email\n\n";
    $email_content_owner .= "Message:\n$message\n";

    // Set the email headers for the owner
    $headers_owner = "From: $name <$email>";

    // Send the email to the owner
    if (mail($to_owner, $subject_owner, $email_content_owner, $headers_owner)) {
        // Send an acknowledgment email to the form submitter
        $to_submitter = $email;
        $subject_submitter = "Thank you for contacting us!";
        $email_content_submitter = "Dear $name,\n\n";
        $email_content_submitter .= "Thank you for contacting us. We have received your message and will get back to you soon.\n\n";
        $email_content_submitter .= "Best regards,\nVikas Mohan Singhal";

        $headers_submitter = "From: Your Company Name <ashwanipandeytech@gmail.com>"; // Replace with your company's email

        if (mail($to_submitter, $subject_submitter, $email_content_submitter, $headers_submitter)) {
            echo "Thank you for contacting us. We will get back to you soon!";
        } else {
            echo "Thank you for contacting us. We have received your message, but there was an issue sending the acknowledgment email.";
        }
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    echo "There was a problem with your submission, please try again.";
}
?>