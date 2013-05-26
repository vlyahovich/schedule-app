'use strict';

/* Services */
App.host = 'http://192.168.1.90:8090';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('scheduleApp.services', []).
    value('version', '0.8.0').
    value('rest', {
      auth            : App.host + '/service/rest/bsu/mmf/login',
      scheduleList    : App.host + '/service/rest/bsu/mmf/schedule',
      usersList       : App.host + '/service/rest/bsu/mmf/user/list',
      userCreate      : App.host + '/service/rest/bsu/mmf/user/add',
      userErase       : App.host + '/service/rest/bsu/mmf/user/{userId}/delete',
      userEdit        : App.host + '/service/rest/bsu/mmf/user/{userId}/edit',
      studentsList    : App.host + '/service/rest/bsu/mmf/user/student/list',
      studentCreate   : App.host + '/service/rest/bsu/mmf/user/student/add',
      studentErase    : App.host + '/service/rest/bsu/mmf/user/student/{studentId}/delete',
      studentEdit     : App.host + '/service/rest/bsu/mmf/user/student/{studentId}/edit',
      lecturersList   : App.host + '/service/rest/bsu/mmf/user/lecturer/list',
      lecturerCreate  : App.host + '/service/rest/bsu/mmf/user/lecturer/add',
      lecturerErase   : App.host + '/service/rest/bsu/mmf/user/lecturer/{lecturerId}/delete',
      lecturerEdit    : App.host + '/service/rest/bsu/mmf/user/lecturer/{lecturerId}/edit',
      departmentsList : App.host + '/service/rest/bsu/mmf/department/list',
      departmentCreate: App.host + '/service/rest/bsu/mmf/department/add',
      departmentErase : App.host + '/service/rest/bsu/mmf/department/{departmentId}/delete',
      departmentEdit  : App.host + '/service/rest/bsu/mmf/department/{departmentId}/edit'
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
          userData = {};

      return {
        login          : function (name, password) {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.auth,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(name + ':' + password));
            },
            success   : function (data) {
              console.log(data);
              deferred.resolve();
              authenticated = true;
              userData = data;
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

          return deferred.promise;
        },
        getName        : function () {
          return userData.fullName;
        },
        is             : function (authority) {
          if (userData.authorities && userData.authorities.length) {
            return _.find(userData.authorities, function (auth) {
              return auth.authority == authority;
            });
          }
          return undefined;
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
    factory('ScheduleList',function ($q, $rootScope, rest) {
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
    factory('UsersList',function ($q, $rootScope, rest) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.usersList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
        get   : function () {
          return listCache;
        }
      }
    }).
    factory('StudentsList',function ($q, $rootScope, rest) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.studentsList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
    factory('LecturersList',function ($q, $rootScope, rest) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.lecturersList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
    factory('DepartmentsList', function ($q, $rootScope, rest) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.departmentsList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
              xhr.setRequestHeader('Authorization', 'Basic eWFzdmVka286eWFzdmVka28=');
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
    });
