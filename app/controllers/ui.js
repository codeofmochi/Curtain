/**
 * Helper wrapping utils for DOM manipulation
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const fs = require('fs')

const UITools = function ($) {
    return {

        /**
         * Loads an UI template from HTML at path, then executes
         * callback with the UI element passed as arg
         */
        fromFile: (path, then) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) console.error("ui.js : error loading file \n" + err.message)
                else {
                    // make DOM from data
                    const dom = $(data)
                    then(dom)
                }
            })
        },

        /**
         * Loads an UI template from HTML at path
         */
        fromFileSync: (path) => {
            const data = fs.readFileSync(path, 'utf-8')
            return $(data)
        }
    }
}

module.exports = UITools