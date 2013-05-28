'use strict';

/**
 * Header controller
 */
App.controller('HeaderController',
    function ($scope, $rootScope, User, $location, strings) {
      $scope.User = User;
      $scope.strings = strings;
      User.restore();

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
          $scope.$broadcast('users:request-start');
        }, 1);
        UsersList.lookup().then(function (data) {
          $scope.$broadcast('users:request-end');
          $scope.users = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('users:request-end');
        });
      };
      $scope.sync();

      $scope.addUser = function () {
        $scope.mode = 'addMode';
      };
      $scope.createUser = function () {
        $scope.$broadcast('users:request-start');
        UsersList.create(this.createdUser || {}).then(function () {
          $scope.$broadcast('users:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('users:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editUser = function (user) {
        $scope.editedUser = _.cloneDeep(user);
        $scope.editedUser.password = null;
        $scope.mode = 'editMode';
      };
      $scope.viewUser = function (user) {
        $scope.viewedUser = user;
        $scope.mode = 'viewMode';
      };
      $scope.updateUser = function () {
        $scope.$broadcast('users:request-start');
        UsersList.edit(this.editedUser).then(function () {
          $scope.$broadcast('users:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('users:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseUser = function (user) {
        $scope.$broadcast('users:request-start');
        UsersList.erase(user.id).then(function () {
          $scope.$broadcast('users:request-end');
          $scope.users.splice(_.indexOf($scope.users, user), 1);
        }, function () {
          $scope.$broadcast('users:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage students partial controller
 */
App.controller('StudentsManageController',
    function ($scope, $rootScope, StudentsList, GroupsList, strings, $timeout, $parse) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('students:request-start');
        }, 1);
        StudentsList.lookup().then(function (data) {
          $scope.$broadcast('students:request-end');
          $scope.students = data;
        }, function () {
          $scope.$broadcast('students:request-end');
        });
      };
      $scope.sync();

      $scope.addStudent = function () {
        $scope.groups = GroupsList.get();
        $scope.mode = 'addMode';
      };
      $scope.createStudent = function () {
        $scope.$broadcast('students:request-start');
        StudentsList.create(this.createdStudent || {}).then(function () {
          $scope.$broadcast('students:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('students:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.groupAdapter = function (group) {
        return group.number + (group.subgroup ? group.subgroup : '') + ' (' + group.year + ')';
      };
      $scope.editStudent = function (student) {
        $scope.groups = GroupsList.get();
        $scope.editedStudent = _.cloneDeep(student);
        $scope.editedStudent.password = null;
        $scope.editedStudent.groupId = student.group.id;
        $scope.mode = 'editMode';
      };
      $scope.viewStudent = function (student) {
        $scope.viewedStudent = student;
        $scope.mode = 'viewMode';
      };
      $scope.updateStudent = function () {
        $scope.$broadcast('students:request-start');
        StudentsList.edit(this.editedStudent).then(function () {
          $scope.$broadcast('students:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('students:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseStudent = function (student) {
        $scope.$broadcast('students:request-start');
        StudentsList.erase(student.id).then(function () {
          $scope.$broadcast('students:request-end');
          $scope.students.splice(_.indexOf($scope.students, student), 1);
        }, function () {
          $scope.$broadcast('students:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage lecturers partial controller
 */
App.controller('LecturersManageController',
    function ($scope, $rootScope, LecturersList, DepartmentsList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('lecturers:request-start');
        }, 1);
        LecturersList.lookup().then(function (data) {
          $scope.$broadcast('lecturers:request-end');
          $scope.lecturers = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('lecturers:request-end');
        });
      };
      $scope.sync();

      $scope.addLecturer = function () {
        $scope.departments = DepartmentsList.get();
        $scope.mode = 'addMode';
      };
      $scope.createLecturer = function () {
        $scope.$broadcast('lecturers:request-start');
        LecturersList.create(this.createdLecturer || {}).then(function () {
          $scope.$broadcast('lecturers:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('lecturers:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editLecturer = function (lecturer) {
        $scope.departments = DepartmentsList.get();
        $scope.editedLecturer = _.cloneDeep(lecturer);
        $scope.editedLecturer.departmentId = lecturer.department.id;
        $scope.editedLecturer.password = null;
        $scope.mode = 'editMode';
      };
      $scope.viewLecturer = function (lecturer) {
        $scope.viewedLecturer = lecturer;
        $scope.mode = 'viewMode';
      };
      $scope.updateLecturer = function () {
        $scope.$broadcast('lecturers:request-start');
        LecturersList.edit(this.editedLecturer).then(function () {
          $scope.$broadcast('lecturers:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('lecturers:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseLecturer = function (lecturer) {
        $scope.$broadcast('lecturers:request-start');
        LecturersList.erase(lecturer.id).then(function () {
          $scope.$broadcast('lecturers:request-end');
          $scope.lecturers.splice(_.indexOf($scope.lecturers, lecturer), 1);
        }, function () {
          $scope.$broadcast('lecturers:request-end');
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
          $scope.$broadcast('departments:request-start');
        }, 1);
        DepartmentsList.lookup().then(function (data) {
          $scope.$broadcast('departments:request-end');
          $scope.departments = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('departments:request-end');
        });
      };
      $scope.sync();

      $scope.addDepartment = function () {
        $scope.mode = 'addMode';
      };
      $scope.createDepartment = function () {
        $scope.$broadcast('departments:request-start');
        DepartmentsList.create(this.createdDepartment || {}).then(function () {
          $scope.$broadcast('departments:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editDepartment = function (department) {
        $scope.editedDepartment = _.cloneDeep(department);
        $scope.mode = 'editMode';
      };
      $scope.viewDepartment = function (department) {
        $scope.viewedDepartment = department;
        $scope.mode = 'viewMode';
      };
      $scope.updateDepartment = function () {
        $scope.$broadcast('departments:request-start');
        DepartmentsList.edit(this.editedDepartment).then(function () {
          $scope.$broadcast('departments:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('departments:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseDepartment = function (department) {
        $scope.$broadcast('departments:request-start');
        DepartmentsList.erase(department.id).then(function () {
          $scope.$broadcast('departments:request-end');
          $scope.departments.splice(_.indexOf($scope.departments, department), 1);
        }, function () {
          $scope.$broadcast('departments:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage specialities partial controller
 */
App.controller('SpecialitiesManageController',
    function ($scope, $rootScope, SpecialitiesList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('specialities:request-start');
        }, 1);
        SpecialitiesList.lookup().then(function (data) {
          $scope.$broadcast('specialities:request-end');
          $scope.specialities = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('specialities:request-end');
        });
      };
      $scope.sync();

      $scope.addSpeciality = function () {
        $scope.mode = 'addMode';
      };
      $scope.createSpeciality = function () {
        $scope.$broadcast('specialities:request-start');
        SpecialitiesList.create(this.createdSpeciality || {}).then(function () {
          $scope.$broadcast('specialities:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('specialities:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editSpeciality = function (speciality) {
        $scope.editedSpeciality = _.cloneDeep(speciality);
        $scope.mode = 'editMode';
      };
      $scope.viewSpeciality = function (speciality) {
        $scope.viewedSpeciality = speciality;
        $scope.mode = 'viewMode';
      };
      $scope.updateSpeciality = function () {
        $scope.$broadcast('specialities:request-start');
        SpecialitiesList.edit(this.editedSpeciality).then(function () {
          $scope.$broadcast('specialities:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('specialities:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseSpeciality = function (speciality) {
        $scope.$broadcast('specialities:request-start');
        SpecialitiesList.erase(speciality.id).then(function () {
          $scope.$broadcast('specialities:request-end');
          $scope.specialities.splice(_.indexOf($scope.specialities, speciality), 1);
        }, function () {
          $scope.$broadcast('specialities:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage groups partial controller
 */
App.controller('GroupsManageController',
    function ($scope, $rootScope, GroupsList, SpecialitiesList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('groups:request-start');
        }, 1);
        GroupsList.lookup().then(function (data) {
          $scope.$broadcast('groups:request-end');
          $scope.groups = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('groups:request-end');
        });
      };
      $scope.sync();

      $scope.addGroup = function () {
        $scope.specialities = SpecialitiesList.get();
        $scope.mode = 'addMode';
      };
      $scope.createGroup = function () {
        $scope.$broadcast('groups:request-start');
        GroupsList.create(this.createdGroup || {}).then(function () {
          $scope.$broadcast('groups:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('groups:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editGroup = function (group) {
        $scope.specialities = SpecialitiesList.get();
        $scope.editedGroup = _.cloneDeep(group);
        $scope.editedGroup.specialtyId = group.specialty.id;
        $scope.mode = 'editMode';
      };
      $scope.viewGroup = function (group) {
        $scope.viewedGroup = group;
        $scope.mode = 'viewMode';
      };
      $scope.updateGroup = function () {
        $scope.$broadcast('groups:request-start');
        GroupsList.edit(this.editedGroup).then(function () {
          $scope.$broadcast('groups:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('groups:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseGroup = function (group) {
        $scope.$broadcast('groups:request-start');
        GroupsList.erase(group.id).then(function () {
          $scope.$broadcast('groups:request-end');
          $scope.groups.splice(_.indexOf($scope.groups, group), 1);
        }, function () {
          $scope.$broadcast('groups:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage disciplines partial controller
 */
App.controller('DisciplinesManageController',
    function ($scope, $rootScope, DisciplinesList, DisciplineTypesList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('disciplines:request-start');
        }, 1);
        DisciplinesList.lookup().then(function (data) {
          $scope.$broadcast('disciplines:request-end');
          $scope.disciplines = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('disciplines:request-end');
        });
      };
      $scope.sync();

      $scope.addDiscipline = function () {
        $scope.dTypes = DisciplineTypesList.get();
        $scope.mode = 'addMode';
      };
      $scope.createDiscipline = function () {
        $scope.$broadcast('disciplines:request-start');
        DisciplinesList.create(this.createdDiscipline || {}).then(function () {
          $scope.$broadcast('disciplines:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('disciplines:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editDiscipline = function (discipline) {
        $scope.dTypes = DisciplineTypesList.get();
        $scope.editedDiscipline = _.cloneDeep(discipline);
        $scope.editedDiscipline.disciplineTypeId = discipline.disciplineType.id;
        $scope.mode = 'editMode';
      };
      $scope.viewDiscipline = function (discipline) {
        $scope.viewedDiscipline = discipline;
        $scope.mode = 'viewMode';
      };
      $scope.updateDiscipline = function () {
        $scope.$broadcast('disciplines:request-start');
        DisciplinesList.edit(this.editedDiscipline).then(function () {
          $scope.$broadcast('disciplines:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('disciplines:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseDiscipline = function (discipline) {
        $scope.$broadcast('disciplines:request-start');
        DisciplinesList.erase(discipline.id).then(function () {
          $scope.$broadcast('disciplines:request-end');
          $scope.disciplines.splice(_.indexOf($scope.disciplines, discipline), 1);
        }, function () {
          $scope.$broadcast('disciplines:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage discipline types partial controller
 */
App.controller('DisciplineTypesManageController',
    function ($scope, $rootScope, DisciplineTypesList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('disciplineTypes:request-start');
        }, 1);
        DisciplineTypesList.lookup().then(function (data) {
          $scope.$broadcast('disciplineTypes:request-end');
          $scope.disciplineTypes = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('disciplineTypes:request-end');
        });
      };
      $scope.sync();

      $scope.addDisciplineType = function () {
        $scope.mode = 'addMode';
      };
      $scope.createDisciplineType = function () {
        $scope.$broadcast('disciplineTypes:request-start');
        DisciplineTypesList.create(this.createdDisciplineType || {}).then(function () {
          $scope.$broadcast('disciplineTypes:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('disciplineTypes:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editDisciplineType = function (disciplineType) {
        $scope.editedDisciplineType = _.cloneDeep(disciplineType);
        $scope.mode = 'editMode';
      };
      $scope.viewDisciplineType = function (disciplineType) {
        $scope.viewedDisciplineType = disciplineType;
        $scope.mode = 'viewMode';
      };
      $scope.updateDisciplineType = function () {
        $scope.$broadcast('disciplineTypes:request-start');
        DisciplineTypesList.edit(this.editedDisciplineType).then(function () {
          $scope.$broadcast('disciplineTypes:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('disciplineTypes:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseDisciplineType = function (disciplineType) {
        $scope.$broadcast('disciplineTypes:request-start');
        DisciplineTypesList.erase(disciplineType.id).then(function () {
          $scope.$broadcast('disciplineTypes:request-end');
          $scope.disciplineTypes.splice(_.indexOf($scope.disciplineTypes, disciplineType), 1);
        }, function () {
          $scope.$broadcast('disciplineTypes:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage curriculums partial controller
 */
App.controller('CurriculumsManageController',
    function ($scope, $rootScope, CurriculumsList, SpecialitiesList, DisciplinesList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('curriculums:request-start');
        }, 1);
        CurriculumsList.lookup().then(function (data) {
          $scope.$broadcast('curriculums:request-end');
          $scope.curriculums = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('curriculums:request-end');
        });
      };
      $scope.sync();

      $scope.addCurriculum = function () {
        $scope.disciplines = DisciplinesList.get();
        $scope.specialities = SpecialitiesList.get();
        $scope.mode = 'addMode';
      };
      $scope.createCurriculum = function () {
        $scope.$broadcast('curriculums:request-start');
        CurriculumsList.create(this.createdCurriculum || {}).then(function () {
          $scope.$broadcast('curriculums:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('curriculums:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editCurriculum = function (curriculum) {
        $scope.disciplines = DisciplinesList.get();
        $scope.specialities = SpecialitiesList.get();
        $scope.editedCurriculum = _.cloneDeep(curriculum);
        $scope.editedCurriculum.disciplineId = curriculum.discipline.id;
        $scope.editedCurriculum.specialtyId = curriculum.specialty.id;
        $scope.mode = 'editMode';
      };
      $scope.viewCurriculum = function (curriculum) {
        $scope.viewedCurriculum = curriculum;
        $scope.mode = 'viewMode';
      };
      $scope.updateCurriculum = function () {
        $scope.$broadcast('curriculums:request-start');
        CurriculumsList.edit(this.editedCurriculum).then(function () {
          $scope.$broadcast('curriculums:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('curriculums:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseCurriculum = function (curriculum) {
        $scope.$broadcast('curriculums:request-start');
        CurriculumsList.erase(curriculum.id).then(function () {
          $scope.$broadcast('curriculums:request-end');
          $scope.curriculums.splice(_.indexOf($scope.curriculums, curriculum), 1);
        }, function () {
          $scope.$broadcast('curriculums:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage classrooms partial controller
 */
App.controller('ClassroomsManageController',
    function ($scope, $rootScope, ClassroomsList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('classrooms:request-start');
        }, 1);
        ClassroomsList.lookup().then(function (data) {
          $scope.$broadcast('classrooms:request-end');
          $scope.classrooms = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('classrooms:request-end');
        });
      };
      $scope.sync();

      $scope.addClassroom = function () {
        $scope.mode = 'addMode';
      };
      $scope.createClassroom = function () {
        $scope.$broadcast('classrooms:request-start');
        ClassroomsList.create(this.createdClassroom || {}).then(function () {
          $scope.$broadcast('classrooms:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('classrooms:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.editClassroom = function (classroom) {
        $scope.editedClassroom = _.cloneDeep(classroom);
        $scope.mode = 'editMode';
      };
      $scope.viewClassroom = function (classroom) {
        $scope.viewedClassroom = classroom;
        $scope.mode = 'viewMode';
      };
      $scope.updateClassroom = function () {
        $scope.$broadcast('classrooms:request-start');
        ClassroomsList.edit(this.editedClassroom).then(function () {
          $scope.$broadcast('classrooms:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('classrooms:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseClassroom = function (classroom) {
        $scope.$broadcast('classrooms:request-start');
        ClassroomsList.erase(classroom.id).then(function () {
          $scope.$broadcast('classrooms:request-end');
          $scope.classrooms.splice(_.indexOf($scope.classrooms, classroom), 1);
        }, function () {
          $scope.$broadcast('classrooms:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage studies partial controller
 */
App.controller('StudiesManageController',
    function ($scope, $rootScope, StudiesList, GroupsList, LecturersList, CurriculumsList, strings, $timeout) {
      $scope.mode = 'listMode';

      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('studies:request-start');
        }, 1);
        StudiesList.lookup().then(function (data) {
          $scope.$broadcast('studies:request-end');
          $scope.studies = data;
        }, function () {
          //$rootScope.$broadcast('toast', strings.networkError);
          $scope.$broadcast('studies:request-end');
        });
      };
      $scope.sync();

      $scope.addStudy = function () {
        $scope.groups = GroupsList.get();
        $scope.lecturers = LecturersList.get();
        $scope.curriculums = CurriculumsList.get();
        $scope.mode = 'addMode';
      };
      $scope.createStudy = function () {
        $scope.$broadcast('studies:request-start');
        StudiesList.create(this.createdStudy || {}).then(function () {
          $scope.$broadcast('studies:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('studies:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.groupAdapter = function (group) {
        return group.number + (group.subgroup ? group.subgroup : '') + ' (' + group.year + ')';
      };
      $scope.curriculumAdapter = function (curriculum) {
        return curriculum.discipline.name + '(' + curriculum.specialty.name + ') ' + curriculum.semester + ' семестр';
      };
      $scope.editStudy = function (study) {
        $scope.groups = GroupsList.get();
        $scope.lecturers = LecturersList.get();
        $scope.curriculums = CurriculumsList.get();
        $scope.editedStudy = _.cloneDeep(study);
        $scope.editedStudy.groupId = study.group.id;
        $scope.editedStudy.lecturerId = study.lecturer.id;
        $scope.editedStudy.curriculumId = study.curriculum.id;
        $scope.mode = 'editMode';
      };
      $scope.viewStudy = function (study) {
        $scope.viewedStudy = study;
        $scope.mode = 'viewMode';
      };
      $scope.updateStudy = function () {
        $scope.$broadcast('studies:request-start');
        StudiesList.edit(this.editedStudy).then(function () {
          $scope.$broadcast('studies:request-end');
          $scope.mode = 'listMode';
        }, function () {
          $scope.$broadcast('studies:request-end');
          $rootScope.$broadcast('toast', strings.createError);
        });
      };
      $scope.eraseStudy = function (study) {
        $scope.$broadcast('studies:request-start');
        StudiesList.erase(study.id).then(function () {
          $scope.$broadcast('studies:request-end');
          $scope.studies.splice(_.indexOf($scope.studies, study), 1);
        }, function () {
          $scope.$broadcast('studies:request-end');
          $rootScope.$broadcast('toast', strings.eraseError);
        });
      };
    });

/**
 * Manage time partial controller
 */

App.controller('TimesManageController',
    function ($scope, $rootScope, TimesList, strings, $timeout) {
      $scope.sync = function () {
        $timeout(function () {
          $scope.$broadcast('times:request-start');
        }, 1);
        TimesList.lookup().then(function (data) {
          $scope.$broadcast('times:request-end');
          $scope.times = data;
        }, function () {
          $scope.$broadcast('times:request-end');
        });
      };
      $scope.sync();
      $scope.buttonText = "Добавить";
      $scope.edit = false;

      $scope.addTime = function () {
        this.timepicker = {};
        $scope.buttonText = "Добавить";
        $scope.edit = false;
      };
      $scope.editTime = function (time) {
        if (!this.timepicker) {
          this.timepicker = {};
        }
        this.timepicker.id = time.id;
        this.timepicker.number = time.number;
        this.timepicker.startTime = time.startTime;
        this.timepicker.endTime = time.endTime;
        this.timepicker.breakTime = "00:" + (time.breakTime < 10 ? '0' + time.breakTime : time.breakTime);
        $scope.buttonText = "Изменить";
        $scope.edit = true;
      };
      $scope.createTime = function () {
        var timepicker;
        if ($scope.edit) {
          if (this.timepicker) {
            timepicker = _.cloneDeep(this.timepicker);
            timepicker.breakTime = timepicker.breakTime.substr(timepicker.breakTime.length - 2,
                timepicker.breakTime.length);
          }
          $scope.$broadcast('times:request-start');
          TimesList.edit(timepicker).then(function () {
            $scope.$broadcast('times:request-end');
          }, function () {
            $scope.$broadcast('times:request-end');
            $rootScope.$broadcast('toast', strings.createError);
          });
        } else {
          if (this.timepicker) {
            timepicker = _.cloneDeep(this.timepicker);
            timepicker.number = $scope.times.length + 1;
            timepicker.breakTime = timepicker.breakTime.substr(timepicker.breakTime.length - 2,
                timepicker.breakTime.length);
          }
          $scope.$broadcast('times:request-start');
          TimesList.create(timepicker || {}).then(function () {
            $scope.$broadcast('times:request-end');
          }, function () {
            $scope.$broadcast('times:request-end');
            $rootScope.$broadcast('toast', strings.createError);
          });
        }
      };
      $scope.eraseTime = function (time) {
        this.timepicker = {};
        $scope.$broadcast('times:request-start');
        TimesList.erase(time.id).then(function () {
          $scope.$broadcast('times:request-end');
          $scope.times.splice(_.indexOf($scope.times, time), 1);
        }, function () {
          $scope.$broadcast('times:request-end');
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