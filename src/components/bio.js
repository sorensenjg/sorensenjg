/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

/**
 * STEP 1: Import the json hooks
 */
import { useLocalJsonForm } from "gatsby-tinacms-json"

const Bio = () => {
  /**
   * STEP 2: Add the `fileRelativePath` and `rawJson` to your gatsby query
   */
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      author: dataJson(pk: { eq: "author" }) {
        title
        author
        description
        siteUrl
        contact {
          email
          phone
        }
        social {
          github
          twitter
        }
        ###############
        # Tina Fields #
        ###############
        fileRelativePath
        rawJson
      }
    }
  `)

  /**
   * STEP 3: Make the author editable with `useLocalJsonForm`
   *
   * Then checkout `useGlobalJsonForm`
   */

  const [{ author, contact, social }] = useLocalJsonForm(data.author, {
    label: "Author Bio",
    fields: [
      { name: "rawJson.author", label: "Author Name", component: "text" },
      {
        name: "rawJson.contact",
        label: "Contact Info",
        component: "group",
        fields: [
          { label: "Email", name: "email", component: "text" },
          { label: "Phone", name: "phone", component: "text" },
        ],
      },
      {
        name: "rawJson.social",
        label: "Social Info",
        component: "group",
        fields: [
          { label: "@GitHub", name: "github", component: "text" },
          { label: "@Twitter", name: "twitter", component: "text" },
        ],
      },
    ],
  })
  // const [{ name, social }] = useGlobalJsonForm(data.author, {
  //   label: "Author",
  //   fields: [{ name: "rawJson.author", label: "Name", component: "text" }],
  // })

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>
        <p>
          I'm <strong>{author}</strong>, a web developer at{" "}
          <a
            href="https://www.dystrick.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            dystrick
          </a>
          , who lives and works in the Silicon Valley. I'm passionate about
          cutting edge web tech, great design and UX, and performance. When I'm
          not working you can find me in the Sierra Nevada mountains... camping,
          fishing, and off-roading with my family and friends.
        </p>
        <p>
          You can contact me by email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> <br />
          or follow me at{" "}
          <a
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  )
}

export default Bio
