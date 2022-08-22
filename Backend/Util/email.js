const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.MAIL_KEY);

exports.sendEmail = async (message) => {
  await sgMail.send(message);
};

exports.htmlTemplate = (token) => {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
  </head>
  <body style="
        background-color: lightblue;
        padding: 20px;
      ">
    <div>
    <h1 style="text-align: center;" >استعادة كلمة المرور</h1>
    </div>
    <div>
    <p style="text-align: center;">
    اذا قمت بطلب استعادة كلمة المرور اضغط على الزر بالأسفل او تجاهل الرسالة
    </p>
    </div>
    <div style="margin:10px auto; text-align: center;">
    <a style="text-decoration:none; color: #212529; background-color: #eab308; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 0 auto;"
    href=https://todo-hamad.netlify.app/resetPassword/${token}>اضغط هنا</a>
    </div>
  </body>
</html>
`;
};
