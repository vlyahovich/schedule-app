'use strict';

/**
 * Header controller
 */
App.controller('HeaderController',
    function ($scope, User, $location, strings) {
      $scope.User = User;
      $scope.strings = strings;

      $scope.login = function () {
        $scope.User.login(this.name, this.password).then(function () {
          // Login callback
        });
      };
      $scope.logout = function () {
        $scope.User.logout().then(function () {
          // Logout callback
        });
        $location.path('/home');
      };
      $scope.goSettings = function () {
        $location.path('/settings');
      };
      $scope.goSchedule = function () {
        $location.path('/schedule');
      };

      $scope.$on('$routeChangeStart', function () {
        $scope.url = $location.$$url;
      });
      $scope.goHome = function () {
        $location.path('/home');
      };
    });

/**
 * Start page controller
 */
App.controller('StartPageController',
    function ($scope, $rootScope, User, ScheduleList, $location, strings) {
      $scope.strings = strings;

      $scope.look = function () {
        User.setLook({
          course  : this.course,
          group   : this.group,
          subGroup: this.subGroup
        });
        $scope.$broadcast('look:request-start');
        ScheduleList.lookup(User.getLook()).then(function (data) {
          $scope.$broadcast('look:request-end');
          $location.path('/look');
        }, function () {
          $rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('look:request-end');
        });
      }
    });

/**
 * Schedule view controller
 */
App.controller('LookPageController',
    function ($scope, User, ScheduleList, $location, strings) {
      if (!User.getLook()) {
        $location.path('/');
      } else {
        var scheduleList = null,
            list = ScheduleList.get();

        if (angular.isArray(list) && list.length > 0) {
          scheduleList = list;
          $scope.currentDay = list[0].dayTitle;
          $scope.currentList = list[0].disciplines;
        }

        $scope.strings = strings;

        // Navigation control
        $scope.navIndex = 0;
        $scope.nextDay = function () {
          if (scheduleList) {
            if ($scope.navIndex + 1 < scheduleList.length) {
              $scope.navIndex++;
            } else {
              $scope.navIndex = 0;
            }
          }
        };
        $scope.previousDay = function () {
          if (scheduleList) {
            if ($scope.navIndex - 1 >= 0) {
              $scope.navIndex--;
            } else {
              $scope.navIndex = scheduleList.length - 1;
            }
          }
        };
        $scope.$watch('navIndex', function () {
          if (scheduleList && scheduleList.length > 0) {
            $scope.currentDay = scheduleList[$scope.navIndex].dayTitle;
            $scope.currentList = scheduleList[$scope.navIndex].disciplines;
          }
        }, true);

        // Search control
        $scope.search = function () {
          var query = this.searchQuery;

          if ((query || angular.isNumber(query)) && scheduleList) {
            $scope.currentList = _.filter(scheduleList[$scope.navIndex].disciplines, function (subject) {
              return subject.name.search(new RegExp(query, 'gi')) != -1 ||
                  subject.lecturer.surname.search(new RegExp(query, 'gi')) != -1;
            });
          } else if (scheduleList) {
            $scope.currentList = scheduleList[$scope.navIndex].disciplines;
          }
        };
      }
    });

/**
 * Settings page controller
 */
App.controller('SettingsPageController',
    function ($scope) {

    });