(function() {
    function LandingCtrl($scope, Timer) {
        this.heroTitle = "The Pomodoro Project";
        this.timer = Timer;
    }

    angular
        .module('pomodoroProject')
        .controller('LandingCtrl', ["$scope", "Timer", LandingCtrl]);
})();
