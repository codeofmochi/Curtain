/**
 * Handles live devices and their I/Os
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const DMXEmitter = require('../controllers/DMXEmitter')

/**
 * Creates a new device from a descriptor
 */
function Device(deviceDescriptor, name, universe, baseChannel) {
    var _name
    if (name) _name = name
    else _name = "Device"

    var _baseChannel
    if (baseChannel) _baseChannel = baseChannel
    else _baseChannel = 1

    var _universe
    if (universe) _universe = universe
    else _universe = 0

    this.name = _name
    this.model = deviceDescriptor.model
    this.universe = universe
    this.channels = deviceDescriptor.channels.map((channel, index) => {
        const _num = _baseChannel + index
        var _currentValue = 0

        return {
            name: channel,
            index: _num,
            currentValue: () => {
                return _currentValue
            },
            update: (val) => {
                _currentValue = val
                DMXEmitter.send(universe, _num, _currentValue)
            }
        }
    })
}

/**
 * List of all live devices
 */
const allDevices = []

module.exports = {
    /**
     * List of all live devices
     */
    allDevices: allDevices,
    /**
     * Creates a device, registers it, and returns it
     */
    makeDevice: (deviceDescriptor, name, universe, baseChannel) => {
        const dev = new Device(deviceDescriptor, name, universe, baseChannel)
        allDevices.push(dev)
        return dev
    },
    /**
     * Removes a device
     */
    removeDevice: (device) => {
        const index = allDevices.indexOf(device)
        allDevices.splice(index, 1)
    }
}