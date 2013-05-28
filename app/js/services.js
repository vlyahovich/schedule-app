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
      studentGet          : App.host + '/service/rest/bsu/mmf/user/student/{studentId}',
      studentCreate       : App.host + '/service/rest/bsu/mmf/user/student/add',
      studentErase        : App.host + '/service/rest/bsu/mmf/user/student/{studentId}/delete',
      studentEdit         : App.host + '/service/rest/bsu/mmf/user/student/{studentId}/edit',
      lecturersList       : App.host + '/service/rest/bsu/mmf/user/lecturer/list',
      lecturerGet         : App.host + '/service/rest/bsu/mmf/user/lecturer/{lecturerId}',
      lecturerCreate      : App.host + '/service/rest/bsu/mmf/user/lecturer/add',
      lecturerErase       : App.host + '/service/rest/bsu/mmf/user/lecturer/{lecturerId}/delete',
      lecturerEdit        : App.host + '/service/rest/bsu/mmf/user/lecturer/{lecturerId}/edit',
      departmentsList     : App.host + '/service/rest/bsu/mmf/department/list',
      departmentGet       : App.host + '/service/rest/bsu/mmf/department/{departmentId}',
      departmentCreate    : App.host + '/service/rest/bsu/mmf/department/add',
      departmentErase     : App.host + '/service/rest/bsu/mmf/department/{departmentId}/delete',
      departmentEdit      : App.host + '/service/rest/bsu/mmf/department/{departmentId}/edit',
      specialitiesList    : App.host + '/service/rest/bsu/mmf/specialty/list',
      specialityGet       : App.host + '/service/rest/bsu/mmf/specialty/{specialityId}',
      specialityCreate    : App.host + '/service/rest/bsu/mmf/specialty/add',
      specialityErase     : App.host + '/service/rest/bsu/mmf/specialty/{specialityId}/delete',
      specialityEdit      : App.host + '/service/rest/bsu/mmf/specialty/{specialityId}/edit',
      groupsList          : App.host + '/service/rest/bsu/mmf/group/list',
      groupGet            : App.host + '/service/rest/bsu/mmf/group/{groupId}',
      groupCreate         : App.host + '/service/rest/bsu/mmf/group/add',
      groupErase          : App.host + '/service/rest/bsu/mmf/group/{groupId}/delete',
      groupEdit           : App.host + '/service/rest/bsu/mmf/group/{groupId}/edit',
      disciplinesList     : App.host + '/service/rest/bsu/mmf/discipline/list',
      disciplineGet       : App.host + '/service/rest/bsu/mmf/discipline/{disciplineId}',
      disciplineCreate    : App.host + '/service/rest/bsu/mmf/discipline/add',
      disciplineErase     : App.host + '/service/rest/bsu/mmf/discipline/{disciplineId}/delete',
      disciplineEdit      : App.host + '/service/rest/bsu/mmf/discipline/{disciplineId}/edit',
      disciplineTypesList : App.host + '/service/rest/bsu/mmf/disciplineType/list',
      disciplineTypeGet   : App.host + '/service/rest/bsu/mmf/disciplineType/{disciplineTypeId}',
      disciplineTypeCreate: App.host + '/service/rest/bsu/mmf/disciplineType/add',
      disciplineTypeErase : App.host + '/service/rest/bsu/mmf/disciplineType/{disciplineTypeId}/delete',
      disciplineTypeEdit  : App.host + '/service/rest/bsu/mmf/disciplineType/{disciplineTypeId}/edit',
      curriculumsList     : App.host + '/service/rest/bsu/mmf/curriculum/list',
      curriculumGet       : App.host + '/service/rest/bsu/mmf/curriculum/{curriculumId}',
      curriculumCreate    : App.host + '/service/rest/bsu/mmf/curriculum/add',
      curriculumErase     : App.host + '/service/rest/bsu/mmf/curriculum/{curriculumId}/delete',
      curriculumEdit      : App.host + '/service/rest/bsu/mmf/curriculum/{curriculumId}/edit',
      classroomsList      : App.host + '/service/rest/bsu/mmf/classroom/list',
      classroomGet        : App.host + '/service/rest/bsu/mmf/classroom/{classroomId}',
      classroomCreate     : App.host + '/service/rest/bsu/mmf/classroom/add',
      classroomErase      : App.host + '/service/rest/bsu/mmf/classroom/{classroomId}/delete',
      classroomEdit       : App.host + '/service/rest/bsu/mmf/classroom/{classroomId}/edit',
      studiesList         : App.host + '/service/rest/bsu/mmf/study/list',
      studyGet            : App.host + '/service/rest/bsu/mmf/study/{studyId}',
      studyCreate         : App.host + '/service/rest/bsu/mmf/study/add',
      studyErase          : App.host + '/service/rest/bsu/mmf/study/{studyId}/delete',
      studyEdit           : App.host + '/service/rest/bsu/mmf/study/{studyId}/edit',
      timesList           : App.host + '/service/rest/bsu/mmf/disciplineTime/list',
      timeGet             : App.host + '/service/rest/bsu/mmf/disciplineTime/{timeId}',
      timeCreate          : App.host + '/service/rest/bsu/mmf/disciplineTime/add',
      timeErase           : App.host + '/service/rest/bsu/mmf/disciplineTime/{timeId}/delete',
      timeEdit            : App.host + '/service/rest/bsu/mmf/disciplineTime/{timeId}/edit'
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
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.userCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(user),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve(user);
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.userEdit.replace('{userId}', req.id),
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
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.studentCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(student),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve(student);
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.studentEdit.replace('{studentId}', req.id),
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
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.studentGet.replace('{studentId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
                name        : req.name,
                surname     : req.surname,
                patronymic  : req.patronymic,
                login       : req.login,
                password    : req.password,
                departmentId: req.departmentId,
                admin       : req.admin == true
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.lecturerCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(lecturer),
            success    : function (response) {
              getOneFn(response.id);
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
            url        : rest.lecturerErase.replace('{lecturerId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.lecturerEdit.replace('{lecturerId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id          : req.id,
              name        : req.name,
              surname     : req.surname,
              patronymic  : req.patronymic,
              login       : req.login,
              password    : req.password,
              departmentId: req.departmentId,
              admin       : req.admin == true
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.lecturerGet.replace('{lecturerId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.departmentCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(department),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve(department);
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.departmentEdit.replace('{departmentId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id         : req.id,
              name       : req.name,
              description: req.description
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.departmentGet.replace('{departmentId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.specialityCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(speciality),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.specialityEdit.replace('{specialityId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id         : req.id,
              name       : req.name,
              description: req.description
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.specialityGet.replace('{specialityId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              }, getOneFn = this.getOne;

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
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              group = {
                id         : req.id,
                number     : req.number,
                course     : req.course,
                year       : req.year,
                specialtyId: req.specialtyId
              }, getOneFn = this.getOne;

          if (req.subgroup) {
            group.subgroup = req.subgroup;
          }
          $.ajax({
            method     : 'POST',
            url        : rest.groupEdit.replace('{groupId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(group),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.groupGet.replace('{groupId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(discipline),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineEdit.replace('{disciplineId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id              : req.id,
              name            : req.name,
              disciplineTypeId: req.disciplineTypeId
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.disciplineGet.replace('{disciplineId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineTypeCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(disciplineType),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve(disciplineType);
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.disciplineTypeEdit.replace('{disciplineTypeId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id  : req.id,
              type: req.type
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.disciplineTypeGet.replace('{disciplineTypeId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
                disciplineId: req.disciplineId,
                specialtyId : req.specialtyId,
                hours       : req.hours,
                semester    : req.semester,
                exam        : req.exam == true,
                setoff      : req.setoff == true
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.curriculumCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(curriculum),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.curriculumEdit.replace('{curriculumId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id          : req.id,
              disciplineId: req.disciplineId,
              specialtyId : req.specialtyId,
              hours       : req.hours,
              semester    : req.semester,
              exam        : req.exam == true,
              setoff      : req.setoff == true
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.curriculumGet.replace('{curriculumId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.classroomCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(classroom),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.classroomEdit.replace('{classroomId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id      : req.id,
              number  : req.number,
              capacity: req.capacity
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.classroomGet.replace('{classroomId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
    factory('TimesList',function ($q, $rootScope, rest, User) {
      var listCache;

      return {
        lookup: function () {
          var deferred = $q.defer();

          $.ajax({
            url       : rest.timesList,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success   : function (data) {
              listCache = data;
              deferred.resolve(data);
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
        create: function (req) {
          var deferred = $q.defer(),
              time = {
                startTime: req.startTime,
                endTime  : req.endTime,
                number   : req.number,
                breakTime: req.breakTime || 0
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.timeCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(time),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.timeErase.replace('{timeId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function () {
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.timeEdit.replace('{timeId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id       : req.id,
              startTime: req.startTime,
              endTime  : req.endTime,
              number   : req.number,
              breakTime: req.breakTime || 0
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.timeGet.replace('{timeId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
                groupId     : req.groupId,
                lecturerId  : req.lecturerId,
                curriculumId: req.curriculumId
              }, getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.studyCreate,
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify(study),
            success    : function (response) {
              getOneFn(response.id);
              deferred.resolve(study);
              $rootScope.$apply();
            },
            error      : function () {
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
              deferred.reject();
              $rootScope.$apply();
            },
            contentType: 'application/json'
          });

          return deferred.promise;
        },
        edit  : function (req) {
          var deferred = $q.defer(),
              getOneFn = this.getOne;

          $.ajax({
            method     : 'POST',
            url        : rest.studyEdit.replace('{studyId}', req.id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            data       : JSON.stringify({
              id          : req.id,
              groupId     : req.groupId,
              lecturerId  : req.lecturerId,
              curriculumId: req.curriculumId
            }),
            success    : function () {
              getOneFn(req.id);
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
            url        : rest.studyGet.replace('{studyId}', id),
            beforeSend : function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + User.encode());
            },
            success    : function (data) {
              var matched = _.findIndex(listCache, function (elem) {
                return data.id == elem.id;
              });
              if (matched != -1) {
                listCache[matched] = data;
              } else {
                listCache.push(data);
              }
              deferred.resolve();
              $rootScope.$apply();
            },
            error      : function () {
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
