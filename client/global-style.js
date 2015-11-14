import jss from '../modules/jss-configured'

let style = {
    'body, html': {
        margin:  '0',
        padding: '0',
        width:   '100%',
        height:  '100%',
    },
    "div": {
        boxSizing: 'border-box',
    },
}

jss.createStyleSheet(style, {named: false}).attach()
