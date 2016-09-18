(function() {
    function LandingCtrl(Timer, Tasks) {
        this.heroTitle = "The Pomodoro Project";
        this.timer = Timer;
        this.tasks = Tasks
    }

    angular
        .module('pomodoroProject')
        .controller('LandingCtrl', ["Timer", "Tasks", LandingCtrl]);
})();
