/**
 * Velocibox Clock UI
 *
 * Site description
 *
 * Author:  Anshul Kharbanda
 * Created: 11 - 28 - 2017
 */
import $ from 'jquery'
import './resources/style/main.scss'

// Segment combinations for each number
const NUMBERS = [
    [0, 1, 2, 4, 5, 6], // ZERO
    [2, 5], // ONE
    [0, 2, 3, 4, 6], // TWO
    [0, 2, 3, 5, 6], // THREE
    [1, 2, 3, 5], // FOUR
    [0, 1, 3, 5, 6], // FIVE
    [0, 1, 3, 4, 5, 6], // SIX
    [0, 2, 5], // SEVEN
    [0, 1, 2, 3, 4, 5, 6], // EIGHT
    [0, 1, 2, 3, 5, 6] // NINE
]

// Available themes
const THEMES = [
    'grey-skyblue-theme',
    'blue-orange-theme',
    'pink-green-theme',
    'purple-yellow-theme',
    'black-red-theme',
    'tricolor-theme',
    'drexel-theme',
    'black-white-theme',
    'star-candy-theme',
    'star-pineapple-theme'
]

/**
 * Returns a random theme
 *
 * @return a random theme
 */
function randomTheme() {
    return THEMES[Math.floor(Math.random()*THEMES.length)]
}

// Extend jquery
$.fn.extend({
    /**
     * Clears the display
     *
     * @returns jQuery
     */
    clear() {
        return this.children('.segment').removeClass('active')
    },
    /**
     * Activates one segment in the display
     *
     * @param index the index of the segment to activate
     *
     * @returns jQuery
     */
    activateOne(index) {
        return this.children('.seg-'+index).addClass('active')
    },
    /**
     * Activates the set of segments in the display
     *
     * @param indeces the indeces of the segments to activate
     *
     * @returns jQuery
     */
    activate(indeces) {
        this.clear()
        indeces.map((index) => this.activateOne(index))
        return this
    },
    /**
     * Projects a number on the display
     *
     * @param num the number 0-9 to display
     *
     * @returns jQuery
     */
    number(num) {
        return this.activate(NUMBERS[num])
    },
    /**
     * Projects a number on the 2-display time-display
     *
     * @param num the number 0-99 to display
     *
     * @returns jQuery
     */
    timeDisplayNum(num) {
        this.children('.display-0').number(Math.floor(num / 10));
        this.children('.display-1').number(Math.floor(num % 10));
        return this
    },
    /**
     * Projects a time onto the clock display
     *
     * @param date the date object that holds the time
     *
     * @returns jQuery
     */
    clockDisplay(date) {
        // Get interval
        var interval
        if (date.getHours() == 0) { interval = 12; }
        else if (date.getHours() > 11) { interval = date.getHours() - 12 }
        else { interval = date.getHours() }

        // Update displays
        this.children('#hour-display').timeDisplayNum(interval)
        this.children('#minute-display').timeDisplayNum(date.getMinutes())
        this.children('#second-display').timeDisplayNum(date.getSeconds())

        // Return jQuery
        return this
    }
})

// Main function
$(() => {
    // Clock functionality
    setInterval(() => $('#clock').clockDisplay(new Date()), 1000)

    $('#theme-select').click(() => {
        // Get old theme
        var oldTheme = $('#app').attr('class')
                                .split(' ')
                                .filter((str) => str.endsWith('-theme'))
                                .join(' ')

        // Make sure we get no repeat themes
        var newTheme = oldTheme;
        while (newTheme == oldTheme) {
            newTheme = randomTheme()
        }

        // Switch themes
        $('#app').removeClass(oldTheme)
                 .addClass(newTheme)
    })

    // Randomly set theme
    $('#app').addClass(randomTheme())
})
