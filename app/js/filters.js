'use strict';

/* Filters */

angular.module('scheduleApp.filters', []).
    filter('timelize', function () {
      return function (input) {
        return input.replace('.', '<small>.') + '</small>';
      }
    }).
    filter('highlight', function () {
      return function (text, search, caseSensitive) {
        if (search || angular.isNumber(search)) {
          text = text.toString();
          search = search.toString();
          if (caseSensitive) {
            return text.split(search).join('<span class="ng-match">' + search + '</span>');
          } else {
            return text.replace(new RegExp(search, 'gi'), '<span class="ng-match">$&</span>');
          }
        } else {
          return text;
        }
      };
    });
