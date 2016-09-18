(function() {
  function Tasks($firebaseArray) {
    var tasks = {};
    var ref = firebase.database().ref().child("tasks");
    tasks.list = $firebaseArray(ref);
    // tasks.newMessageText = "Add a Task";
    tasks.addItem = function(){
      tasks.list.$add({
        text: tasks.newMessageText
      });
      tasks.newMessageText = null;
    };

    // tasks.remove = function(item){
    //   tasks.list
    // }

    return tasks;
      // return {
      //   all: tasks
      //   add:
      //   // remaining logic for tasks
      // };
    }

  angular
    .module('pomodoroProject')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();


// $scope.messages = $firebaseArray(ref);
//   // add new items to the array
//   // the message is automatically added to our Firebase database!
//   $scope.addMessage = function() {
//     $scope.messages.$add({
//       text: $scope.newMessageText
//     });
//   };
