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
              element.removeClass('closed');
              element.addClass('open');
              openElement = element;
              closeMenu = function (event) {
                if (event) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                $document.unbind('click', closeMenu);
                element.removeClass('open');
                setTimeout(function () {
                  element.addClass('closed');
                }, 300);
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
    directive('timepicker', [ '$timeout', function ($timeout) {
      var TIME_REGEXP = '((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)';
      return {
        restrict: 'A',
        require : '?ngModel',
        link    : function postLink(scope, element, attrs, controller) {
          if (controller) {
            element.on('changeTime.timepicker', function (ev) {
              $timeout(function () {
                controller.$setViewValue(element.val());
              });
            });
            var timeRegExp = new RegExp('^' + TIME_REGEXP + '$', ['i']);
            controller.$parsers.unshift(function (viewValue) {
              if (!viewValue || timeRegExp.test(viewValue)) {
                controller.$setValidity('time', true);
                return viewValue;
              } else {
                controller.$setValidity('time', false);
                return null;
              }
            });
          }
          element.attr('data-toggle', 'timepicker');
          element.parent().addClass('bootstrap-timepicker');
          element.timepicker({
            showMeridian: false,
            minuteStep  : 5
          });
          var timepicker = element.data('timepicker');
          var component = element.siblings('[data-toggle="timepicker"]');
          if (component.length) {
            component.on('click', $.proxy(timepicker.showWidget, timepicker));
          }
          /*element.keypress(function (event) {
           if (event.which == 13) {
           scope.$broadcast('timepicker:accept');
           }
           });*/
        }
      };
    }]).
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
          var gridIndex = scope.$eval(attributes.schedulerHandle);

          element.parent().bind('click', function (event) {
            if (gridIndex == scope.dayIndex) {
              var tpl = '<div class="draggable-cell" ' +
                  'scheduler-draggable="{x:' + (event.offsetX - element.position().left) +
                  ', y:' + event.offsetY + ', gIndex:' + gridIndex + '}">' +
                  '</div>';

              element.append($compile(tpl)(scope));
            }
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
          scope.$on('schedule:change-grid', function ($scope, index) {
            if (gridIndex != index) {
              element.hide();
              element.animate({
                opacity: 0
              });
            } else {
              element.show();
              element.animate({
                opacity: 1
              });
            }
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
              return draggable.room.number == room.number && draggable !== element
                  && element.gIndex == draggable.gIndex;
            });

            if (candidates.length) {
              candidates = _.filter(candidates, function (candidate) {
                var hourNumber = hour.toFloat(),
                    hourNumberEnd = hourEnd.toFloat(),
                    candidateHourNumber = candidate.hour.toFloat(),
                    candidateHourEndNumber = candidate.hourEnd.toFloat();

                if (element.gIndex != candidate.gIndex) {
                  return false;
                }
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
          var attrs = scope.$eval(attributes.schedulerDraggable),
              top = gridSettings.gridSize.height * Math.floor(attrs.y / gridSettings.gridSize.height),
              left = gridSettings.gridSize.width * Math.floor(attrs.x / gridSettings.gridSize.width),
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
          element.append('<div class="cell-name">' + (attrs.label ? attrs.label : '') + '</div>');
          if (attrs.editedId) {
            element.editedId = attrs.editedId;
          }
          if (attrs.studyId) {
            element.studyId = attrs.studyId;
          }
          element.gIndex = attrs.gIndex;
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
              $('.draggable-cell').removeClass('active');
              element.addClass('active');
              scope.current = {};
              scope.currentStudyId = element.studyId;
              scope.current.element = element;
              scope.current.disciplineTimeId = element.hour.id;
              scope.current.classroomId = element.room.id;
              scope.current.dayOfWeek = scope.dayIndex;
              scope.current.week = 0;
              scope.$apply();
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

                if (element.editedId) {
                  scope.current = {};
                  scope.current.id = element.editedId;
                  scope.current.element = element;
                  scope.current.disciplineTimeId = element.hour.id;
                  scope.current.classroomId = element.room.id;
                  scope.current.studyId = element.studyId;
                  scope.current.dayOfWeek = scope.dayIndex;
                  scope.current.week = 0;
                  scope.dragScheduleTile();
                }
              } else {
                ui.helper.css({
                  left: left,
                  top : top
                });
              }
            }
          })/*.resizable({
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
           })*/;

          var pTpl = '<div class="draggable-cell-popup" scheduler-draggable-popup></div>';
          element.append($compile(pTpl)(scope));
          if (!attrs.noOpen) {
            $('.draggable-cell-popup').removeClass('show');
            $('.draggable-cell').removeClass('active');
            element.addClass('active');
            $timeout(function () {
              element.find('.draggable-cell-popup').addClass('show');
              scope.current = {};
              scope.currentStudyId = null;
              scope.current.element = element;
              scope.current.disciplineTimeId = element.hour.id;
              scope.current.classroomId = element.room.id;
              scope.current.dayOfWeek = scope.dayIndex;
              scope.current.week = 0;
            }, 20);
          }

          scope.pushDraggable(element);
        }
      };
    }).
    directive('schedulerDraggablePopup', function (ScheduleList, StudiesList, $rootScope, strings) {
      return {
        restrict   : 'A',
        link       : function (scope, element, attributes) {
          var attrs = scope.$eval(attributes.schedulerDraggablePopup);

          element.find('.close').click(function () {
            element.removeClass('show');
          });
          element.bind('mousedown', function (event) {
            event.stopPropagation();
          });
          element.find('select, input').bind('mouseup', function (event) {
            event.stopPropagation();
          });
          scope.createScheduleTile = function () {
            scope.current.studyId = this.currentStudyId;

            var elem = scope.current.element,
                sendingObj = _.cloneDeep(scope.current);
            if (elem.editedId) {
              sendingObj.id = elem.editedId;
              ScheduleList.edit(sendingObj).then(function (data) {
                elem.studyId = sendingObj.studyId;

                var matched = _.find(scope.studies, function(study){
                  return elem.studyId == study.id;
                });
                if (matched) {
                  $(sendingObj.element).find('.cell-name').text(matched._curriculum.discipline.name);
                }
              }, function () {
                $rootScope.$broadcast('toast', strings.createError);
              });
            } else {
              ScheduleList.add(sendingObj).then(function (data) {
                var matched = StudiesList.getOneFromList(sendingObj.studyId);

                elem.editedId = data.id;
                elem.studyId = sendingObj.studyId;
                if (matched) {
                  $(sendingObj.element).find('.cell-name').text(matched._curriculum.discipline.name);
                }
              }, function () {
                $rootScope.$broadcast('toast', strings.createError);
              });
            }
          };
          scope.dragScheduleTile = function () {
            var sendingObj = _.cloneDeep(scope.current);
            ScheduleList.edit(sendingObj).then(function (data) {
            }, function () {
              $rootScope.$broadcast('toast', strings.createError);
            });
          };
        },
        templateUrl: 'partials/dragPopup.html'
      };
    });