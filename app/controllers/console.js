/**
 * Controller of the console view
 *
 * @author Alexandre CHAU <code@chau.moe>
 */
const Library = require('../controllers/DeviceLibrary')

const ConsoleController = function ($, ui, DeviceManager) {
    const libraryView = ui.fromFileSync('views/builders/devices_library.html')
    const library_brands = libraryView.find("#library_brands")
    const library_models = libraryView.find('#library_models')
    const library_variations = libraryView.find("#library_variations")

    // currently selected fixture
    var selected = null

    // helper to fill the Library view
    function fillLibraryView() {
        // reset lists
        library_brands.html("")
        library_models.html("")
        library_variations.html("")
        selected = null

        Library.getBrands().forEach(brand => {
            // create a brand link, onclick reveals models
            const brandLink = $(`<a href="#">${brand}</a>`)
            brandLink.click(() => {
                selected = null
                brandLink.css("background", "#004d84")
                brandLink.css("color", "#fff")
                // reset model list
                library_models.html("")
                library_variations.html("")
                Library.getModels(brand).forEach(model => {
                    // create a model link, onclick reveals variations
                    const modelLink = $(`<a href="#">${model}</a>`)
                    modelLink.click(() => {
                        selected = null
                        modelLink.css("background", "#004d84")
                        modelLink.css("color", "#fff")
                        // reset variations list
                        library_variations.html("")
                        Library.getVariations(brand, model).forEach(variation => {
                            // create a variation link, on click select the fixture
                            const variationLink = $(`<a href="#">${variation}</a>`)
                            variationLink.click(() => {
                                variationLink.css("background", "#004d84")
                                variationLink.css("color", "#fff")
                                selected = Library.loadFixture(brand, model, variation)
                            })
                            library_variations.append(variationLink)
                        })
                    })
                    library_models.append(modelLink)
                })
            })
            library_brands.append(brandLink)
        })
    }

    // inserts a device into the app
    function insertDevice(device) {
        const devices_panel = $('#devices-panel')
        const container = $(`<div class="device"><h3>${device.name}</h3><p>${device.model}</p></div>`)
        const closeButton = $('<button class="close"><i class="fas fa-window-close"></i></button>')
        closeButton.click(() => {
            const confirm = $(`<div title="Warning"><p>Remove ${device.name} ?</p></div>`)
            confirm.dialog({
                buttons: {
                    "Ok": () => {
                        DeviceManager.removeDevice(device)
                        container.remove()
                        confirm.dialog("close")
                    },
                    "Cancel": () => {
                        confirm.dialog("close")
                    }
                }
            })
        })
        container.prepend(closeButton)
        container.css("width", device.channels.length * 40)
        device.channels.forEach(channel => {
            const channelBox = $('<div class="channel_box">')
            const slider = $('<div class="slider">')
            slider.slider({
                orientation: "vertical",
                min: 0,
                max: 255,
                slide: (event, ui) => {
                    channel.update(ui.value)
                }
            })
            channelBox.append(slider)
            channelBox.append(`<p>${channel.name}</p>`)
            channelBox.append(`<p>${channel.index}</p>`)
            container.append(channelBox)
        })
        devices_panel.append(container)
        // could make device draggable
        // container.draggable()
    }

    return {
        /**
         * To be called when the console view is created
         */
        setup: () => {
            // insert already existing devices
            DeviceManager.allDevices.forEach(device => insertDevice(device))
            // register button to add device
            fillLibraryView()
            $('#add-device-button').click(() => {
                libraryView.dialog({
                    width: 600,
                    buttons: {
                        "Select": () => {
                            if (selected) {
                                const dev = DeviceManager.makeDevice(selected, $('#library_name').val(), parseInt($('#library_universe')), parseInt($('#library_baseChannel').val()))
                                insertDevice(dev)
                            }
                            libraryView.dialog("close")
                        }
                    }
                })
            })
        }
    }
}

module.exports = ConsoleController