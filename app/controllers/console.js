/**
 * Controller of the console view
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const artnetConfig = {
    host: "localhost"
}
const library = require('../controllers/LibraryManager')
const artnet = require('artnet')(artnetConfig)

const ConsoleController = function ($, ui) {
    const libraryView = ui.fromFileSync('views/builders/devices_library.html')
    const library_brands = libraryView.find("#library_brands")
    const library_models = libraryView.find('#library_models')
    const library_variations = libraryView.find("#library_variations")
    // currently selected fixture
    var selected = null

    // helper to fill the library view
    function fillLibraryView() {
        // reset lists
        library_brands.html("")
        library_models.html("")
        library_variations.html("")
        selected = null

        library.getBrands().forEach(brand => {
            // create a brand link, onclick reveals models
            const brandLink = $(`<a href="#">${brand}</a>`)
            brandLink.click(() => {
                selected = null
                brandLink.css("background", "#004d84")
                brandLink.css("color", "#fff")
                // reset model list
                library_models.html("")
                library_variations.html("")
                library.getModels(brand).forEach(model => {
                    // create a model link, onclick reveals variations
                    const modelLink = $(`<a href="#">${model}</a>`)
                    modelLink.click(() => {
                        modelLink.css("background", "#004d84")
                        modelLink.css("color", "#fff")
                        // reset variations list
                        library_variations.html("")
                        library.getVariations(brand, model).forEach(variation => {
                            // create a variation link, on click select the fixture
                            const variationLink = $(`<a href="#">${variation}</a>`)
                            variationLink.click(() => {
                                variationLink.css("background", "#004d84")
                                variationLink.css("color", "#fff")
                                selected = library.loadFixture(brand, model, variation)
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
        const sliderWidth = 30
        const container = $(`<div class="device"><h3>${device.name}</h3><p>${device.model}</p></div>`)
        container.css("width", device.channels.length * 50)
        device.channels.forEach(channel => {
            const channelBase = 1
            const channelBox = $('<div class="channel_box">')
            const slider = $('<div class="slider">')
            slider.slider({
                orientation: "vertical",
                min: 0,
                max: 255,
                slide: (event, ui) => {
                    artnet.set(channelBase + channel.index, ui.value)
                }
            })
            channelBox.append(slider)
            const label = (`<p>${channel.name}</p>`)
            channelBox.append(label)
            container.append(channelBox)
        })
        container.draggable()
        $('#devices-panel').append(container)
    }

    return {
        /**
         * To be called when the console view is created
         */
        setup: () => {
            // register button to add device
            fillLibraryView()
            $('#add-device-button').click(() => {
                libraryView.dialog({
                    width: 500,
                    buttons: {
                        "Select": () => {
                            if (selected) insertDevice(selected)
                            libraryView.dialog("close")
                        }
                    }
                })
            })
        }
    }
}

module.exports = ConsoleController