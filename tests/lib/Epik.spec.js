//Modules
const fs = require('fs');
const mocha = require('mocha');
const chai = require('chai');
var should = chai.should();

//Helpers
const Epik = require('../../lib/Epik');

const shared = require('../shared');

//Signature required for all requests
const SIGNATURE = '0000-0000-0000-0000';

describe('Epik', function () {
    beforeEach(function (done) {
        this.EpikClient = new Epik(SIGNATURE);

        done();
    });

    describe('domains', function () {

        describe('lock', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.lock('giraffecookie.com').then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('unlock', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.unlock('giraffecookie.com').then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('setAuthCode', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.setAuthCode('giraffecookie.com', '1234!ABCD').then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('setNameServers', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.setNameServers('giraffecookie.com', ['ns.giraffecookie.com', 'ns1.giraffecookie.com']).then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('setWhoIsInfo', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.setWhoIsInfo('giraffecookie.com', {
                    PRIVATE: 0,
                    AORGANIZATION: 'Wood Co.',
                }).then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('checkAvailability', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.checkAvailability('giraffecookie.com').then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('register', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.register('giraffecookie.com', Epik.PERIODS.ONE_YEAR).then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('setHostRecords', function () {
            beforeEach(function (done) {
                this.EpikClient.domains.setHostRecords('giraffecookie.com', [
                    {
                        HOST: 'giraffecookie.com',
                        TYPE: 'CNAME',
                        DATA: 'giraffecookie.com',
                        TTL: '300'
                    },
                ]).then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });
});