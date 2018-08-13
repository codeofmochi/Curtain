/**
 * Main app logic
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

// Expose app context
const exports = {
    // jQuery for controllers
    jquery: $
}

const ui = require('../controllers/ui')(exports)
const view_console = require('../controllers/console')(exports)


$(document).ready(() => {

    // Register navigation actions
    $('#nav-console-button').click(() => { loadContent('console', view_console.setup) })
    $('#nav-timeline-button').click(() => { loadContent('timeline') })
    $('#nav-settings-button').click(() => { loadContent('settings') })

})


/**
 * Loads the specified content into the holder GUI
 */
function loadContent(name, then) {
    // read UI file
    ui.fromFile(`views/${name}.html`, (dom) => {
        $('#content').html(dom)
        then()
    })
}