var playersControllers = angular.module('players_controller', ["players_service"]);

playersControllers.config(['$routeProvider',
  function($routeProvider) {
   $routeProvider.
      when('/country', {
        templateUrl: 'html/widget.html',
        controller : 'player_origin_country',
        reloadOnSearch: false
      }).
      when('/state', {
        templateUrl: 'html/widget.html',
        controller : 'player_origin_state',
        reloadOnSearch: false
      }).
      when('/city', {
        templateUrl: 'html/widget.html',
        controller : 'player_origin_city',
        reloadOnSearch: false
      }).
      when('/physical_attributes_weight', {
        templateUrl: 'html/widget.html',
        controller : 'player_weight_group_controller',
        reloadOnSearch: false
      }).
      when('/physical_attributes_height', {
        templateUrl: 'html/widget.html',
        controller : 'player_height_group_controller',
        reloadOnSearch: false
      }).
      when('/physical_attributes_batting_weight', {
        templateUrl: 'html/widget.html',
        controller : 'player_batting_weight_group_controller',
        reloadOnSearch: false
      }).
      when('/physical_attributes_batting_height', {
        templateUrl: 'html/widget.html',
        controller : 'player_batting_height_group_controller',
        reloadOnSearch: false
      })
      // .
      // when('/city', {
      //   templateUrl: 'html/players.html'
      // }).
      // when('/school', {
      //   templateUrl: 'html/salaries.html'
      // }).
      // when('/country', {
      //   templateUrl: 'html/support.html'
      // })
  }]);

playersControllers.controller('player_origin_country', 
    function($log, $scope, origin,$location) {
      $scope.categories = [{link:'country',label:'Country',active:true},
                          {link:'state',label:'State'}];
      $scope.fields = [];
      $scope.title = 'Player birth country';
      $scope.parseData = function(payload,selectedTeams,startYear,endYear,field){
        $scope.data = parsePlayerOriginData(payload,'Country');
      };
      $scope.fetchDataService = origin.getPlayerBirthCountryStats;
      $scope.drawChart = function(){
        console.log($scope.data);
        drawMapWithArray($scope.data,'chart_div',$scope.title);
        drawTableWithArray($scope.data,'table_div');
      }
  });

playersControllers.controller('player_origin_state', 
    function($log, $scope, origin,$location) {
      $scope.categories = [{link:'country',label:'Country'},
                          {link:'state',label:'State',active:true}];
      $scope.fields = [];
      $scope.title = 'Player birth state';
      $scope.parseData = function(payload,selectedTeams,startYear,endYear,field){
        $scope.data = parsePlayerOriginData(payload,'State');
      };
      $scope.fetchDataService = origin.getPlayerBirthStateStats;
      $scope.drawChart = function(){
        console.log($scope.data);
        drawMapWithArray($scope.data,'chart_div',$scope.title,'US');
        drawTableWithArray($scope.data,'table_div');
      }
  });

playersControllers.controller('player_physical_attributes_controller', 
    function($log, $scope, origin,$location) {
      $scope.categories = [{link:'country',label:'Country'},
                          {link:'state',label:'State',active:true}];
      $scope.fields = [];
      $scope.title = 'Player weight group';
      $scope.parseData = function(payload,selectedTeams,startYear,endYear,field){
        $scope.data = parsePlayerOriginData(payload,'State');
      };
      $scope.fetchDataService = origin.getPlayerWeightGroup;
      $scope.drawChart = function(){
        console.log($scope.data);
        drawBarChart($scope.data,'chart_div',$scope.title,'');
        drawTableWithArray($scope.data,'table_div');
      }
  });

playersControllers.controller('player_batting_weight_group_controller', 
    function($log, $scope, origin,$location) {
      $scope.categories = [{link:'physical_attributes_batting_weight',label:'Batting weight group',active:true},
                          {link:'physical_attributes_batting_height',label:'Batting height group'}];
      $scope.fields = [{field:0,label:'Players'},
      {field:1,label:'Runs'},
      {field:2,label:'Homeruns'}];
      $scope.field = 0;
      $scope.title = 'Player weight group';
      $scope.parseData = function(payload,selectedTeams,startYear,endYear,field){
        $scope.data = parsePlayerAttributeData(payload,'Weight',field,$scope.fields[$scope.field].label);
      };
      $scope.fetchDataService = origin.getPlayerWeightGroup;
      $scope.drawChart = function(){
        console.log($scope.data);
        drawBarChart($scope.data,'chart_div',$scope.title,'');
        drawTableWithArray($scope.data,'table_div');
      }
  });

playersControllers.controller('player_batting_height_group_controller', 
    function($log, $scope, origin,$location) {
        $scope.categories = [{link:'physical_attributes_batting_weight',label:'Batting weight group'},
                          {link:'physical_attributes_batting_height',label:'Batting height group',active:true}];
      $scope.fields = [{field:0,label:'Players'},
      {field:1,label:'Runs'},
      {field:2,label:'Homeruns'}];
      $scope.field = 0;
      $scope.title = 'Player height group';
      $scope.parseData = function(payload,selectedTeams,startYear,endYear,field){
        $scope.data = parsePlayerAttributeData(payload,'Height',field,$scope.fields[$scope.field].label);
      };
      $scope.fetchDataService = origin.getPlayerHeightGroup;
      $scope.drawChart = function(){
        console.log($scope.data);
        drawBarChart($scope.data,'chart_div',$scope.title,'');
        drawTableWithArray($scope.data,'table_div');
      }
  });

// playersControllers.controller('player_origin_city', 
//     function($log, $scope, origin,$location) {
//       $scope.categories = [{link:'county',label:'Country'},
//                           {link:'state',label:'State'},
//                           {link:'city',label:'City',active:true}];
//       $scope.fields = [];
//       $scope.title = 'Player birth city';
//       $scope.parseData = function(payload,selectedTeams,startYear,endYear,field){
//         $scope.data = parsePlayerOriginData(payload,'City');
//       };
//       $scope.fetchDataService = origin.getPlayerBirthCityStats;
//       $scope.drawChart = function(){
//         console.log($scope.data);
//         drawMapWithArray($scope.data,'chart_div',$scope.title,'US');
//         drawTableWithArray($scope.data,'table_div');
//       }
//   });