var team_service  = angular.module('team_service', []);

team_service.factory('performance', function($http) {
    return {
      getTeamPerformances: function(teams,startYear,endYear) {
      	var promise = $http.get(global.end_points.base_url+global.end_points.teams.performance+
          '?teams='+teams+'&startYear='+startYear+'&endYear='+endYear);
        return promise;
      }
    }
  });