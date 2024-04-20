const pageUrl = "https://coustra.com";

export const verifyEmailTemplate = (token: string, username: string) => `
<!DOCTYPE html>
<html>
<head>
<title>Password Reset</title>
<style>
   body {
       font-family: Arial, sans-serif;
       margin: 0;
       padding: 20px;
       color: #333;
       background-color: #f4f4f4;
   }
   .email-container {
       max-width: 600px;
       margin: auto;
       background-color: #fff;
       padding: 20px;
       border-radius: 8px;
       box-shadow: 0 4px 8px rgba(0,0,0,0.1);
   }
   .logo {
       display: block;
       margin: 0 auto 20px auto;
       width: 120px; /* Adjust as per your logo's size */
   }
   .button {
       display: inline-block;
       background-color: #007bff;
       color: #ffffff;
       padding: 10px 20px;
       text-decoration: none;
       border-radius: 5px;
       margin-top: 20px;
   }
   .footer {
       margin-top: 20px;
       font-size: 0.9em;
       text-align: center;
       color: #666;
   }
</style>
</head>
<body>
<div class="email-container">
   <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
   <h1>Email Verifiaction</h1>
   <p>Hello ${username}!</p>
   <p>Welcome to Coustra! To complete your registration, please verify your email address by clicking the button below:</p>
   <a href="${pageUrl}/verify/${token}" class="button">Verify Email</a>
   <p>If you did not create an account with us, please ignore this email.</p>
   <p class="footer">Best regards,<br>Coustra Team</p>     
</div>
</body>
</html>
 `;

export const verifiedEmailTemplate = (username: string) => `
<!DOCTYPE html>
<html>
<head>
<title>Email Verified</title>
<style>
   body {
       font-family: Arial, sans-serif;
       margin: 0;
       padding: 20px;
       color: #333;
       background-color: #f4f4f4;
   }
   .email-container {
       max-width: 600px;
       margin: auto;
       background-color: #fff;
       padding: 20px;
       border-radius: 8px;
       box-shadow: 0 4px 8px rgba(0,0,0,0.1);
   }
   .logo {
       display: block;
       margin: 0 auto 20px auto;
       width: 120px; /* Adjust as per your logo's size */
   }
   .button {
       display: inline-block;
       background-color: #007bff;
       color: #ffffff;
       padding: 10px 20px;
       text-decoration: none;
       border-radius: 5px;
       margin-top: 20px;
   }
   .footer {
       margin-top: 20px;
       font-size: 0.9em;
       text-align: center;
       color: #666;
   }
</style>
</head>
<body>
<div class="email-container">
   <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
   <h1>Email Verified</h1>
   <p>Hello ${username}!</p>
   <p>Your email was successfully verified</p>
   <p>Thank you for choosing Coustra</p>
   <p class="footer">Best regards,<br>Coustra Team</p>
   
</div>
</body>
</html>
 `;

export const coinCreation = (username: string, coinName: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Coin Created</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
            display: block;
            margin: 0 auto 20px auto;
            width: 120px; /* Adjust as per your logo's size */
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
        <h1>Hello ${username}!</h1>
        <p>Your coin ${coinName} was successfully created and is ready for activation </p>
        <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
        <p class="footer">Best regards,<br>Coustra Team</p>
    </div>
</body>
</html>
`;

export const coinActivation = (username: string, coinName: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Coin Activated</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
            display: block;
            margin: 0 auto 20px auto;
            width: 120px; /* Adjust as per your logo's size */
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
        <h1>Hello ${username}!</h1>
        <p>Your coin ${coinName} was successfully activated and is ready to lift off </p>
        <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
        <p class="footer">Best regards,<br>Coustra Team</p>
    </div>
</body>
</html>
`;

export const coinFundingFinished = (username: string, coinName: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Coin Funding Finished</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
            display: block;
            margin: 0 auto 20px auto;
            width: 120px; /* Adjust as per your logo's size */
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
        <h1>Hello ${username}!</h1>
        <p>The funding of "${coinName}" successfully finished </p>
        <p>The coin payout will start in around 2-3 business days</p>
        <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
        <p class="footer">Best regards,<br>Coustra Team</p>
    </div>
</body>
</html>
`;

export const coinPayout = (username: string, coinName: string, liveDate: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Coin Payout</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
            display: block;
            margin: 0 auto 20px auto;
            width: 120px; /* Adjust as per your logo's size */
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
        <h1>Hello ${username}!</h1>
        <p>The payout for "${coinName}" finished</p>
        <p>The coin will be go live at ${liveDate}</p>
        <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
        <p class="footer">Best regards,<br>Coustra Team</p>
    </div>
</body>
</html>
`;


export const refundRequest = (username: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Refund Request Sent</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
            display: block;
            margin: 0 auto 20px auto;
            width: 120px; /* Adjust as per your logo's size */
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
        <h1>Hello ${username}!</h1>
        <p>Your refund request was sent sucessfully </p>
         <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
        <p class="footer">Best regards,<br>Coustra Team</p>
    </div>
</body>
</html>
`;

export const refundStateChanged = (username: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Refund State Updated</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
            display: block;
            margin: 0 auto 20px auto;
            width: 120px; /* Adjust as per your logo's size */
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://flurme.github.io/images/logo.png" alt="Coustra Logo" class="logo">
        <h1>Hello ${username}!</h1>
        <p>The status of one of your requests was updated </p>
        <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
        <p class="footer">Best regards,<br>Coustra Team</p>
    </div>
</body>
</html>
`;
