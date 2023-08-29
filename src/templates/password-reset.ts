export default `<body style="background: #efefef; padding: 16px">
<table
  width="100%"
  cellspacing="20"
  cellpadding="0"
  border="0"
  style="
    padding: 10px;
    max-width: 600px;
    margin: auto;
    border-radius: 5px;
    background: #ffffff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  "
>
  <tr>
    <td align="center">
      <img alt="Anibay" src="{{serverAddress}}/full-logo.png" />
    </td>
  </tr>
  <tr>
<table style="padding: 60px 0 0 0">
  <tr>
    <td align="center">
      <p style="color: #141414; font-size: 14px">
        Password reset has been requested for this email on Anibay. Follow the link below to create a new password and
        regain access to your account.
      </p>
    </td>
  </tr>

  <tr>
    <td align="center" style="padding: 110px 0">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <a
              href="{{url}}"
              target="_blank"
              style="
                font-size: 16px;
                font-family: Helvetica, Arial, sans-serif;
                background-color: #d61336;
                text-decoration: none;
                color: #ffffff;
                border-radius: 5px;
                padding: 10px 30px;
                display: inline-block;
                font-weight: bold;
              "
              >Reset Password</a
            >
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</tr>
<tr>
  <td
    align="center"
    style="margin: 0 0 10px 0; font-size: 10px; font-family: Helvetica, Arial, sans-serif; color: #141414"
  >
    If you did not request this email you can safely ignore it.
  </td>
</tr>
<tr>
  <td align="center" style="font-size: 10px; font-family: Helvetica, Arial, sans-serif; color: #888888">
    &copy;2023 Anibay. All rights reserved.
  </td>
</tr>
</table>
</body>
`
