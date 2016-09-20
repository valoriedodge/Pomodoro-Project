#The Pomodoro Project

##An Application to Help Improve Productivity

<p align="center">
  <img src="assets/images/PomodoroProjectSmall.png" alt="Pomodoro Project">
</p>

The Pomodoro Project is an application that contains a countdown timer that helps you encapsulate your work/study sessions to help you focus on the task at hand followed by a break session in order to sharpen your senses and improve productivity. The work sessions are set to be 25 minutes while the break sessions are set to be 5 minutes, except every fourth break, which is set to be a 30 minute break.

Also to facilitate and enhance your focus is the ability to create a to-do list on the web application interface. This list is saved to Firebase and will need to be configured with your own credentials in the index.html and saved in a script tag:

````
<script>
  // Initialize Firebase
  var config = {
    apiKey: "yourAPIkey",
    authDomain: "yourFirebaseDomain",
    databaseURL: "yourFirebaseURL",
    storageBucket: "yourFirebase.appspot.com",
    messagingSenderId: "yourSenderId"
  };
  firebase.initializeApp(config);
</script>
````

With Firebase connected, you can add and remove tasks as needed. Having the tasks at hand along with the set timer will help boost you productivity as you are able to focus and apply yourself in measured doses.

----
Built by Valorie with Bloc
