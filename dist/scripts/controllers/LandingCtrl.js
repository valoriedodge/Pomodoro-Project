(function() {
    function LandingCtrl() {
        this.heroTitle = "The Pomodoro Project";
    }

    angular
        .module('pomodoroProject')
        .controller('LandingCtrl', LandingCtrl);
})();
