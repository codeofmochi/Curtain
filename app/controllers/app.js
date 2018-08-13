/**
 * Main app logic
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const ui = require('../controllers/ui')($)
const view_console = require('../controllers/console')($, ui)


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