import Typography from "typography"
import wordpressTheme from "typography-theme-wordpress-2016"

// TODO: rubic font

wordpressTheme.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
  }
}

delete wordpressTheme.googleFonts

const typography = new Typography(wordpressTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
