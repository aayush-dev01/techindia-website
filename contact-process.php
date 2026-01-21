
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $subject = $_POST["subject"];
    $budget = $_POST["budget"];
    $message = $_POST["message"];
    $newsletter = isset($_POST["newsletter"]) ? "Yes" : "No";

    // Send email (update the recipient email address)
    $to = "aayush.patil.social@gmail.com";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\nBudget: $budget\nNewsletter: $newsletter\n\nMessage:\n$message";
    $headers = "From: $email";

    mail($to, "Contact Form Submission", $body, $headers);

    echo "Thank you for contacting us!";
}
?>