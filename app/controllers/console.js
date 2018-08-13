/**
 * Controller of the console view
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const ConsoleController = function ($, ui) {
    return {

        /**
         * To be called when the console view is created
         */
        setup: () => {
            // register button to add device
            $('#add-device-button').click(() => {
                ui.fromFile('views/builders/devices_library.html', (dom) => {
                    dom.dialog()
                })
            })
        }
    }
}

module.exports = ConsoleController