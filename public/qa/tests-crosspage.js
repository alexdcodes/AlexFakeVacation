var Browser = require("zombie");
    assert = require('chai').assert;

    var browser;

suite('Cross-Page tests', function(){

    setup(function(){
        browser = new Browser();
});
    test('registering a group rate from the hood river tour page hood river tour page' + 'should populate the referrer field', function(done) {
    var referrer = 'http://localhost:3000/tours/hood-river';
    browser.vist(referrer, function(){
        browser.clickLink('requestGroupRate', function(){
        assert(browser.field('referrer').value
            === referrer);
        done();
    });
    });
});
