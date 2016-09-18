(function() {
     function Timer($rootScope, $interval) {
          var timer = {};
          var TWENTY_FIVE_MINUTES = 25 * 60;
          var FIVE_MINUTES = 5 * 60;
          var THIRTY_MINUTES = 30 * 60;
          var count = 0, check, breakTime, workSessions = 0;
          timer.timing = false;
          timer.stopped = true;
          timer.onBreak = false;
          timer.paused = false;

          var mySound = new buzz.sound( "/assets/sounds/Ding.mp3", {
            preload: true
          });

          // var _minutes = function(value){
          //   return value * 60;
          // }

          /**
          * @desc Current time (in seconds) of current countdown
          * @type {Number}
          */
           $rootScope.currentTime = TWENTY_FIVE_MINUTES;


           /**
           * @function startStudy
           * @desc starts the countdown at 25 minuts for study
           */
           timer.startStudy = function(startBreak){
              count = 0;
              workSessions += 1;
              $rootScope.currentTime = TWENTY_FIVE_MINUTES;
              timer.timing = true;
              timer.stopped = false;
              timer.onBreak = false;
              timer.paused = false;
              check = $interval(function(){
                count += 1;
               $rootScope.currentTime = $rootScope.currentTime - 60;
               if (count >=25){
                 mySound.play();
                 if (workSessions >= 4){
                   $rootScope.currentTime = THIRTY_MINUTES;
                 } else {
                   $rootScope.currentTime = FIVE_MINUTES;
                 }
                 timer.timing = false;
                 timer.paused = true;
                //  timer.startBreak();
               }
             }, 1000, 25);
           }

           /**
           * @function resetStudy
           * @desc Resets the study time to 25 minutes
           */
           timer.resetStudy = function() {
              if (angular.isDefined(check)) {
                count = 0;
                workSessions -= 1;
                timer.timing = false;
                timer.stopped = true;
                timer.onBreak = false;
                timer.paused = false;
                $interval.cancel(check);
                check = undefined;
                $rootScope.currentTime = TWENTY_FIVE_MINUTES;
              }
            };

            /**
            * @function startBreak
            * @desc Starts the break time of 5 or 30 minutes depending on value of workSessions
            */
            timer.startBreak = function() {
              count = 0;
              timer.timing = false;
              timer.stopped = false;
              timer.paused = false;
              timer.onBreak = true;
              if (workSessions >= 4){
                $rootScope.currentTime = THIRTY_MINUTES;
                breakTime = $interval(function(){
                  count +=1;
                  $rootScope.currentTime = $rootScope.currentTime - 60;
                  if (count >= 30){
                   mySound.play();
                   $rootScope.currentTime = TWENTY_FIVE_MINUTES;
                   workSessions = 0;
                   timer.onBreak = false;
                   timer.stopped = true;
                  }
               }, 1000, 30);
              } else {
                $rootScope.currentTime = FIVE_MINUTES;
                breakTime = $interval(function(){
                  count +=1;
                  $rootScope.currentTime = $rootScope.currentTime - 60;
                  if (count >= 5){
                   mySound.play();
                   $rootScope.currentTime = TWENTY_FIVE_MINUTES;
                   timer.onBreak = false;
                   timer.stopped = true;
                  //  timer.startBreak();
                  }
               }, 1000, 5);
              };
            };

            /**
            * @function resetBreak
            * @desc Resets the breakTime
            */
            timer.resetBreak = function() {
               if (angular.isDefined(breakTime)) {
                 count = 0;
                 timer.timing = false;
                 timer.stopped = false;
                 timer.onBreak = false;
                 timer.paused = true;
                 $interval.cancel(breakTime);
                 breakTime = undefined;
                 if (workSessions >= 4){
                   $rootScope.currentTime = THIRTY_MINUTES;
                 } else {
                   $rootScope.currentTime = FIVE_MINUTES;
                 }
               }
             };

            // $scope.$on('$destroy', function() {
            //   // Make sure that the interval is destroyed too
            //   timer.stopStudy();
            // });

          return timer;
     }

     angular
         .module('pomodoroProject')
         .factory('Timer', ['$rootScope', '$interval', Timer]);
 })();
