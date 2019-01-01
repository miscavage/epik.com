/**
 * @description The base url for the Epik.com API
 * @kind constant
 */
const BASE = 'https://userapi.epik.com/';

/**
 * @description The host of the Epik.com API
 * @kind constant
 */
const HOST = 'userapi.epik.com';

/**
 * @description The current version of the Epik.com API
 * @kind constant
 */
const API_VERSION = '1';

/**
 * @description The current accepted methods for Epik.com API calls
 * @kind constant
 */
const ACCEPTED_METHODS = [
    'GET',
    'POST',
];

/**
 * @description The acceptable time periods for domain registrations
 * @kind constant
 */
const PERIODS = {
    ONE_YEAR: 1,
    TWO_YEARS: 2,
    THREE_YEARS: 3,
    FOUR_YEARS: 4,
    FIVE_YEARS: 5,
    SIX_YEARS: 6,
    SEVEN_YEARS: 7,
    EIGHT_YEARS: 8,
    NINE_YEARS: 9,
    TEN_YEARS: 10,
};

//

module.exports = {
    BASE,
    HOST,
    API_VERSION,
    ACCEPTED_METHODS,
    PERIODS,
};