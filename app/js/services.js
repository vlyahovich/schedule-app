'use strict';

/* Services */
App.host = 'http://127.0.0.1:8090';

angular.module('scheduleApp.services', []).
    value('version', '0.8.0').
    value('rest', {
      auth                : App.host + '/service/rest/bsu/mmf/login',
      scheduleList        : App.host + '/service/rest/bsu/mmf/schedule',
      usersList           : App.host + '/service/rest/bsu/mmf/user/list',
      userGet             : App.host + '/service/rest/bsu/mmf/user/{userId}',
      userCreate          : App.host + '/service/rest/bsu/mmf/user/add',
      userErase           : App.host + '/service/rest/bsu/mmf/user/{userId}/delete',
      userEdit            : App.host + '/service/rest/bsu/mmf/user/{userId}/edit',
      studentsList        : App.host + '/service/rest/bsu/mmf/user/student/list',
      studentCreate       : App.host + '/service/rest/bsu/mmf/user/student/add',
      studentErase        : App.host + '/service/rest/bsu/mmf/user/student/{studentId}/delete',
      studentEdit         : App.host + '/service/rest/bsu/mmf/user/student/{studentId}/edit',
      lecturersList       : App.host + '/service/rest/bsu/mmf/user/lecturer/list',
      lecturerCreate      : App.host + '/service/rest/bsu/mmf/user/lecturer/add',
      lecturerErase       : App.host + '/service/rest/bsu/mmf/user/lecturer/{lecturerId}/delete',
      lecturerEdit        : App.host + '/service/rest/bsu/mmf/user/lecturer/{lecturerId}/edit',
      departmentsList     : App.host + '/service/rest/bsu/mmf/department/list',
      departmentCreate    : App.host + '/service/rest/bsu/mmf/department/add',
      departmentErase     : App.host + '/service/rest/bsu/mmf/department/{departmentId}/delete',
      departmentEdit      : App.host + '/service/rest/bsu/mmf/department/{departmentId}/edit',
      specialitiesList    : App.host + '/service/rest/bsu/mmf/specialty/list',
      specialityCreate    : App.host + '/service/rest/bsu/mmf/specialty/add',
      specialityErase     : App.host + '/service/rest/bsu/mmf/specialty/{specialityId}/delete',
      specialityEdit      : App.host + '/service/rest/bsu/mmf/specialty/{specialityId}/edit',
      groupsList          : App.host + '/service/rest/bsu/mmf/group/list',
      groupCreate         : App.host + '/service/rest/bsu/mmf/group/add',
      groupErase          : App.host + '/service/rest/bsu/mmf/group/{groupId}/delete',
      groupEdit           : App.host + '/service/rest/bsu/mmf/group/{groupId}/edit',
      disciplinesList     : App.host + '/service/rest/bsu/mmf/discipline/list',
      disciplineCreate    : App.host + '/service/rest/bsu/mmf/discipline/add',
      disciplineErase     : App.host + '/service/rest/bsu/mmf/discipline/{disciplineId}/delete',
      disciplineEdit      : App.host + '/service/rest/bsu/mmf/discipline/{disciplineId}/edit',
      disciplineTypesList : App.host + '/service/rest/bsu/mmf/disciplineType/list',
      disciplineTypeCreate: App.host + '/service/rest/bsu/mmf/disciplineType/add',
      disciplineTypeErase : App.host + '/service/rest/bsu/mmf/disciplineType/{disciplineTypeId}/delete',
      disciplineTypeEdit  : App.host + '/service/rest/bsu/mmf/disciplineType/{disciplineTypeId}/edit',
      curriculumsList     : App.host + '/service/rest/bsu/mmf/curriculum/list',
      curriculumCreate    : App.host + '/service/rest/bsu/mmf/curriculum/add',
      curriculumErase     : App.host + '/service/rest/bsu/mmf/curriculum/{curriculumId}/delete',
      curriculumEdit      : App.host + '/service/rest/bsu/mmf/curriculum/{curriculumId}/edit',
      classroomsList      : App.host + '/service/rest/bsu/mmf/classroom/list',
      classroomCreate     : App.host + '/service/rest/bsu/mmf/classroom/add',
      classroomErase      : App.host + '/service/rest/bsu/mmf/classroom/{classroomId}/delete',
      classroomEdit       : App.host + '/service/rest/bsu/mmf/classroom/{classroomId}/edit',
      studiesList         : App.host + '/service/rest/bsu/mmf/study/list',
      studyCreate         : App.host + '/service/rest/bsu/mmf/study/add',
      studyErase          : App.host + '/service/rest/bsu/mmf/study/{studyId}/delete',
      studyEdit           : App.host + '/service/rest/bsu/mmf/study/{studyId}/edit'
    }).
    value('strings', {
      data               : 'Данные',
      schedule           : 'Расписание',
      appName            : 'Расписание',
      toHome             : 'На главную',
      enter              : 'Войти',
      params             : 'Параметры',
      edit               : 'Редактирование',
      exit               : 'Выход',
      look               : 'Смотреть',
      currentWeek        : 'Текущая неделя',
      nextWeek           : 'Следующая неделя',
      evenOdd            : 'предмет чередуется',
      hasNoty            : 'предмет имеет пометки',
      namePlaceholder    : 'Имя',
      passPlaceholder    : 'Пароль',
      coursePlaceholder  : 'Курс',
      groupPlaceholder   : 'Группа',
      sibGroupPlaceholder: 'Подгруппа',
      networkError       : 'Ошибка подключения. Невозможно обратиться к сервису, проверьте доступность интернета и попробуйте позже',
      authError          : 'Ошибка аутентификации. Проверьте правильность введённых данных',
      permissionError    : 'Ошибка доступа. Недостаточно прав',
      createError        : 'Ошибка создания данных',
      eraseError         : 'Ошибка удаления данных',
      noData             : 'Нет данных',
      noDataFound        : 'Ничего не найдено'
    }).
    value('gridSettings', {
      containment: '.scheduler-handle-wrap',
      handles    : 's',
      gridSize   : {width: 86, height: 36}
    }).
    factory('Spinner',function () {
      var spinner = new Spinner();

      return {
        start: function (element) {
          spinner.spin(element);
        },
        stop : function () {
          spinner.stop();
        }
      };
    }).
    factory('User',function ($q, $rootScope, rest) {
      var authenticated = false,
          userData = {},
          base64;

      return {
        login          : function (name, password) {
          var deferred = $q.defer();

          base64 = Base64.encode(name + ':' + password);
          $.ajax({
            url       : rest.auth,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + base64);
            },
            success   : function (data) {
              deferred.resolve();
              authenticated = true;
              userData = data;
              userData.base64 = base64;
              if (window.localStorage) {
                window.localStorage.setItem('MMF_USER', JSON.stringify(userData));
              }
              $rootScope.$apply();
            },
            error     : function () {
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        logout         : function () {
          var deferred = $q.defer();

          deferred.resolve();
          authenticated = false;
          userData = {};
          if (window.localStorage) {
            window.localStorage.removeItem('MMF_USER');
          }
          base64 = null;

          return deferred.promise;
        },
        getName        : function () {
          return userData.fullName;
        },
        restore        : function () {
          if (window.localStorage) {
            var localUser = window.localStorage.getItem('MMF_USER');

            if (localUser) {
              authenticated = true;
              userData = JSON.parse(localUser);
              base64 = userData.base64;
            }
          }
        },
        is             : function (authority) {
          if (userData.authorities && userData.authorities.length) {
            return _.find(userData.authorities, function (auth) {
              return auth.authority == authority;
            });
          }
          return undefined;
        },
        encode         : function () {
          return base64;
        },
        setLook        : function (data) {
          userData.userLook = {
            course  : data.course,
            group   : data.group,
            subGroup: data.subGroup
          };
        },
        getLook        : function () {
          return userData.userLook;
        },
        isAuthenticated: function () {
          return authenticated;
        }
      }
    }).
    factory('ScheduleList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function (req) {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.scheduleList,
            data      : {
              course  : req.course,
              group   : req.group,
              subGroup: req.subGroup
            },
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('UsersList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.usersList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              user = {
                name      : req.name,
                surname   : req.surname,
                patronymic: req.patronymic,
                login     : req.login,
                password  : req.password,
                admin     : req.admin == true
              };

          $.ajax({
            method     : 'POST',
            url        : rest.userCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(user),
            success    : function () {
              deferred.resolve(user);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.userErase.replace('{userId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.userEdit.replace('{userId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id        : req.id,
              name      : req.name,
              surname   : req.surname,
              patronymic: req.patronymic,
              login     : req.login,
              password  : req.password,
              admin     : req.admin == true
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        getOne: function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.userGet.replace('{userId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('StudentsList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.studentsList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              student = {
                name          : req.name,
                surname       : req.surname,
                patronymic    : req.patronymic,
                login         : req.login,
                password      : req.password,
                groupId       : req.groupId,
                yearOfEntrance: req.yearOfEntrance,
                praepostor    : req.praepostor == true,
                admin         : req.admin == true
              };

          $.ajax({
            method     : 'POST',
            url        : rest.studentCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(student),
            success    : function () {
              deferred.resolve(student);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.studentErase.replace('{studentId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.studentEdit.replace('{studentId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id            : req.id,
              name          : req.name,
              surname       : req.surname,
              patronymic    : req.patronymic,
              login         : req.login,
              password      : req.password,
              groupId       : req.groupId,
              yearOfEntrance: req.yearOfEntrance,
              praepostor    : req.praepostor == true,
              admin         : req.admin == true
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('LecturersList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.lecturersList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              lecturer = {
                name      : req.name,
                surname   : req.surname,
                patronymic: req.patronymic,
                login     : req.login,
                password  : req.password,
                department: req.department,
                admin     : req.admin == true
              };

          $.ajax({
            method     : 'POST',
            url        : rest.lecturerCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(lecturer),
            success    : function () {
              deferred.resolve(lecturer);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.studentErase.replace('{lecturerId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.lecturerEdit.replace('{lecturerId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id        : req.id,
              name      : req.name,
              surname   : req.surname,
              patronymic: req.patronymic,
              login     : req.login,
              password  : req.password,
              department: req.department,
              admin     : req.admin == true
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('DepartmentsList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.departmentsList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              department = {
                name       : req.name,
                description: req.description
              };

          $.ajax({
            method     : 'POST',
            url        : rest.departmentCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(department),
            success    : function () {
              deferred.resolve(department);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.departmentErase.replace('{departmentId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.departmentEdit.replace('{departmentId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id         : req.id,
              name       : req.name,
              description: req.description
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('SpecialitiesList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.specialitiesList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              speciality = {
                name       : req.name,
                description: req.description
              };

          $.ajax({
            method     : 'POST',
            url        : rest.departmentCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(speciality),
            success    : function () {
              deferred.resolve(speciality);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.specialityErase.replace('{specialityId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.specialityEdit.replace('{specialityId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id         : req.id,
              name       : req.name,
              description: req.description
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('GroupsList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.groupsList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              group = {
                number     : req.number,
                course     : req.course,
                year       : req.year,
                specialtyId: req.specialtyId
              };

          if (req.subgroup) {
            group.subgroup = req.subgroup;
          }
          $.ajax({
            method     : 'POST',
            url        : rest.groupCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(group),
            success    : function () {
              deferred.resolve(group);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.groupErase.replace('{groupId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer(),
              group = {
                id         : req.id,
                number     : req.number,
                course     : req.course,
                year       : req.year,
                specialtyId: req.specialtyId
              };

          if (req.subgroup) {
            group.subgroup = req.subgroup;
          }
          $.ajax({
            method     : 'POST',
            url        : rest.groupEdit.replace('{groupId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(group),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('DisciplinesList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.disciplinesList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              discipline = {
                name            : req.name,
                disciplineTypeId: req.disciplineTypeId
              };

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(discipline),
            success    : function () {
              deferred.resolve(discipline);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.disciplineErase.replace('{disciplineId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineEdit.replace('{disciplineId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id              : req.id,
              name            : req.name,
              disciplineTypeId: req.disciplineTypeId
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('DisciplineTypesList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.disciplineTypesList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              disciplineType = {
                type: req.type
              };

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineTypeCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(disciplineType),
            success    : function () {
              deferred.resolve(disciplineType);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.disciplineTypeErase.replace('{disciplineTypeId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineTypeEdit.replace('{disciplineTypeId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id  : req.id,
              type: req.type
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('CurriculumsList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.curriculumsList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              curriculum = {
                discipline: req.discipline,
                specialty : req.specialty,
                hours     : req.hours,
                semester  : req.semester,
                isExam    : req.isExam == true,
                isSetoff  : req.isSetoff == true
              };

          $.ajax({
            method     : 'POST',
            url        : rest.curriculumCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(curriculum),
            success    : function () {
              deferred.resolve(curriculum);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.curriculumErase.replace('{curriculumId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.curriculumEdit.replace('{curriculumId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id        : req.id,
              discipline: req.discipline,
              specialty : req.specialty,
              hours     : req.hours,
              semester  : req.semester,
              isExam    : req.isExam == true,
              isSetoff  : req.isSetoff == true
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('ClassroomsList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.classroomsList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              classroom = {
                number  : req.number,
                capacity: req.capacity
              };

          $.ajax({
            method     : 'POST',
            url        : rest.classroomCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(classroom),
            success    : function () {
              deferred.resolve(classroom);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.classroomErase.replace('{classroomId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.classroomEdit.replace('{classroomId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id      : req.id,
              number  : req.number,
              capacity: req.capacity
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('StudiesList', function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.studiesList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
              $rootScope.$apply();
            },
            error     : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            dataType  : 'json'
          });

          return deferred.promise;
        },
        create: function (req) {
          var deferred = $q.defer(),
              study = {
                group     : req.group,
                lecturer  : req.lecturer,
                curriculum: req.curriculum
              };

          $.ajax({
            method     : 'POST',
            url        : rest.studyCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(study),
            success    : function () {
              deferred.resolve(study);
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        erase : function (id) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'GET',
            url        : rest.studyErase.replace('{studyId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (id, req) {
          var deferred = $q.defer();

          $.ajax({
            method     : 'POST',
            url        : rest.studyEdit.replace('{studyId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id        : req.id,
              group     : req.group,
              lecturer  : req.lecturer,
              curriculum: req.curriculum
            }),
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              listCache = null;
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    });
