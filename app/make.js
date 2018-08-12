/**
 * Build chain for Curtain
 * Compiles and generates the views and their styling
 *
 * @author Alexandre CHAU <code@chau.moe>
 */

const fs = require('fs')
const path = require('path')
const sass = require('sass')
const mustache = require('mustache')

const buildPath = 'build/'

buildViews()


/**
 * Compiles and creates the HTML / CSS files for the GUI
 */
function buildViews() {
    const viewsPath = 'views/'

    fs.readdirSync(viewsPath).forEach(file => {
        const ext = path.extname(file)
        const source = fs.readFileSync(viewsPath + file, {encoding: "utf-8"})
        const view = {}

        switch (ext) {
            case '.html': {
                // Render HTML files through Mustache
                const out = mustache.render(source, view)
                fs.writeFileSync(buildPath + file, out)
                break
            }
            case '.sass': {
                // Compile SASS files to CSS
                const out = sass.renderSync({file: viewsPath + file})
                fs.writeFileSync(buildPath + path.basename(file, ext) + '.css', out.css, {encoding: "utf-8"})
                break
            }
        }
    })
}