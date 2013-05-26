'use strict';

/**
 * Header controller
 */
App.controller('HeaderController',
    function ($scope, $rootScope, User, $location, strings) {
      $scope.User = User;
      $scope.strings = strings;

      $scope.login = function () {
        $scope.User.login(this.name, this.password).then(function () {
          // Login callback
        }, function () {
          $rootScope.$broadcast('toast', strings.authError);
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
      $scope.goManage = function () {
        $location.path('/manage');
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
        ScheduleList.lookup(User.getLook()).then(function () {
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
    function ($scope, $rootScope, $location, User, strings) {
      if (!User.is('ROLE_ADMIN')) {
        $rootScope.$broadcast('toast', strings.permissionError);
        $location.path('/');
      } else {

      }
    });

/**
 * Data page controller
 */
App.controller('ManagePageController',
    function ($scope, $rootScope, $location, User, strings) {
      if (!User.is('ROLE_ADMIN')) {
        $rootScope.$broadcast('toast', strings.permissionError);
        $location.path('/');
      } else {
        $scope.$on('pane:selected', function (event, category) {
          //console.log(category);
        });
      }
    });

/**
 * Manage users partial controller
 */
App.controller('UsersManageController',
    function ($scope, $rootScope, UsersList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('users:request-start')
        }, 1);
        UsersList.lookup().then(function (data) {
          $scope.$broadcast('users:request-end');
          $scope.users = data;
        }, function () {
          $rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('users:request-end');
        });
      };
      $scope.sync();

      $scope.addUser = function () {
        $scope.mode = 'addMode';
      };
      $scope.createUser = function () {
        UsersList.create(this.createdUser || {}).then(function (user) {
          if ($scope.users) {
            $scope.users.push(user)
          } else {
            $scope.users = [user];
          }
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editUser = function (user) {
        $scope.editedUser = user;
        $scope.mode = 'editMode';
      };
      $scope.viewUser = function (user) {
        $scope.viewedUser = user;
        $scope.mode = 'viewMode';
      };
      $scope.updateUser = function () {
        var usr = this.editedUser;

        UsersList.edit(this.editedUser.id, this.editedUser).then(function () {
          $scope.users[_.indexOf($scope.users, usr)] = usr;
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseUser = function (user) {
        UsersList.erase(user.id).then(function () {
          $scope.users.splice(_.indexOf($scope.users, user), 1);
        }, function () {
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage students partial controller
 */
App.controller('StudentsManageController',
    function ($scope, $rootScope, StudentsList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('students:request-start')
        }, 1);
        StudentsList.lookup().then(function (data) {
          $scope.$broadcast('students:request-end');
          $scope.students = data;
        }, function () {
          $rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('students:request-end');
        });
      };
      $scope.sync();

      $scope.addStudent = function () {
        $scope.mode = 'addMode';
      };
      $scope.createStudent = function () {
        StudentsList.create(this.createdStudent || {}).then(function (student) {
          if ($scope.students) {
            $scope.students.push(student)
          } else {
            $scope.students = [student];
          }
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editStudent = function (student) {
        $scope.editedStudent = student;
        $scope.mode = 'editMode';
      };
      $scope.viewStudent = function (student) {
        $scope.viewedStudent = student;
        $scope.mode = 'viewMode';
      };
      $scope.updateStudent = function () {
        var std = this.editedStudent;

        StudentsList.edit(this.editedStudent.id, this.editedStudent).then(function () {
          $scope.students[_.indexOf($scope.students, std)] = std;
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseStudent = function (student) {
        StudentsList.erase(student.id).then(function () {
          $scope.students.splice(_.indexOf($scope.students, student), 1);
        }, function () {
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage lecturers partial controller
 */
App.controller('LecturersManageController',
    function ($scope, $rootScope, LecturersList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('lecturers:request-start')
        }, 1);
        LecturersList.lookup().then(function (data) {
          $scope.$broadcast('lecturers:request-end');
          $scope.lecturers = data;
        }, function () {
          $rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('students:request-end');
        });
      };
      $scope.sync();

      $scope.addLecturer = function () {
        $scope.mode = 'addMode';
      };
      $scope.createLecturer = function () {
        LecturersList.create(this.createdLecturer || {}).then(function (lecturer) {
          if ($scope.lecturers) {
            $scope.lecturers.push(lecturer)
          } else {
            $scope.lecturers = [lecturer];
          }
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editLecturer = function (lecturer) {
        $scope.editedLecturer = lecturer;
        $scope.mode = 'editMode';
      };
      $scope.viewLecturer = function (lecturer) {
        $scope.viewedLecturer = lecturer;
        $scope.mode = 'viewMode';
      };
      $scope.updateLecturer = function () {
        var lct = this.editedLecturer;

        LecturersList.edit(this.editedLecturer.id, this.editedLecturer).then(function () {
          $scope.lecturers[_.indexOf($scope.lecturers, lct)] = lct;
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseLecturer = function (lecturer) {
        LecturersList.erase(lecturer.id).then(function () {
          $scope.lecturers.splice(_.indexOf($scope.lecturers, lecturer), 1);
        }, function () {
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage departments partial controller
 */
App.controller('DepartmentsManageController',
    function ($scope, $rootScope, DepartmentsList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('departments:request-start')
        }, 1);
        DepartmentsList.lookup().then(function (data) {
          $scope.$broadcast('departments:request-end');
          $scope.departments = data;
        }, function () {
          $rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('students:request-end');
        });
      };
      $scope.sync();

      $scope.addDepartment = function () {
        $scope.mode = 'addMode';
      };
      $scope.createDepartment = function () {
        DepartmentsList.create(this.createdDepartment || {}).then(function (department) {
          if ($scope.departments) {
            $scope.departments.push(department)
          } else {
            $scope.departments = [department];
          }
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editDepartment = function (department) {
        $scope.editedDepartment = department;
        $scope.mode = 'editMode';
      };
      $scope.viewDepartment = function (department) {
        $scope.viewedDepartment = department;
        $scope.mode = 'viewMode';
      };
      $scope.updateDepartment = function () {
        var dpt = this.editedDepartment;

        DepartmentsList.edit(this.editedDepartment.id, this.editedDepartment).then(function () {
          $scope.departments[_.indexOf($scope.departments, dpt)] = dpt;
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseDepartment = function (department) {
        DepartmentsList.erase(department.id).then(function () {
          $scope.departments.splice(_.indexOf($scope.departments, department), 1);
        }, function () {
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Settings page controller
 */
App.controller('SchedulePageController',
    function ($scope, $rootScope, gridSettings, $location, User, strings) {
      if (!User.is('ROLE_ADMIN')) {
        $rootScope.$broadcast('toast', strings.permissionError);
        $location.path('/');
      } else {
        $scope.classrooms = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113];
        $scope.range = {min: 100, max: 109};
        $scope.rangeStep = 9;
        $scope.hours = ['8.15', '9.45', '10.00', '10.30', '10.45', '12.15', '12.30', '14.00', '14.15', '15.45', '16.00'];

        $scope.classroomsPositions = _.map($scope.classrooms, function (value, index) {
          return {room: value, position: gridSettings.gridSize.width * index};
        });
        $scope.getRoomByPosition = function (position) {
          return _.find($scope.classroomsPositions, function (room) {
            return room.position == position;
          });
        };
        $scope.hoursPositions = _.map($scope.hours, function (value, index) {
          return {hour: value, position: gridSettings.gridSize.height * index};
        });
        $scope.lowestHour = $scope.hoursPositions[$scope.hoursPositions.length - 1];
        $scope.getHourByPosition = function (position) {
          if (position > $scope.lowestHour.position) {
            position = $scope.lowestHour.position;
          }
          return _.find($scope.hoursPositions, function (hour) {
            return hour.position == position;
          });
        };

        $scope.updateRooms = function () {
          $scope.currentRooms = _.filter($scope.classrooms, function (room) {
            return room >= $scope.range.min && room <= $scope.range.max;
          });
        };
        $scope.updateRooms();

        $scope.previousRange = function () {
          if ($scope.range.min - $scope.rangeStep >= $scope.classrooms[0]) {
            $scope.range.min -= $scope.rangeStep;
            $scope.range.max -= $scope.rangeStep;
            $scope.updateRooms();
            $scope.$broadcast('schedule:update-range-back', $scope.rangeStep);
          } else {
            var diff = Math.abs($scope.classrooms[0] - $scope.range.min);

            if (diff > 0) {
              $scope.range.min -= diff;
              $scope.range.max -= diff;
              $scope.updateRooms();
              $scope.$broadcast('schedule:update-range-back', diff);
            }
          }
        };
        $scope.nextRange = function () {
          var last = $scope.classrooms[$scope.classrooms.length - 1];

          if ($scope.range.max + $scope.rangeStep <= last) {
            $scope.range.min += $scope.rangeStep;
            $scope.range.max += $scope.rangeStep;
            $scope.updateRooms();
            $scope.$broadcast('schedule:update-range-forward', $scope.rangeStep);
          } else {
            var diff = Math.abs(last - $scope.range.max);

            if (diff > 0) {
              $scope.range.min += diff;
              $scope.range.max += diff;
              $scope.updateRooms();
              $scope.$broadcast('schedule:update-range-forward', diff);
            }
          }
        };
      }
    });