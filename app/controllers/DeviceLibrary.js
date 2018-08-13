/**
 * Library manager, reads available devices from disk
 *
 * @author Alexandre CHAU <code@chau.moe>
 */
const fs = require('fs')

module.exports = {
    getBrands: () => {
        return fs.readdirSync('library')
    },
    getModels: (brand) => {
        return fs.readdirSync(`library/${brand}`)
    },
    getVariations: (brand, model) => {
        return fs.readdirSync(`library/${brand}/${model}`)
    },
    loadFixture: (brand, model, variation) => {
        return JSON.parse(fs.readFileSync(`library/${brand}/${model}/${variation}`, 'utf-8'))
    }
}