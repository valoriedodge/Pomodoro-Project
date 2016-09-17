(function() {
    function LandingCtrl(Timer) {
        this.heroTitle = "The Pomodoro Project";
        this.timer = Timer;
    }

    angular
        .module('pomodoroProject')
        .controller('LandingCtrl', ["Timer", LandingCtrl]);
})();
