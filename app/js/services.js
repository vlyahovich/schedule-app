'use strict';

/* Services */
App.host = 'http://192.168.1.90:8090';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('scheduleApp.services', []).
    value('version', '0.3.0').
    value('rest', {
      scheduleList: App.host + '/rest/bsu/mmf/schedule/student'
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
      noData             : 'Нет данных',
      noDataFound        : 'Ничего не найдено'
    }).
    value('gridSettings', {
      containment: '.scheduler-handle-wrap',
      handles    : 's, n',
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
    factory('User',function ($q, $http) {
      var authenticated = false,
          userData = {};

      return {
        login          : function (name, password) {
          var deferred = $q.defer();

          // TODO make $http call
          deferred.resolve();
          authenticated = true;
          userData = {
            name: name
          };

          return deferred.promise;
        },
        logout         : function () {
          var deferred = $q.defer();

          // TODO make $http call
          deferred.resolve();
          authenticated = false;
          userData = {};

          return deferred.promise;
        },
        getName        : function () {
          return userData.name;
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
    factory('ScheduleList', function ($q, $http, $log, rest) {
      var listCache;

      return {
        lookup: function (data) {
          var deferred = $q.defer();

          $http({
            method : 'GET',
            url    : rest.scheduleList,
            headers: {
              'Authorization': 'Basic dXNlcjp1c2Vy'
            },
            params : {
              course  : data.course,
              group   : data.group,
              subGroup: data.subGroup
            }
          }).success(function (data, status) {
                listCache = data;
                deferred.resolve(data);
                $log.info(data, status);
              }).error(function (data, status) {
                listCache = null;
                deferred.reject(data);
                $log.error(data, status);
              });
          return deferred.promise;
        },
        get   : function () {
          return listCache;
        }
      }
    });
