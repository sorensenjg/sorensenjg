import { TinaMarkdown as _TinaMarkdown } from 'tinacms/dist/rich-text'

const components = {
  Iframe: (props) => {
    return (
      <iframe
        src={props.src || ''}
        width={props.width || '100%'}
        height={props.height || 'auto'}
        referrerPolicy="no-referrer"
        className="aspect-video"
      ></iframe>
    )
  },
}

export const TinaMarkdown = (props) => (
  <_TinaMarkdown components={components} {...props} />
)
