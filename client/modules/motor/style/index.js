import jss from '../../../../modules/jss-configured'

let style = {
    '.motor-dom-node': {
      position:        'absolute',
      transformOrigin: 'left top 0px',
      transformStyle:  'preserve-3d',
    },

    '.motor-dom-scene': {
      position: 'relative !important',
      overflow: 'hidden',
      width:    '100%',
      height:   '100%',
    },

    '.motor-scrollable': {
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
}

jss.createStyleSheet(style, {named: false}).attach()

