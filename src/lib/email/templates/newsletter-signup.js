// import mjml from "mjml";
// import { convert } from "html-to-text";

export function newsletterSignupHtml(email) {
  // const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;

  return `
          <body> 
            <h1>New Newsletter Signup</h1>
            <p><strong>from ${email}</strong></p>
          </body>
      `;
}

// Fallback for non-HTML email clients
export function newsletterSignupText(email) {
  return `New Newsletter Signup from: ${email}`;
}
