// import mjml from "mjml";
// import { convert } from "html-to-text";

export function html({ url, host, email }) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  return `
        <body> 
          <h1>You have been invited to Teaming!</h1>
          <p><strong>Hello ${escapedEmail},</strong></p>
          <p>To complete the registration process, please click the button below:</p>
          <a href="${url}" style="color: #ffffff; text-decoration: none; padding: 6px 12px; background: #e53e3e; border-radius: 0.375rem;">Register with ${escapedHost}</a> 
          <p>Or copy and paste this URL into a new tab of your browser:</p>
          <a href="${url}">${url}</a>
          <p style='font-size: 13px; margin-top: 30px;'>If you didn't request membership but received this email, or if the location doesn't match, please ignore this email.</p>
        </body>
    `;
}

// Fallback for non-HTML email clients
export function text({ url, host }) {
  return `Register with ${host}\n${url}\n\n`;
}
