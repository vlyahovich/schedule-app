'use strict';

/* Directives */

//noinspection JSCheckFunctionSignatures
angular.module('scheduleApp.directives', []).
    directive('appVersion', ['version', function (version) {
      return function (scope, element) {
        element.text(version);
      };
    }]).
    directive('ngIf', [function () {
      return {
        transclude: 'element',
        priority  : 1000,
        terminal  : true,
        restrict  : 'A',
        compile   : function (element, attr, transclude) {
          return function (scope, element, attr) {

            var childElement;
            var childScope;

            scope.$watch(attr['ngIf'], function (newValue) {
              if (childElement) {
                childElement.remove();
                childElement = undefined;
              }
              if (childScope) {
                childScope.$destroy();
                childScope = undefined;
              }

              if (newValue) {
                childScope = scope.$new();
                transclude(childScope, function (clone) {
                  childElement = clone;
                  element.after(clone);
                });
              }
            });
          };
        }
      };
    }]).
/**
 * Component directives
 */
    directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
      var openElement = null,
          closeMenu = angular.noop;

      return {
        restrict: 'C',
        link    : function (scope, element) {
          scope.$watch('$location.path', function () {
            closeMenu();
          });
          /*scope.$watch('User.isAuthenticated()', function () {
           closeMenu();
           });*/
          element.bind('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var elementWasOpen = (element === openElement);
            if (!!openElement) {
              closeMenu();
            }
            if (!elementWasOpen) {
              element.addClass('open');
              openElement = element;
              closeMenu = function (event) {
                if (event) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                $document.unbind('click', closeMenu);
                element.removeClass('open');
                closeMenu = angular.noop;
                openElement = null;
              };
              $document.bind('click', closeMenu);
            }
          });
          element.children('div').bind('click', function (event) {
            event.stopPropagation();
          });
        }
      }
    }]).
    directive('spinOn', ['Spinner', function (Spinner) {
      return {
        restrict: 'A',
        link    : function (scope, element, attributes) {
          var events = scope.$eval(attributes.spinOn);

          scope.$on(events.on, function () {
            Spinner.start(element[0]);
          });
          scope.$on(events.off, function () {
            Spinner.stop();
          });
        }
      }
    }]).
    directive('animateToast', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        link    : function ($scope, element, attributes) {
          var options = {
            start: 20,
            end  : 9750
          };

          if (attributes.animate) {
            options = $scope.$eval(attributes.animate);
            if (angular.isString(options)) {
              options = {'class': options};
            }
          }
          options = angular.extend({'class': 'animate'}, options);

          element.addClass(options['class']);
          $timeout(function () {
            element.removeClass(options['class']);
          }, options.start, false);
          element.click(function () {
            element.addClass(options['class']);
          });
          $timeout(function () {
            element.addClass(options['class']);
          }, options.end, false);
        }
      };
    }]).
    directive('toast', ['$compile', '$timeout', function ($compile, $timeout) {
      return {
        restrict: 'A',
        link    : function (scope) {
          scope.toasts = [];

          scope.$on('toast', function (event, message) {
            scope.toasts.push({
              message: message
            });
            $timeout(function () {
              scope.toasts.shift();
            }, 10000);
          });
        },
        template: '<div class="toast" ng-repeat="toast in toasts" animate-toast>{{toast.message}}</div>'
      }
    }]).
    directive('toggle', [function () {
      return {
        restrict: 'C',
        link    : function (scope, element, attributes) {
          element.bind('click', function () {
            element.toggleClass('toggle-off');
          });
        }
      }
    }]).
    directive('tabs',function () {
      return {
        restrict  : 'A',
        transclude: true,
        scope     : {},
        controller: function ($scope, $element) {
          var panes = $scope.panes = [];

          $scope.select = function (pane) {
            angular.forEach(panes, function (pane) {
              pane.selected = false;
            });
            pane.selected = true;
            $scope.$parent.$broadcast('pane:selected', pane.category);
          };

          this.addPane = function (pane) {
            if (panes.length == 0) {
              $scope.select(pane);
            }
            panes.push(pane);
          }
        },
        template  :
            '<div class="tabs">' +
              '<ul class="nav nav-tabs">' +
                '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}" ng-click="select(pane)">' +
                  '<span class="pane-icon lsf">{{pane.icon}}</span><span class="pane-title">{{pane.name}}</span>' +
                '</li>' +
              '</ul>' +
              '<div class="tab-content" ng-transclude></div>' +
            '</div>',
        replace   : true
      };
    }).
    directive('pane',function () {
      return {
        require   : '^tabs',
        restrict  : 'A',
        transclude: true,
        scope     : { name: '@', icon: '@', category: '@' },
        link      : function (scope, element, attrs, tabsController) {
          tabsController.addPane(scope);
        },
        template  : '<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>',
        replace   : true
      };
    }).
/**
 * Validation directives
 */
    directive('ngvRequired',function () {
      return {
        require: 'ngModel',
        link   : function (scope, element, attributes, controller) {
          function validate(viewValue) {
            if (viewValue) {
              controller.$setValidity('required', true);
              return viewValue;
            } else {
              controller.$setValidity('required', false);
              return undefined;
            }
          }

          controller.$parsers.unshift(function (viewValue) {
            return validate(viewValue);
          });
          controller.$formatters.unshift(function (viewValue) {
            return validate(viewValue);
          });
        }
      };
    }).
    directive('ngvInteger', function () {
      return {
        require: 'ngModel',
        link   : function (scope, element, attributes, controller) {
          controller.$parsers.unshift(function (viewValue) {
            if (/^\-?\d*$/.test(viewValue)) {
              controller.$setValidity('integer', true);
              return viewValue;
            } else {
              controller.$setValidity('integer', false);
              return undefined;
            }
          });
        }
      };
    });
