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
    directive('animateView', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        link    : function ($scope, element) {
          $timeout(function () {
            element.addClass('main-animation-enter-start');
          }, 20, false);
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
        controller: function ($scope) {
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
        template  : '<div class="tabs">' +
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
    directive('ngvInteger',function () {
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
    }).
/**
 * Scheduler directives
 */
    directive('schedulerHandle',function ($compile, gridSettings) {
      return {
        restrict: 'A',
        link    : function (scope, element, attributes) {
          element.parent().bind('click', function (event) {
            var tpl = '<div class="draggable-cell" ' +
                'scheduler-draggable="{x:' + (event.offsetX - element.position().left) +
                ', y:' + event.offsetY + '}">' +
                '</div>';

            element.append($compile(tpl)(scope));
          });
          scope.$on('schedule:update-range-back', function ($scope, step) {
            element.css({
              left: element.position().left + gridSettings.gridSize.width * step
            });
          });
          scope.$on('schedule:update-range-forward', function ($scope, step) {
            element.css({
              left: element.position().left - gridSettings.gridSize.width * step
            });
          });

          scope.draggables = [];
          scope.pushDraggable = function (element) {
            scope.draggables.push(element);
          };
          scope.removeDraggable = function (element) {
            // TODO: add possibility to remove
          };
          scope.isSafeDrop = function (element, room, hour, hourEnd) {
            var candidates = _.filter(scope.draggables, function (draggable) {
              return draggable.room == room && draggable !== element;
            });

            if (candidates.length) {
              candidates = _.filter(candidates, function (candidate) {
                var hourNumber = parseFloat(hour),
                    hourNumberEnd = parseFloat(hourEnd),
                    candidateHourNumber = parseFloat(candidate.hour),
                    candidateHourEndNumber = parseFloat(candidate.hourEnd);

                if (hourNumber < candidateHourNumber && hourNumberEnd <= candidateHourNumber) {
                  return false;
                } else {
                  return !(hourNumber >= candidateHourEndNumber);
                }
              });

              if (candidates.length) {
                return false;
              }
            }
            return true;
          };
        }
      };
    }).
    directive('schedulerDraggable',function ($compile, $timeout, gridSettings) {
      return {
        restrict: 'A',
        link    : function (scope, element, attributes) {
          var position = scope.$eval(attributes.schedulerDraggable),
              top = gridSettings.gridSize.height * Math.floor(position.y / gridSettings.gridSize.height),
              left = gridSettings.gridSize.width * Math.floor(position.x / gridSettings.gridSize.width),
              room = scope.getRoomByPosition(left).room,
              hour = scope.getHourByPosition(top).hour,
              hourEnd = scope.getHourByPosition(top + gridSettings.gridSize.height).hour,
              cells = 1,
              dragging = false,
              resizing = false;

          element.css({
            position: 'absolute',
            top     : top,
            left    : left
          });
          element.room = room;
          element.hour = hour;
          element.hourEnd = hourEnd;
          element.cells = cells;
          element.bind('click', function (event) {
            event.stopPropagation();
          });
          element.bind('mouseup', function (event) {
            if (!dragging && !resizing) {
              $('.draggable-cell-popup').removeClass('show');
              element.find('.draggable-cell-popup').addClass('show');
            }
            dragging = false;
            resizing = false;
          });
          element.draggable({
            containment: gridSettings.containment,
            grid       : [gridSettings.gridSize.width, gridSettings.gridSize.height],
            start      : function () {
              dragging = true;
            },
            stop       : function (event, ui) {
              var cRoom = scope.getRoomByPosition(ui.position.left).room,
                  cHour = scope.getHourByPosition(ui.position.top).hour,
                  cHourEnd = scope.getHourByPosition(ui.position.top + (gridSettings.gridSize.height * cells)).hour;

              if (scope.isSafeDrop(element, cRoom, cHour, cHourEnd)) {
                room = cRoom;
                hour = cHour;
                hourEnd = cHourEnd;
                element.room = cRoom;
                element.hour = cHour;
                element.hourEnd = cHourEnd;
                left = ui.position.left;
                top = ui.position.top;
              } else {
                ui.helper.css({
                  left: left,
                  top : top
                });
              }
            }
          }).resizable({
                containment: gridSettings.containment,
                grid       : [gridSettings.gridSize.width, gridSettings.gridSize.height],
                handles    : gridSettings.handles,
                start      : function () {
                  resizing = true;
                },
                stop       : function (event, ui) {
                  var cCells = Math.floor(ui.element.height() / gridSettings.gridSize.height),
                      cHourEnd = scope.getHourByPosition(ui.position.top + (gridSettings.gridSize.height * cCells)).hour;

                  if (scope.isSafeDrop(element, room, hour, cHourEnd)) {
                    cells = cCells;
                    hourEnd = cHourEnd;
                    element.cells = cCells;
                    element.hourEnd = cHourEnd;
                  } else {
                    ui.helper.css({
                      height: gridSettings.gridSize.height * cells
                    });
                  }
                }
              });

          var pTpl = '<div class="draggable-cell-popup" scheduler-draggable-popup></div>';
          $('.draggable-cell-popup').removeClass('show');
          element.append($compile(pTpl)(scope));
          $timeout(function () {
            element.find('.draggable-cell-popup').addClass('show');
          }, 20);

          scope.pushDraggable(element);
        }
      };
    }).
    directive('schedulerDraggablePopup', function () {
      return {
        restrict: 'A',
        link    : function (scope, element, attributes) {
          element.find('.close').click(function () {
            element.removeClass('show');
          });
          element.bind('mousedown', function (event) {
            event.stopPropagation();
          });
        },
        templateUrl: 'partials/dragPopup.html'
      };
    });