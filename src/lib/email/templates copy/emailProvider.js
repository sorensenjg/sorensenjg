import mjml from "mjml";
import { convert } from "html-to-text";
// import { identity } from "lodash";

// import { parseISO, formatDistance } from "date-fns";

// const getDaysAgo = (date) => formatDistance(parseISO(date), new Date());

// const defaultLogoLight = process.env.DEFAULT_LOGO_LIGHT;
// const defaultLogoDark = process.env.DEFAULT_LOGO_DARK;
// const defaultBackground = process.env.DEFAULT_BACKGROUND_IMAGE;

// Logo goes here (logo)
// Verify your email to log on to Vercel
// Hello sorensenjg,
// We have received a login attempt from San Jose, United States with the following code:
// Delightful Golden Lion Tamarin (randomWords)
// To complete the login process, please click the button below:
// VERIFY (button)
// Or copy and paste this URL into a new tab of your browser:
// https://vercel.com/confirm?email=sorensenjg%40gmail.com&token=vAe7YN8Yi2kT0hPHXm38AGi9&mode=login
// If you didn't attempt to log in but received this email, or if the location doesn't match, please ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.

export function html({ url, host, email }) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  return `
        <body>
          <h1>Verify your email to log on to Teaming 🪄</h1>
          <p><strong>Hello ${escapedEmail},</strong></p>
          <p>To complete the login process, please click the button below:</p>
          <a href="${url}" style="color: #ffffff; text-decoration: none; padding: 6px 12px; background: #e53e3e; border-radius: 0.375rem;">Verify sign in to ${escapedHost}</a> 
          <p>Or copy and paste this URL into a new tab of your browser:</p>
          <a href="https://${escapedHost}/confirm?email=${escapedEmail}&token=vAe7YN8Yi2kT0hPHXm38AGi9&mode=login">${url}</a>
          <p style='font-size: 13px; margin-top: 30px;'>If you didn't attempt to log in but received this email, or if the location doesn't match, please ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.</p>
        </body>
    `;
}

// Fallback for non-HTML email clients
export function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export function defaultTemplate({
  title = "Teaming",
  logo = defaultLogoDark,
  coverImage = defaultBackground,
  to,
  identifier,
  content,
}) {
  const { html } = mjml(
    ` 
    <mjml>
      <mj-head>
        <mj-title>${title}</mj-title>  
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-image width="150px" src="${logo}" />
          </mj-column>
        </mj-section>
        <mj-hero
          mode="fluid-height"
          background-width="600px"
          background-height="280px"
          background-url=${coverImage}
          background-color="#E4E4E4"
          padding="100px 0px"
        >
          <mj-section padding="0">
            <mj-column width="60%" padding-top="20px" padding-bottom="20px" background-color="#E4E4E4">
              <mj-text
                color="#1A202C"
                font-family="Helvetica"
                align="center"
                font-size="45px"
                line-height="45px"
                font-weight="900"
              >
                Hello,<br /> <span style="font-size: 32px; line-height: 1;">${
                  identifier || to
                }!</span>  
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-button href="${process.env.APP_URL}" align="center">
            My Account
          </mj-button>
        </mj-hero>
        <mj-section padding="100px 30px" background-color="#E4E4E4">
          <mj-column>
            ${
              content &&
              `<mj-text color="#1A202C" font-size="18px" font-family="helvetica">${content}</mj-text>`
            } 
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `
  );

  const text = convert(html);

  return { html, text };
}

export function resetPasswordTemplate({
  title = "Teaming",
  logo = defaultLogoDark,
  coverImage = defaultBackground,
  to,
  identifier,
  content,
  token,
}) {
  const { html } = mjml(
    ` 
    <mjml>
      <mj-head>
        <mj-title>${title}</mj-title>  
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-image width="150px" src="${logo}" />
          </mj-column>
        </mj-section>
        <mj-hero
          mode="fluid-height"
          background-width="600px"
          background-height="280px"
          background-url=${coverImage}
          background-color="#E4E4E4"
          padding="100px 0px"
        >
          <mj-section padding="0">
            <mj-column width="60%" padding-top="20px" padding-bottom="20px" background-color="#E4E4E4">
              <mj-text
                color="#1A202C"
                font-family="Helvetica"
                align="center"
                font-size="45px"
                line-height="45px"
                font-weight="900"
              >
                Hello,<br /> <span style="font-size: 32px; line-height: 1;">${
                  identifier || to
                }!</span>  
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-hero>
        <mj-section padding="100px 30px" background-color="#E4E4E4">
          <mj-column>
            <mj-text color="#1A202C" font-size="18px" font-family="helvetica" align="center">Please use the link below to reset your password.</mj-text>
              ${
                content &&
                `<mj-text font-size="18px" font-family="helvetica">${content}</mj-text>`
              } 
              <mj-button href="${process.env.APP_URL}${
      process.env.RESET_PASSWORD_PAGE_ROUTE
    }?email=${to}&token=${token}">Reset Password</mj-button>
          </mj-column>
          </mj-section>
      </mj-body>
    </mjml>
  `
  );

  const text = convert(html);

  return { html, text };
}

{
  /* <mj-raw>
  <!-- Top Bar -->
</mj-raw>
<mj-section background-color="#FF3FB4" background-url="https://dmmedia.sphero.com/email-marketing/Sphero/Mini-Launch-email-Top-BarBG.jpg" padding="0px">
  <mj-column>
    <mj-image width="46px" href="https://www.sphero.com" src="https://dmmedia.sphero.com/email-marketing/Sphero/Mini-Launch-email-launch-logotop.png" align="center" alt="Sphero"></mj-image>
  </mj-column>
</mj-section>
<mj-spacer height="20px"></mj-spacer>
<mj-raw>
  <!-- Split Crane and Text -->
</mj-raw>
<mj-section background-color="#FCFCFD" padding-top="20px" padding-bottom="20px" padding-left="25px">
  <mj-column vertical-align="middle">
    <mj-text font-family="arial" font-size="16px" align="left" color="#808080">Good morning, <span style="color:#0098CE"><b>${to}!</b></span> We have rounded up all the listings we could find using your search query.</mj-text>
    <mj-button font-size="16px" href="${listingsUrl}" font-family="arial" background-color="#0098CE" color="#FFFFFF" inner-padding="5px 35px" border-radius="15px"><i>VIEW ALL LISTING</i></mj-button>
  </mj-column>
  <mj-column vertical-align="middle">
    <mj-image alt="Mix and Match Shells" href="https://store.sphero.com/products/sphero-mini-shells" src="https://dmmedia.sphero.com/email-marketing/Sphero/Mini-Launch-email-002A-RightCrane.jpg" width="325px" padding="0px"></mj-image>
  </mj-column>
</mj-section>
${listings.map((listing, i, arr) => {
  if (i % 2) {
    return `
      <mj-raw>
        <!-- Listing -->
      </mj-raw>
      <mj-section padding="0px" background-color="#FF3FB4" direction="rtl">
        <mj-column vertical-align="middle">
          <mj-image alt="${listing.title}" href="${listing.url}" src="${listing.imageUrl}" width="300px" padding="0px"></mj-image>
        </mj-column>
        <mj-column vertical-align="middle">
          <mj-spacer height="50px"></mj-spacer>
          <mj-text font-size="18px" align="center" color="#ffffff" font-weight="100" font-style="italic" letter-spacing="1px" padding-bottom="2px" font-family="Arial" line-height="1"><b>${listing.title}</b></mj-text>
          <mj-text font-size="14px" align="center" color="#ffffff" font-weight="100" padding-bottom="0px" font-family="Arial" line-height="1.5">${listing.location} | ${listing.price}</mj-text>
          <mj-spacer height="15px"></mj-spacer>
          <mj-button font-size="16px" href="${listing.url}" font-family="arial" background-color="#fff" color="#EE3C96" inner-padding="5px 35px" border-radius="15px"><i>VIEW LISTING</i></mj-button>
          <mj-spacer height="50px"></mj-spacer>
        </mj-column>
      </mj-section>
    `;
  } else {
    return `
      <mj-raw>
        <!-- Listing -->
      </mj-raw>
      <mj-section padding="0px" background-url="https://dmmedia.sphero.com/email-marketing/Sphero/Mini-Launch-email-002A-getminiBG.jpg" background-color="#FF3FB4">
        <mj-column vertical-align="middle">
          <mj-image alt="${listing.title}" href="${listing.url}" src="${listing.imageUrl}" width="300px" padding="0px"></mj-image>
        </mj-column>
        <mj-column vertical-align="middle">
          <mj-spacer height="50px"></mj-spacer>
          <mj-text font-size="18px" align="center" color="#ffffff" font-weight="100" font-style="italic" letter-spacing="1px" padding-bottom="2px" font-family="Arial" line-height="1"><b>${listing.title}</b></mj-text>
          <mj-text font-size="14px" align="center" color="#ffffff" font-weight="100" padding-bottom="0px" font-family="Arial" line-height="1.5">${listing.location} | ${listing.price}</mj-text>
          <mj-spacer height="15px"></mj-spacer>
          <mj-button font-size="16px" href="${listing.url}" font-family="arial" background-color="#fff" color="#EE3C96" inner-padding="5px 35px" border-radius="15px"><i>VIEW LISTING</i></mj-button>
          <mj-spacer height="50px"></mj-spacer>
        </mj-column>
      </mj-section>
    `;
  }
})}
<mj-raw>
  <!-- Bottom Bar -->
</mj-raw>
<mj-section padding="0px" background-url="https://dmmedia.sphero.com/email-marketing/Sphero/Mini-Launch-email-launch-bottombargradiantBG.png" background-color="#F15822">
  <mj-column>
    <mj-image width="160px" href="https://www.sphero.com" src="https://dmmedia.sphero.com/email-marketing/Sphero/Mini-Launch-email-launch-spherodotcombottom.png" align="center"></mj-image>
  </mj-column>
</mj-section> */
}
