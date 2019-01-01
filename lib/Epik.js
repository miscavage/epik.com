'use strict';

//Modules
const https = require('https');
const qs = require('qs');

//Helpers
const Utils = require('./helpers/utilities');
const Constants = require('./helpers/constants');
const ReturnObject = require('./helpers/ReturnObject');

/**
 * @class Epik
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @description A Node.js wrapper for the Epik.com domain registration API. For more information, visit: https://registrar.epik.com/docs/epik-API.pdf
 * @example
 *     const Epik = require('epik.com');
 *     const EpikClient = new Epik();
 * @public
 * @version 0.0.2
 * @license MIT
 * @kind class
 */
class Epik {

    /**
     * @description Epik constructor. Sets up initial variables for the class.
     * @constructor
     * @param {string} signature - Epik.com signature
     * @returns Epik
     */
    constructor(signature) {
        //Check if parameters are valid
        if (!Utils.isString(signature) || Utils.isStringEmpty(signature)) Utils._WARN_('Invalid parameter', 'signature must be of type: String and greater than 0 characters.');

        //Set incoming params
        this._signature = signature;

        //Return Epik
        return this;
    };

    /**
     * @description Get signature
     * @returns {string} signature - Epik.com signature
     */
    get signature() {
        return this._signature;
    };

    /**
     * @description Set signature
     * @param {string} signature - Epik.com signature
     */
    set signature(signature) {
        //Check if parameters are valid
        if (!Utils.isString(signature) || Utils.isStringEmpty(signature)) Utils._WARN_('Invalid parameter', 'signature must be of type: String and greater than 0 characters.');

        //Set
        this._signature = signature;
    };

    /**
     * @description Set signature
     * @param {string} signature - Epik.com signature
     * @returns Epik
     */
    setSignature(signature) {
        //Check if parameters are valid
        if (!Utils.isString(signature) || Utils.isStringEmpty(signature)) Utils._WARN_('Invalid parameter', 'signature must be of type: String and greater than 0 characters.');

        //Set
        this._signature = signature;

        //Return Epik
        return this;
    };

    /**
     * @description Calls related to domains
     */
    get domains() {
        return {
            /**
             * @description Lock method is called to update domain statuses and change them from 'Ok' to 'ClientUpdateProhibited', 'ClientTransferProhibited', 'ClientDeleteProhibited'.
             * @function domains.lock()
             * @async
             * @param {string|array} domains - A single domain or array of domains
             * @returns {ReturnObject}
             */
            lock: async (domains) => {
                const requestMethod = 'POST';
                let method = 'lock';

                //Check if domains is a string, if so, convert to array
                if (Utils.isString(domains)) {
                    domains = [domains];
                }

                //Check if domains is an array, if not, warn
                if (!Utils.isArray(domains)) Utils._WARN_('Invalid parameter', 'domains must be of type: Array or String.');

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, { domains });

                //Return request
                return this._request(options);
            },

            /**
             * @description The Unlock method sets domain status to 'Ok'.
             * @function domains.unlock()
             * @async
             * @param {string|array} domains - A single domain or array of domains
             * @returns {ReturnObject}
             */
            unlock: async (domains) => {
                const requestMethod = 'POST';
                let method = 'unlock';

                //Check if domains is a string, if so, convert to array
                if (Utils.isString(domains)) {
                    domains = [domains];
                }

                //Check if domains is an array, if not, warn
                if (!Utils.isArray(domains)) Utils._WARN_('Invalid parameter', 'domains must be of type: Array or String.');

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, { domains });

                //Return request
                return this._request(options);
            },

            /**
             * @description This call sets desired authorization code for a domain.
             *              As per official documentaion, there is a code format you need to follow for this operation to succeed:
             *              8 (eight) alphanumeric characters, having at least 1 (one) numeric, 1 (one) alphabetic, and 1 (one) special character.
             * @function domains.setAuthCode()
             * @async
             * @param {string} domain - A single domain
             * @param {string} code - The auth code
             * @returns {ReturnObject}
             */
            setAuthCode: async (domain, code) => {
                const requestMethod = 'POST';
                let method = 'setauthcode';

                //Check if domain is a string, if not, warn
                if (!Utils.isString(domain)) Utils._WARN_('Invalid parameter', 'domain must be of type: String.');

                //Check if code is a string, if not, warn
                if (!Utils.isString(code)) Utils._WARN_('Invalid parameter', 'code must be of type: String.');

                //Build params
                let params = {};
                params.domains = {};
                params.domains[domain] = code;

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description This call sets name servers for a single domain
             * @function domains.setNameServers()
             * @async
             * @param {string} domain - A single domain
             * @param {string|array} nameservers - A single nameserver or an array of nameservers
             * @returns {ReturnObject}
             */
            setNameServers: async(domain, nameservers) => {
                const requestMethod = 'POST';
                let method = 'setnameservers';

                //Check if domain is a string, if not, warn
                if (!Utils.isString(domain)) Utils._WARN_('Invalid parameter', 'domain must be of type: String.');

                //Check if nameservers is a string, if so, convert to array
                if (Utils.isString(nameservers)) {
                    nameservers = [nameservers];
                }

                //Check if nameservers is an array, if not, warn
                if (!Utils.isArray(nameservers)) Utils._WARN_('Invalid parameter', 'nameservers must be of type: Array or String.');

                //Build params
                let params = {};
                params.domains = {};
                params.domains[domain] = nameservers;

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description This call updates whois information.
             *              Each param has a prefix which tells what type of contact needs to be updated.
             *              You can update “Administrative” – A, “Billing” – B and “Technical” – T details
             * @function domains.setWhoIsInfo()
             * @async
             * @param {string} domain - A single domain
             * @param {object} params - Parameters to pass through to the request
             * @param {boolean|number} params.PRIVATE - {0|1}
             * @param {string} params.AORGANIZATION - “Administrative” (A) - Organization name
             * @param {string} params.ANAME - “Administrative” (A) - Name
             * @param {string} params.AEMAIL - “Administrative” (A) - Email
             * @param {string} params.AADDRESS - “Administrative” (A) - Address
             * @param {string} params.ACITY - “Administrative” (A) - City
             * @param {string} params.ASTATE - “Administrative” (A) - State
             * @param {string|number} params.AZIP - “Administrative” (A) - Zip code
             * @param {string} params.ACOUNTRY - “Administrative” (A) - Country
             * @param {string} params.ACOUNTRYCODE - “Administrative” (A) - Coutry code
             * @param {string|number} params.APHONE - "“Administrative” (A) - Phone e.g. + 1.2120001111
             * @param {string} params.TORGANIZATION - “Technical” (T) - Organization name
             * @param {string} params.TNAME - “Technical” (T) - Name
             * @param {string} params.TEMAIL - “Technical” (T) - Email
             * @param {string} params.TADDRESS - “Technical” (T) - Address
             * @param {string} params.TCITY - “Technical” (T) - City
             * @param {string} params.TSTATE - “Technical” (T) - State
             * @param {string|number} params.TZIP - “Technical” (T) - Zip code
             * @param {string} params.TCOUNTRY - “Technical” (T) - Country
             * @param {string} params.TCOUNTRYCODE - “Technical” (T) - Country code
             * @param {string|number} params.TPHONE - “Technical” (T) - Phone e.g. + 1.2120001111
             * @param {string} params.BORGANIZATION - Billing” (B) - Organization name
             * @param {string} params.BNAME - Billing” (B) - Name
             * @param {string} params.BEMAIL - Billing” (B) - Email
             * @param {string} params.BADDRESS - Billing” (B) - Address
             * @param {string} params.BCITY - Billing” (B) - City
             * @param {string} params.BSTATE - Billing” (B) - State
             * @param {string|number} params.BZIP - Billing” (B) - Zip code
             * @param {string} params.BCOUNTRY - Billing” (B) - Country
             * @param {string} params.BCOUNTRYCODE - Billing” (B) - Country code
             * @param {string|number} params.BPHONE - Billing” (B) - Phone e.g. + 1.2120001111
             * @returns {ReturnObject}
            */
            setWhoIsInfo: async(domain, params) => {
                const requestMethod = 'POST';
                let method = 'setwhoisinfo';

                //Build params
                let data = {};
                data.domains = {};
                data.domains[domain] = params;

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, data);

                //Return request
                return this._request(options);
            },

            /**
             * @description This function is used in order to check if a domain is available for registration.
             * @function domains.checkAvailability()
             * @async
             * @param {string|array} domains - A single domain or array of domains
             * @returns {ReturnObject}
             */
            checkAvailability: async(domains) => {
                const requestMethod = 'POST';
                let method = 'check';

                //Check if domains is a string, if so, convert to array
                if (Utils.isString(domains)) {
                    domains = [domains];
                }

                //Check if domains is an array, if not, warn
                if (!Utils.isArray(domains)) Utils._WARN_('Invalid parameter', 'domains must be of type: Array or String.');

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, { domains });

                //Return request
                return this._request(options);
            },

            /**
             * @description Register a new domain with a given time period.
             * @function domains.register()
             * @async
             * @param {string} domain - A single domain
             * @param {string|number} period - One of Epik.PERIODS
             * @returns {ReturnObject}
             */
            register: async(domain, period) => {
                const requestMethod = 'POST';
                let method = 'create';

                //Check if domain is a string, if not, warn
                if (!Utils.isString(domain)) Utils._WARN_('Invalid parameter', 'domain must be of type: String.');

                //Check if code is a string or number, if not, warn
                if (!Utils.isString(period) && !Utils.isNumber(period)) Utils._WARN_('Invalid parameter', 'period must be of type: String or Number.');

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, {
                    domains: domain,
                    period,
                });

                //Return request
                return this._request(options);
            },

            /**
             * @description Set up new host records. By using this function, all existing host records will be removed.
             * @function domains.setHostRecords()
             * @async
             * @param {string} domain - A single domain
             * @param {array} hostRecordGroups - Array of host record groups
             * @param {object} hostRecordGroups[n] - Each item of a hostRecordGroup
             * @param {string} hostRecordGroups[n].HOST - Host
             * @param {string} hostRecordGroups[n].TYPE - A set of predefined values (host record types). For example: A, MX, CNAME, etc
             * @param {number} hostRecordGroups[n].AUX
             * @param {string} hostRecordGroups[n].DATA - Data plays variable role for variable host record types. E.g. it is IP for A record.
             * @param {number} hostRecordGroups[n].TTL - Time to Live value
             * @returns {ReturnObject}
             */
            setHostRecords: async(domain, hostRecordGroups) => {
                const requestMethod = 'POST';
                let method = 'sethostrecords';

                //Build params
                let params = {};
                params.domains = {};
                params.domains[domain] = hostRecordGroups;

                //Build request options
                let options = this._buildRequestOptions(requestMethod, method, params);

                //Return request
                return this._request(options);
            },
        }
    };

    /**
     * @description Build options for https.request
     * @function _buildRequestOptions
     * @param {string} requestMethod - One of Constants.ACCEPTED_METHODS
     * @param {string} method - Epik.com API "method" - The operation to perform
     * @param {object} params - Data to append to path as query strings
     * @returns {object} Options for sending to request
     */
    _buildRequestOptions(requestMethod, method, params) {
        //Transform to uppercase
        requestMethod = requestMethod.toUpperCase();

        //Stringify params in proper format
        let stringified = qs.stringify(params, {
            arrayFormat: 'brackets',
            encode: true,
        });

        //Transform all to uppercase
        stringified = stringified.toUpperCase();

        //Make relative path
        let path = '/';
        path += `?METHOD=${method}`;
        path += `&SIGNATURE=${this._signature}`;
        path += `&VERSION=${Constants.API_VERSION}&`;
        path += stringified;

        //Create options
        let options = {
            path,
            method: requestMethod,
            host: Constants.HOST,
            port: 443,
        };

        //Return options
        return options;
    };

    /**
     * @description Perform https request
     * @function _request
     * @param {object} options - https.request options
     * @returns {Promise} Body of https request data results
     */
    _request(options) {
        return new Promise((resolve, reject) => {
            //Perform request
            let req = https.request(options, (res) => {
                let body = [];

                //Set body on data
                res.on('data', (chunk) => {
                    body.push(chunk);
                });

                //On end, end the Promise
                res.on('end', () => {
                    try {
                        body = Buffer.concat(body);
                        body = body.toString();

                        //Check if page is returned instead of JSON
                        if (body.startsWith('<!DOCTYPE html>')) Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');

                        //The Epik.com API returns results in XML, convert to JSON
                        body = Utils.XML2JSON(body);
                    }
                    catch (error) {
                        reject(error);
                    };

                    //Create return object
                    resolve(
                        ReturnObject(
                            !(res.statusCode < 200 || res.statusCode >= 300),
                            res.statusMessage,
                            res.statusCode,
                            body,
                        )
                    );
                });
            });

            //On error, reject the Promise
            req.on('error', (error) => reject(error));

            //End request
            req.end();
        });
    };
};

//Set Constants
Epik.API_VERSION = Constants.API_VERSION;
Epik.PERIODS = Constants.PERIODS;

//

module.exports = exports = Epik;