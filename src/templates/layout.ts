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
    {% block body %} {% endblock %}
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
