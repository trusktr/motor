import Node from './Node'

import '../style'

import {documentReady} from './Utility'

export default
class Scene extends Node {
    constructor(mountPoint, onMount) {
        super()

        // For now, Scenes are always proportionally sized by default.
        this._properties.size.modes = ['proportional', 'proportional', 'proportional']

        this._element.classList.add('motor-dom-scene')

        // set a manual perspective, since our dumbed down version of Motor doesn't have that:
        //
        // TODO: calculate perspective based on viewport size and aspect ratio.
        //
        // TODO: Why doesn't this work (setting perspective so that things
        // translated in Z axis move backward/forward)???????????????????????
        // See SO question: http://stackoverflow.com/questions/33110424
        this._element.style.webkitPerspective = '1000px'
        this._element.style.mozPerspective    = '1000px'
        this._element.style.perspective       = '1000px'
        //this._element.style.webkitPerspectiveOrigin = '25%'
        //this._element.style.mozPerspectiveOrigin = '25%'
        //this._element.style.perspectiveOrigin = '25%'

        // mount the scene into the target container, then call the onMount callback if any.
        this.isMountedPromise = this._mount(mountPoint)
            //.then(onMount instanceof Function ? onMount : ()=>{})
    }

    async _mount(mountPoint) {
        // Wait for the document to be ready before mounting, otherwise the
        // target mount point might not exist yet when this function is called.
        await documentReady()

        // TODO: Enable regenerator. Waiting for babel issue to be solved:
        // https://github.com/babel/babel/commit/940b86dadbd0151c33c02e89f0b5ff61077c9214#commitcomment-14259015

        // if no mountPoint was provided, just mount onto the <body> element.
        if (!mountPoint) {
            mountPoint = document.body
        }

        // if the user supplied a selector, mount there.
        else if(typeof mountPoint === 'string') {
            let selector = mountPoint
            mountPoint = document.querySelector(selector)
        }

        // if we have an actual mount point (the user may have supplied one)
        if (mountPoint instanceof window.HTMLElement) {
            mountPoint.appendChild(this._element)
            this._mounted = true
        }
        else {
            throw new Error('Invalid mount point specified. Specify a selector, or pass an actual HTMLElement.')
        }
    }

}
