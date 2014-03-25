'use strict';

angular.module('gla')
/**
 * The SlideShows factory handles saving and loading slideShows
 * from local storage, and also lets us save and load the
 * last active slideShow index.
 */
.factory('SlideShows', function() {
  return {
    all: function() {
      var slideShowString = window.localStorage['slideShows'];
      if(slideShowString) {
        return angular.fromJson(slideShowString);
      }
      return [];
    },
    save: function(slideShows) {
      window.localStorage['slideShows'] = angular.toJson(slideShows);
    },
    newSlideShow: function(slideShowTitle) {
      // Add a new slideShow
      return {
        title: slideShowTitle,
        slides: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveSlideShow']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveSlideShow'] = index;
    }
  }
});
