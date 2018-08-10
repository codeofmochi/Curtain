const artnetConfig = {
    host: "localhost"
}
const artnet = require("artnet")(artnetConfig)

var intensity = 0
var up = true

setInterval(() => {
    if (intensity >= 255) up = false
    if (intensity <= 0) up = true
    
    if (up) intensity++
    else intensity--

    // dimmer channel
    artnet.set(1, 255)
    artnet.set(4, intensity)
    artnet.set(5, intensity)

    console.log(intensity)

}, 10)