export default {
    theme: {
      name: 'Custom Theme',
      settings: [
        {
          scope: ['text'],
          settings: {
            foreground: 'var(--font-color)'
          }
        },
        {
          scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
          settings: {
            foreground: 'var(--secondary-color)'
          }
        },
        {
          scope: ['variable'],
          settings: {
            foreground: 'var(--font-color)'
          }
        },
        {
          scope: ['keyword', 'storage.type', 'storage.modifier', 'entity.name.tag'],
          settings: {
            foreground: 'var(--primary-color)'
          }
        },
        {
          scope: ['string', 'entity.name.section', 'entity.other.attribute-name', 'constant.numeric', 'constant.language', 'constant.character', 'constant.other'],
          settings: {
            foreground: 'var(--secondary-color)'
          }
        },
        {
          scope: ['entity.name.tag', 'meta.tag.sgml', 'markup.deleted.git_gutter'],
          settings: {
            foreground: 'var(--primary-color)'
          }
        },
        {
          scope: ['entity.other.attribute-name', 'variable.parameter.function'],
          settings: {
            foreground: 'var(--primary-color)'
          }
        },
        {
          scope: ['string', 'constant.other.symbol', 'entity.other.inherited-class'],
          settings: {
            foreground: 'var(--secondary-color)'
          }
        },
        {
          scope: ['markup.heading'],
          settings: {
            fontStyle: 'bold'
          }
        },
        {
          scope: ['markup.italic'],
          settings: {
            fontStyle: 'italic'
          }
        },
        {
          scope: ['markup.bold'],
          settings: {
            fontStyle: 'bold'
          }
        }
      ],
      colors: {
        'editor.background': 'var(--block-background-color)',
        'editor.foreground': 'var(--font-color)'
      }
    }
  };