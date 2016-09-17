(function() {
     function Timer($rootScope, $interval) {
          var Timer = {};
          var TwentyFive = 25 * 60;
          var check;
          Timer.timing = false;
          Timer.stopped = true;

          /**
          * @desc Current time (in seconds) of currently countdown
          * @type {Number}
          */
           $rootScope.currentTime = TwentyFive;

           Timer.startStudy = function(){
            //  if ( angular.isDefined(check) ) return;
              Timer.timing = true;
              Timer.stopped = false;
              check = $interval(function(){
               $rootScope.currentTime = $rootScope.currentTime - 1;
              }, 1000, TwentyFive);
           }

           Timer.resetStudy = function() {
              if (angular.isDefined(check)) {
                Timer.timing = false;
                Timer.stopped = true;
                $interval.cancel(check);
                check = undefined;
                $rootScope.currentTime = TwentyFive;
              }
            };

            Timer.stopStudy = function() {
              $interval.cancel(check);
              // check = undefined;
            };

            // $scope.$on('$destroy', function() {
            //   // Make sure that the interval is destroyed too
            //   Timer.stopStudy();
            // });

          return Timer;
     }

     angular
         .module('pomodoroProject')
         .factory('Timer', ['$rootScope', '$interval', Timer]);
 })();
