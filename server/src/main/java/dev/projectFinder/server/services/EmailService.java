package dev.projectFinder.server.services;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final SendGrid sendGrid;

    public void sendSingleEmail(String toEmail, String subject, String token ) throws IOException {
        // specify the email details
        String fromEmail = "21522448@gm.uit.edu.vn";
        Email from = new Email(fromEmail);

        Email to = new Email(toEmail);
        String emailVerifyHtml = "<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                        "    <title>Verify</title>\n" +
                        "    <style>\n" +
                        "\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "\n" +
                        "<body\n" +
                        "    style=\"display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(135, 191, 243); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px;\">\n" +
                        "    <div\n" +
                        "        style=\"background-color: white; border-radius: 12px; width: 80%; height: auto; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);margin-top: 50px; \">\n" +
                        "        <div style=\"width: 100%; display: flex; align-items: center; justify-content: center; margin-top: 20px;\">\n" +
                        "            <img src=\"https://thumbs.dreamstime.com/z/password-security-new-account-online-registration-mobile-sign-up-user-interface-autification-secure-login-vector-woman-219025315.jpg?w=992\" width=\"40%\" />\n" +
                        "        </div>\n" +
                        "        <div style=\"font-size: 36px; font-weight: 700; color: rgb(66, 60, 60); text-align: center; \">Verify your email\n" +
                        "            address</div>\n" +
                        "        <div style=\"text-align: center; margin: 20px 0 12px 0;\">Thank you for choosing ProjectFinder. You've entered\n" +
                        "            this email as email address for your account.</div>\n" +
                        "        <div style=\"text-align: center; margin: 10px 0 20px 0;\">Please verify this email address by clicking button\n" +
                        "            below within 10 minutes.</div>\n" +
                        "        <div style=\"width: 100%; display: flex; align-items: center; justify-content: center; margin: 30px 0 40px 0;\">\n" +
                        "            <a href='http://localhost:5173/user-auth/verify-account/"+token+"'" +
                        "                style=\"border: none; background-color: rgb(70, 70, 203); color: white; padding: 16px; font-size: 16px; border-radius: 6px; cursor: pointer; text-decoration: none;\">Verify \n" +
                        "                your email</a>\n" +
                        "        </div>\n" +
                        "        <div\n" +
                        "            style=\"border-top: 1px solid #ccc; padding: 40px 40px 0px 40px; margin: 10px 150px 0px 150px; font-size: 13px; color: #7a7a7a;\">\n" +
                        "            <div style=\"text-align: center;\">Please ignore this email If you did not request a verify account, please\n" +
                        "                contact us\n" +
                        "                <strong>IMMEDIATELY</strong> so we can keep your account secure.\n" +
                        "            </div>\n" +
                        "            <div style=\"text-align: center; margin-top: 10px;\">Need help? Ask at <span\n" +
                        "                    style=\"text-decoration: underline; color: rgb(70, 70, 203); cursor: pointer;\">projectFinder@gmail.com</span>\n" +
                        "                or visit Help Center.</div>\n" +
                        "        </div>\n" +
                        "        <div\n" +
                        "            style=\" padding: 20px 40px 20px 40px; margin: 10px 150px 20px 150px; font-size: 13px; color: #7a7a7a; text-align: center;\">\n" +
                        "            <div style=\"margin-top: 6px;\">Project Finder, Inc.</div>\n" +
                        "            <div style=\"margin-top: 6px;\">330 East 59th Street, 7th Floor</div>\n" +
                        "            <div style=\"margin-top: 6px;\">New York, NY 10022, USA</div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "\n" +
                        "</html>";
        Content content = new Content("text/html", emailVerifyHtml);

        // initialize the Mail helper class
        Mail mail = new Mail(from, subject, to, content);
//        mail.personalization.get(0).addSubstitution("-name-", "Example User");
//        mail.personalization.get(0).addSubstitution("-city-", "Denver");
//        mail.setTemplateId("d-949ed4e79f4e46758437388c617e2cbb");
        // send the single email
        sendEmail(mail);
    }
    public void sendSingleResetPasswordEmail(String toEmail, String subject, String token ) throws IOException {
        // specify the email details
        String fromEmail = "21522448@gm.uit.edu.vn";
        Email from = new Email(fromEmail);

        Email to = new Email(toEmail);
        String emailVerifyHtml = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Verify</title>\n" +
                "    <style>\n" +
                "\n" +
                "    </style>\n" +
                "</head>\n" +
                "\n" +
                "<body\n" +
                "    style=\"display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(135, 191, 243); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px;\">\n" +
                "    <div\n" +
                "        style=\"background-color: white; border-radius: 12px; width: 80%; height: auto; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);margin-top: 50px; \">\n" +
                "        <div style=\"width: 100%; display: flex; align-items: center; justify-content: center; margin-top: 20px;\">\n" +
                "            <img src=\"https://thumbs.dreamstime.com/z/password-security-new-account-online-registration-mobile-sign-up-user-interface-autification-secure-login-vector-woman-219025315.jpg?w=992\" width=\"40%\" />\n" +
                "        </div>\n" +
                "        <div style=\"font-size: 36px; font-weight: 700; color: rgb(66, 60, 60); text-align: center; \">Password Reset \n" +
                "            Request</div>\n" +
                "        <div style=\"text-align: center; margin: 20px 0 12px 0;\">Thank you for choosing ProjectFinder. You've requested\n" +
                "            a password reset for your account.</div>\n" +
                "        <div style=\"text-align: center; margin: 10px 0 20px 0;\">Please clicking button\n" +
                "            below within 10 minutes to reset your password.</div>\n" +
                "        <div style=\"width: 100%; display: flex; align-items: center; justify-content: center; margin: 30px 0 40px 0;\">\n" +
                "            <a href='http://localhost:5173/user-auth/reset-password/"+token+"'" +
                "                style=\"border: none; background-color: rgb(70, 70, 203); color: white; padding: 16px; font-size: 16px; border-radius: 6px; cursor: pointer; text-decoration: none;\">Reset \n" +
                "                your password</a>\n" +
                "        </div>\n" +
                "        <div\n" +
                "            style=\"border-top: 1px solid #ccc; padding: 40px 40px 0px 40px; margin: 10px 150px 0px 150px; font-size: 13px; color: #7a7a7a;\">\n" +
                "            <div style=\"text-align: center;\">Please ignore this email If you did not request a password change, please\n" +
                "                contact us\n" +
                "                <strong>IMMEDIATELY</strong> so we can keep your account secure.\n" +
                "            </div>\n" +
                "            <div style=\"text-align: center; margin-top: 10px;\">Need help? Ask at <span\n" +
                "                    style=\"text-decoration: underline; color: rgb(70, 70, 203); cursor: pointer;\">projectFinder@gmail.com</span>\n" +
                "                or visit Help Center.</div>\n" +
                "        </div>\n" +
                "        <div\n" +
                "            style=\" padding: 20px 40px 20px 40px; margin: 10px 150px 20px 150px; font-size: 13px; color: #7a7a7a; text-align: center;\">\n" +
                "            <div style=\"margin-top: 6px;\">Project Finder, Inc.</div>\n" +
                "            <div style=\"margin-top: 6px;\">330 East 59th Street, 7th Floor</div>\n" +
                "            <div style=\"margin-top: 6px;\">New York, NY 10022, USA</div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "\n" +
                "</html>";
        Content content = new Content("text/html", emailVerifyHtml);

        // initialize the Mail helper class
        Mail mail = new Mail(from, subject, to, content);
//        mail.personalization.get(0).addSubstitution("-name-", "Example User");
//        mail.personalization.get(0).addSubstitution("-city-", "Denver");
//        mail.setTemplateId("d-949ed4e79f4e46758437388c617e2cbb");
        // send the single email
        sendEmail(mail);
    }
    private void sendEmail(Mail mail) throws IOException {
        // set the SendGrid API endpoint details as described
        // in the doc (https://docs.sendgrid.com/api-reference/mail-send/mail-send)
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());

        // perform the request and send the email
        Response response = sendGrid.api(request);
        int statusCode = response.getStatusCode();
        // if the status code is not 2xx
        if (statusCode < 200 || statusCode >= 300) {
            throw new RuntimeException(response.getBody());
        }
    }
}
