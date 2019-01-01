//Modules
const chai = require('chai');
var should = chai.should();

//Helpers
const Utils = require('../../../lib/helpers/utilities');

const VAR_TYPES = {
    STRING: 'String',
    STRING_EMPTY: '',
    NULL: null,
    UNDEFINED: undefined,
    NUMBER: 250,
    ARRAY: ['a', 'basic', 'array'],
    OBJECT: { 'a': 'b', 'c': 'd' },
    SVG: '<svg><response></response></svg>',
};

describe('Utilities', function () {
    describe('isString', function () {
        it('should return true if value is string', function (done) {
            Utils.isString(VAR_TYPES.STRING_EMPTY).should.be.true;
            Utils.isString(VAR_TYPES.STRING).should.be.true;

            done();
        });

        it('should return false if value is null', function (done) {
            Utils.isString(VAR_TYPES.NULL).should.be.false;

            done();
        });

        it('should return false if value is undefined', function (done) {
            Utils.isString(VAR_TYPES.UNDEFINED).should.be.false;

            done();
        });

        it('should return false if value is number', function (done) {
            Utils.isString(VAR_TYPES.NUMBER).should.be.false;

            done();
        });

        it('should return false if value is array', function (done) {
            Utils.isString(VAR_TYPES.ARRAY).should.be.false;

            done();
        });

        it('should return false if value is object', function (done) {
            Utils.isString(VAR_TYPES.OBJECT).should.be.false;

            done();
        });
    });

    describe('isStringEmpty', function () {
        it('should return false if value is string with value "string"', function (done) {
            Utils.isStringEmpty(VAR_TYPES.STRING).should.be.false;

            done();
        });

        it('should return true if value is string with value ""', function (done) {
            Utils.isStringEmpty(VAR_TYPES.STRING_EMPTY).should.be.true;

            done();
        });
    });

    describe('isObject', function () {
        it('should return false if value is string', function (done) {
            Utils.isObject(VAR_TYPES.STRING_EMPTY).should.be.false;
            Utils.isObject(VAR_TYPES.STRING).should.be.false;

            done();
        });

        it('should return false if value is null', function (done) {
            Utils.isObject(VAR_TYPES.NULL).should.be.false;

            done();
        });

        it('should return false if value is undefined', function (done) {
            Utils.isObject(VAR_TYPES.UNDEFINED).should.be.false;

            done();
        });

        it('should return false if value is number', function (done) {
            Utils.isObject(VAR_TYPES.NUMBER).should.be.false;

            done();
        });

        it('should return false if value is array', function (done) {
            Utils.isObject(VAR_TYPES.ARRAY).should.be.false;

            done();
        });

        it('should return true if value is object', function (done) {
            Utils.isObject(VAR_TYPES.OBJECT).should.be.true;

            done();
        });
    });

    describe('isNumber', function () {
        it('should return false if value is string', function (done) {
            Utils.isNumber(VAR_TYPES.STRING_EMPTY).should.be.false;
            Utils.isNumber(VAR_TYPES.STRING).should.be.false;

            done();
        });

        it('should return false if value is null', function (done) {
            Utils.isNumber(VAR_TYPES.NULL).should.be.false;

            done();
        });

        it('should return false if value is undefined', function (done) {
            Utils.isNumber(VAR_TYPES.UNDEFINED).should.be.false;

            done();
        });

        it('should return true if value is number', function (done) {
            Utils.isNumber(VAR_TYPES.NUMBER).should.be.true;

            done();
        });

        it('should return false if value is array', function (done) {
            Utils.isNumber(VAR_TYPES.ARRAY).should.be.false;

            done();
        });

        it('should return false if value is object', function (done) {
            Utils.isNumber(VAR_TYPES.OBJECT).should.be.false;

            done();
        });
    });

    describe('isArray', function () {
        it('should return false if value is string', function (done) {
            Utils.isArray(VAR_TYPES.STRING_EMPTY).should.be.false;
            Utils.isArray(VAR_TYPES.STRING).should.be.false;

            done();
        });

        it('should return false if value is null', function (done) {
            Utils.isArray(VAR_TYPES.NULL).should.be.false;

            done();
        });

        it('should return false if value is undefined', function (done) {
            Utils.isArray(VAR_TYPES.UNDEFINED).should.be.false;

            done();
        });

        it('should return false if value is number', function (done) {
            Utils.isArray(VAR_TYPES.NUMBER).should.be.false;

            done();
        });

        it('should return true if value is array', function (done) {
            Utils.isArray(VAR_TYPES.ARRAY).should.be.true;

            done();
        });

        it('should return false if value is object', function (done) {
            Utils.isArray(VAR_TYPES.OBJECT).should.be.false;

            done();
        });
    });

    describe('_WARN_', function () {
        it('should return true regardless', function (done) {
            Utils._WARN_('Title', 'Some detail...').should.be.true;

            done();
        });
    });

    describe('XML2JSON', function () {
        it('should return object regardless', function (done) {
            Utils.isObject(Utils.XML2JSON(VAR_TYPES.STRING)).should.be.true;
            Utils.isObject(Utils.XML2JSON(VAR_TYPES.STRING_EMPTY)).should.be.true;
            Utils.isObject(Utils.XML2JSON(VAR_TYPES.NULL)).should.be.true;
            Utils.isObject(Utils.XML2JSON(VAR_TYPES.UNDEFINED)).should.be.true;
            Utils.isObject(Utils.XML2JSON(VAR_TYPES.ARRAY)).should.be.true;
            Utils.isObject(Utils.XML2JSON(VAR_TYPES.OBJECT)).should.be.true;
            Utils.isObject(Utils.XML2JSON(VAR_TYPES.SVG)).should.be.true;

            done();
        });
    });
});