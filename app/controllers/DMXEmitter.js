/**
 * Handles real-world artnet and DMX signals
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

artnetConfig = {
    host: "localhost"
}
const artnet = require('artnet')(artnetConfig)

module.exports = {
    send: (universe, channel, value) => {
        artnet.set(universe, channel, value)
    }
}