(function() {
  function Tasks($firebaseArray) {
    var tasks = {};
    var ref = firebase.database().ref().child("tasks");
    tasks.list = $firebaseArray(ref);
    // tasks.newMessageText = "Add a Task";

    tasks.addItem = function(){
      var date = new Date();
      var time = date.getTime();
      tasks.list.$add({
        text: tasks.newMessageText,
        date: time
      });
      tasks.newMessageText = null;
    };

    return tasks;

    }

  angular
    .module('pomodoroProject')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
