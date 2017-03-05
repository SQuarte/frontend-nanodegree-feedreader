"use strict"
$(function() {


    beforeEach(function() {
        jasmine.addMatchers({
            toHaveClass: function() {
                return {
                    compare: function(actual, className) {
                        return { pass: $(actual).hasClass(className) }
                    }
                }
            }
        })
    })

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('each feed has a defined URL and this URL is not empty', function() {
            function testFeedUrlIsDefined(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            };

            allFeeds.forEach(function(feed) {
                testFeedUrlIsDefined(feed)
            });
        });


        it('each feed has a defined name and this name is not empty', function() {
            function testFeedNameIsDefined(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            };

            allFeeds.forEach(function(feed) {
                testFeedNameIsDefined(feed);
            });
        });
    });

    describe('The menu', function() {
        it('hidden by default', function() {
            expect('body').toHaveClass('menu-hidden');
        });

        it('showing/hiding on click', function() {
            var menuIconItem = $('.menu-icon-link');
            menuIconItem.trigger('click');
            expect('body').not.toHaveClass('menu-hidden');
            menuIconItem.trigger('click');
            expect('body').toHaveClass('menu-hidden');

        });
    });


    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        });
        it('is loaded and completed their work', function(done) {
            expect($('.feed').length).toBeGreaterThan(0);
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        })
    });

    describe('New Feed Selecction', function() {
        var oldFeedHtml;
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeedHtml = $('.feed').html();
                loadFeed(1, function() {
                    done();
                })
            })
        });

        it('loaded and changes', function(done) {
            expect($('.feed').html()).not.toBe(oldFeedHtml);
            done();
        })
    });

}());
