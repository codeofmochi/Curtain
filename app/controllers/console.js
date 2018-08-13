/**
 * Controller of the console view
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const ConsoleController = function (app) {
    // dependencies requiring app context
    const ui = require('../controllers/ui')(app)

    // get jQuery from app context
    $ = app.jquery

    return {

        /**
         * To be called when the console view is created
         */
        setup: () => {
            // register button to add device
            $('#add-device-button').click(() => {
                ui.fromFile('views/builders/devices_library.html', (dom) => {
                    console.log("SETUP : dom built" + dom)
                    dom.dialog()
                })
            })
        }
    }
}

module.exports = ConsoleController