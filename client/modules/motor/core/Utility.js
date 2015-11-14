
function epsilon(value) {
    return Math.abs(value) < 0.000001 ? 0 : value;
}

function applyCSSLabel(value, label) {
    if (value === 0) {
        return '0px'
    } else if (label === '%') {
        return value * 100 + '%';
    } else if (label === 'px') {
        return value + 'px'
    }
}

/**
 * Await for this to run code after the DOM has been parsed and loaded (but not
 * sub-resources like images, scripts, etc).
 */
async function documentReady() {
    if (document.readyState === 'loading') {
        return new Promise(function(resolve) {
            document.addEventListener('DOMContentLoaded', event => resolve())
        })
    }
    else return
}

/**
 * Await for this to run code after the DOM's sub-resources have been loaded
 * (images, scripts, etc).
 */
async function windowLoaded() {
    if (document.readyState !== 'complete') {
        return new Promise(function(resolve) {
            window.addEventListener('load', event => resolve())
        })
    }
    else return
}


/**
 * Alias to windowLoaded.
 */
async function documentLoaded() {
    return await windowLoaded()
}

/**
 * Get the dimensions of the body element.
 * @async
 * @return {Object} An object containing `width` and `height` properties.
 */
async function getBodySize() {
    await documentLoaded()

    let body = document.body
    let width = window.parseInt(window.getComputedStyle(body).getPropertyValue('width'))
    let height = window.parseInt(window.getComputedStyle(body).getPropertyValue('height'))

    return { width, height }
}

export {
  epsilon,
  applyCSSLabel,
  documentReady,
  windowLoaded,
  documentLoaded,
  getBodySize,
}
