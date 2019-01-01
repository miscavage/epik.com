//Modules
const parser = require('xml2json');


/**
 * @description Internal helper to check if parameter is a string
 * @function isString
 * @param {*} str
 * @returns {boolean}
 */
const isString = (str) => {
    return (typeof str === 'string' || str instanceof String);
};

/**
 * @description Internal helper to check if string is empty
 * @function isStringEmpty
 * @param {*} str
 * @returns {boolean}
 */
const isStringEmpty = (str) => {
    if (!isString(str)) return false;
    return (str.length == 0);
};

/**
 * @description Internal helper to check if parameter is an object
 * @function isObject
 * @param {*} obj
 * @returns {boolean}
 */
const isObject = (obj) => {
    if (isArray(obj)) return false;
    return (obj !== null && typeof obj === 'object');
};

/**
 * @description Internal helper to check if parameter is a number
 * @function isNumber
 * @param {*} num
 * @returns {boolean}
 */
const isNumber = (num) => {
    return (!isNaN(num) && !isNaN(parseInt(num)));
};

/**
 * @description Internal helper to check if parameter is an array
 * @function isArray
 * @param {*} arr
 * @returns {boolean}
 */
const isArray = (arr) => {
    return Array.isArray(arr);
};

/**
 * @description Internal helper to emit a warning to the console
 * @function _WARN_
 * @param {string} title
 * @param {string} detail
 * @returns {boolean}
 */
const _WARN_ = (title='', detail='') => {
    process.emitWarning(title, {
        detail,
        code: 'Epik',
    });

    return true;
};

/**
 * @description Internal helper to convert XML api response to JSON 
 * @function XML2JSON
 * @param {string} xml
 * @returns {Object} json
 */
const XML2JSON = (xml='') => {
    let json = {};

    //Attempt to parse
    try {
        json = parser.toJson(xml, {
            coerce: true,
        });

        json = JSON.parse(json);
    }
    catch(e) {
        //Set back to default
        json = {};
    };

    //If first key is "response" and is of type: Object, set that to default return object
    if (isObject(json['response']) && json['response'] !== undefined) {
        json = json.response;
    }

    return json;
};

//

module.exports = {
    isString,
    isStringEmpty,
    isObject,
    isNumber,
    isArray,
    _WARN_,
    XML2JSON,
};