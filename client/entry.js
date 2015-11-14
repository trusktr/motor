/*
 * Main imports. ---------------------------
 */
// TODO: import a LOADING_ANIMATION here.

import TWEEN from 'tween.js'

//import HierarchyMap from './modules/HierarchyMap'

// load the app routes.
//import './modules/router.js'

import Node  from './modules/motor/core/Node'
import Scene from './modules/motor/core/Scene'

import Curves from './modules/motor/core/Curves'

import jss from '../modules/jss-configured'

import './global-style'

import {getBodySize} from './modules/motor/core/Utility'

// TODO: unload the LOADING_ANIMATION here.

let rAF = null // reference to the global rAF loop.

/*
 * entrypoint. ---------------------------
 */
~async function main() {
    let scene = new Scene()

    let space = new Node
    scene.addChild(space)
    space.setSizeModes(['proportional', 'proportional', 'proportional'])
    space.setProportionalSize([1, 1, 1])

    let box = new Node
    scene.addChild(box)

    box.setSizeModes(['absolute', 'absolute', 'absolute'])
    box.setAbsoluteSize([50,50,50])
    box.setPosition([10,10,5])

    box._element.innerHTML = '<div>hello</div>'

    // use jss here.
    jss.createRule({
        background: 'rgba(75, 61, 102, 1)',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
    }).applyTo(box._element)

    // use jss here.
    jss.createRule({
        width: '100%',
        height: '100%',
        color: 'white',
        textAlign: 'center',
    }).applyTo(box._element.firstChild)

    // render after the body size is available (it is ready at some random point
    // after the DOMContentLoaded event, but I'm not sure exactly what makes it
    // be available). The Scene needs to know what size container it is in for
    // certain things to work (align and mountPoint calculations).
    await getBodySize()
    scene.render()

    let initialPos = box.getPosition()
    let tween = new TWEEN.Tween({
        x: initialPos[0], y: initialPos[1], z: initialPos[2],
    })
    tween.to({ x: 200, y: 200, z: 200 }, 1500)
        .easing(Curves.ExponentialInOut)
        .onUpdate(function() {
            box.setPosition([this.x, this.y, this.z])
            box.render()
        })
    startTween(tween)

    let debouncedRender = _.debounce(x => scene.render(), 300)
    window.addEventListener('resize', event => debouncedRender())

}()

function startTween(tween) {
    tween.start()
    startLoop()
}

// Render the scene repeatedly. In the future we can render only the needed
// parts.
function startLoop() {
    // start an rAF loop if there isn't one.
    if (!rAF) {
        rAF = requestAnimationFrame(function tick() {

            // If we have a reason to request a new frame, continue.
            if (TWEEN.getAll().length) {
                rAF = requestAnimationFrame(tick)
                TWEEN.update()
            }

            // Otherwise don't request the next frame, and nullify the rAF
            // reference.
            else {
                rAF = null
            }
        })
    }
}
