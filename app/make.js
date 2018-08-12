/**
 * Build chain for Curtain
 * Compiles and generates the views and their styling
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const fs = require('fs')
const path = require('path')
const sass = require('sass')

buildStyle()


/**
 * Compiles and creates the HTML / CSS files for the GUI
 */
function buildStyle() {
    // Compile SASS files to CSS
    const dir = 'views/'
    const file = dir + 'style.sass'
    const source = fs.readFileSync(file, {encoding: "utf-8"})
    const out = sass.renderSync({file: file})
    fs.writeFileSync(dir + path.basename(file, '.sass') + '.css', out.css, {encoding: "utf-8"})
}