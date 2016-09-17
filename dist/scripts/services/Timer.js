(function() {
     function Timer($rootScope, $interval) {
          var Timer = {};
          var TWENTY_FIVE = 25 * 60;
          var FIVE = 5 * 60;
          var THIRTY = 30 * 60;
          var count = 0, check, breakTime, workSessions = 0;
          Timer.timing = false;
          Timer.stopped = true;
          Timer.onBreak = false;
          Timer.paused = false;

          var mySound = new buzz.sound( "/assets/sounds/Ding.mp3", {
            preload: true
          });

          /**
          * @desc Current time (in seconds) of current countdown
          * @type {Number}
          */
           $rootScope.currentTime = TWENTY_FIVE;

           /**
           * @function startStudy
           * @desc starts the countdown at 25 minuts for study
           */
           Timer.startStudy = function(startBreak){
              count = 0;
              workSessions += 1;
              $rootScope.currentTime = TWENTY_FIVE;
              Timer.timing = true;
              Timer.stopped = false;
              Timer.onBreak = false;
              Timer.paused = false;
              check = $interval(function(){
                count += 1;
               $rootScope.currentTime = $rootScope.currentTime - 60;
               if (count >=25){
                 mySound.play();
                 if (workSessions >= 4){
                   $rootScope.currentTime = THIRTY;
                 } else {
                   $rootScope.currentTime = FIVE;
                 }
                 Timer.timing = false;
                 Timer.paused = true;
                //  Timer.startBreak();
               }
             }, 1000, 25);
           }

           /**
           * @function resetStudy
           * @desc Resets the study time to 25 minutes
           */
           Timer.resetStudy = function() {
              if (angular.isDefined(check)) {
                count = 0;
                workSessions -= 1;
                Timer.timing = false;
                Timer.stopped = true;
                Timer.onBreak = false;
                Timer.paused = false;
                $interval.cancel(check);
                check = undefined;
                $rootScope.currentTime = TWENTY_FIVE;
              }
            };

            /**
            * @function startBreak
            * @desc Starts the break time of 5 or 30 minutes depending on value of workSessions
            */
            Timer.startBreak = function() {
              count = 0;
              Timer.timing = false;
              Timer.stopped = false;
              Timer.paused = false;
              Timer.onBreak = true;
              if (workSessions >= 4){
                $rootScope.currentTime = THIRTY;
                breakTime = $interval(function(){
                  count +=1;
                  $rootScope.currentTime = $rootScope.currentTime - 60;
                  if (count >= 30){
                   mySound.play();
                   $rootScope.currentTime = TWENTY_FIVE;
                   workSessions = 0;
                   Timer.onBreak = false;
                   Timer.stopped = true;
                  }
               }, 1000, 30);
              } else {
                $rootScope.currentTime = FIVE;
                breakTime = $interval(function(){
                  count +=1;
                  $rootScope.currentTime = $rootScope.currentTime - 60;
                  if (count >= 5){
                   mySound.play();
                   $rootScope.currentTime = TWENTY_FIVE;
                   Timer.onBreak = false;
                   Timer.stopped = true;
                  //  Timer.startBreak();
                  }
               }, 1000, 5);
              };
            };

            /**
            * @function resetBreak
            * @desc Resets the breakTime
            */
            Timer.resetBreak = function() {
               if (angular.isDefined(breakTime)) {
                 count = 0;
                 Timer.timing = false;
                 Timer.stopped = false;
                 Timer.onBreak = false;
                 Timer.paused = true;
                 $interval.cancel(breakTime);
                 breakTime = undefined;
                 if (workSessions >= 4){
                   $rootScope.currentTime = THIRTY;
                 } else {
                   $rootScope.currentTime = FIVE;
                 }
               }
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
