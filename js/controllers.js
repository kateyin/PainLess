// Variables
// All global variables here


// Date
var parseDate = function(input) {
    var parts = input.split('/');
    return Date.UTC(parts[2], parts[1] - 1, parts[0]);
  };


// To compile data
  var buildSeries = function() {
    var data = window.localStorage.data ? JSON.parse(window.localStorage.data) : [];

    var series = {};
    series.mood = [];
    series.pain = [];
    series.activity = [];
    series.UserDefined = [];
    series.xAxis = date;
   

    for (var i = 0; i < data.length; i++) {
      var date = parseDate(data[i].Date);
      series.pain.push([date, parseInt(data[i]['Pain slider score'])]);
      series.activity.push([date, parseInt(data[i]['Physical Activity slider score'])]);
      series.mood.push([date, parseInt(data[i]['Mood slider score'])]);
      series.UserDefined.push([date, parseInt(data[i]['User Defined Data'])]);     
    }
      
   return series;
  };




// The start of the modules
angular.module('starter.controllers', [])


// Control for the initial page
.controller('InitialCtrl', function ($scope, $ionicPopup) {
  
  $scope.BaseNote = function() {
       var myPopup = $ionicPopup.show({
      template: "Please tell us a few things about yourself and your symptoms on a standard day",
      title: "This sets up your baseline data",
      scope: $scope,
           buttons: [
        {
          text: '<b>Continue</b>',
          type: 'button-positive'
        }
      ]
    });
  };
})


// Controller for the first-time page
.controller('FirstTimeCtrl', function($scope) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.values = {
      username: window.localStorage.username || [],
      usergender: window.localStorage.usergender || [],
      userage: parseInt(window.localStorage.userage) || 30,
      usermedicalcondition: window.localStorage.usermedicalcondition || [],
      userdrug: window.localStorage.userdrug || [],
    };
  });

  $scope.save = function() {
    window.localStorage.username = $scope.values.username;
    window.localStorage.usergender = $scope.values.usergender;
    window.localStorage.userage = $scope.values.userage;
    window.localStorage.usermedicalcondition = $scope.values.usermedicalcondition;
    window.localStorage.userdrug = $scope.values.userdrug;
  };
})



// Controller for the three first values
.controller('RecordCtrl', function ($scope, $ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
      // visual representation of the slider
    var horiRanges = document.getElementsByClassName("range-horizontal");
    for (var i = 0; i < horiRanges.length; ++i) {
      var slider = horiRanges[i];
      slider.style.width = slider.parentElement.clientHeight + "px";
      slider.style.height = slider.parentElement.clientHeight + "px";
      slider.style["margin-left"] = (-slider.parentElement.clientHeight / 2) + "px";
      //slider.style["margin-top"] = (slider.parentElement.clientHeight / 2 - 60) + "px";
    }
  });
    
 $scope.values = {
    Basepain: window.localStorage.Basepain || 0,
    Baseactivity: window.localStorage.Baseactivity || 0,
    Basemood: window.localStorage.Basemood || 0,
    pain: window.localStorage.pain || 0,
    activity: window.localStorage.activity || 0,
    mood: window.localStorage.mood || 0,
    detailsPain: window.localStorage.detailsPain || [],
    detailsActivity: window.localStorage.detailsActivity || [],
    detailsMood: window.localStorage.detailsMood || [],
      };

    
 $scope.addDetails = function (detailsVarName, nextButtonId) {
    $scope.values[detailsVarName] = $scope.values[detailsVarName] || '';
    var myPopup = $ionicPopup.show({
      template: '<textarea style="border: 1px silver solid;" rows="6" id="inputText">' + $scope.values[detailsVarName] + '</textarea>',
      title: 'What would you like to add?',
      //subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        {
          text: '<b>Cancel</b>',
          type: 'button-negative'
        },
        {                                                                                       
          text: '<b>Save</b>',
          type: 'button-balanced',
          onTap: function (e) {
              $scope.values[detailsVarName] = inputText.value;
            }
          }
      ]
    });
  };

    
 $scope.saveBase = function() {
    window.localStorage.Basepain = $scope.values.Basepain;
    window.localStorage.Baseactivity = $scope.values.Baseactivity;
    window.localStorage.Basemood = $scope.values.Basemood;

    var data = window.localStorage.data ? JSON.parse(window.localStorage.data) : [];
    var d = new Date();
    if (data.length > 0) {
      var dateSplit = data[data.length - 1].Date.split('/');
      d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
      d.setDate(d.getDate() + 1);
    }
      
    data.push({
      uid: 1,
      Date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(),
      Basepain: parseInt($scope.values.Basepain),
      Baseactivity: parseInt($scope.values.Baseactivity),
      Basemood: parseInt($scope.values.Basemood),    
      
     'user': '',
      'Base pain slider score': parseInt($scope.values.Basepain),
      'Base Physical Activity slider score': parseInt($scope.values.Baseactivity),
      'Base Mood slider score': parseInt($scope.values.Basemood),  
    });
      window.localStorage.data = JSON.stringify(data);

    $scope.saveButtonText = 'Saved';
    setTimeout(function() {
      $scope.saveButtonText = 'Save';
      $scope.$apply();
    }, 2000);
        
    }
    
    
$scope.$watch("Basepain", function(newVal){
   $scope.values.pain = $scope.values.Basepain;
})

$scope.$watch("Baseactivity", function(newVal){
   $scope.values.activity = $scope.values.Baseactivity;
})

$scope.$watch("Basemood", function(newVal){
   $scope.values.mood = $scope.values.Basemood;
})

    

  $scope.save = function() {
    window.localStorage.pain = $scope.values.pain;
    window.localStorage.activity = $scope.values.activity;
    window.localStorage.mood = $scope.values.mood;
    window.localStorage.detailsPain = $scope.values.detailsPain;
    window.localStorage.detailsActivity = $scope.values.detailsActivity;
    window.localStorage.detailsMood = $scope.values.detailsMood;
 
    var data = window.localStorage.data ? JSON.parse(window.localStorage.data) : [];
    var d = new Date();
    if (data.length > 0) {
      var dateSplit = data[data.length - 1].Date.split('/');
      d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
      d.setDate(d.getDate() + 1);
    }
      
    data.push({
      uid: 1,
      Date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(),
      pain: parseInt($scope.values.pain),
      activity: parseInt($scope.values.activity),
      mood: parseInt($scope.values.mood),
        

      'user': '',
      'Pain slider score': parseInt($scope.values.pain),
      'Physical Activity slider score': parseInt($scope.values.activity),
      'Mood slider score': parseInt($scope.values.mood),
      'Pain Notes Tell me more': $scope.values.detailsPain,
      'Physical Activity Tell me more': $scope.values.detailsActiity,
      'Mood Notes Tell me more': $scope.values.detailsMood,
    });
      
    window.localStorage.data = JSON.stringify(data);

    $scope.saveButtonText = 'Saved';
    setTimeout(function() {
      $scope.saveButtonText = 'Save';
      $scope.$apply();
    }, 2000);
      
};  
    
     $scope.tryForceTellMeMore = function ($event, currentSetting, detailsVarName, nextButtonId) {
    if (currentSetting >= 8 && !$scope.values[detailsVarName])
    {
      $scope.addDetails(detailsVarName, nextButtonId);
      $event.preventDefault();
    }
  };
})




// Controller for the User Defined variable page
.controller('UserDefinedCtrl', function($scope, $ionicPopup) {

    $scope.values = {
    UserDefinedUnit: window.localStorage.UserDefinedUnit || [],
    UserDefinedTask: window.localStorage.UserDefinedTask || [],
    BaseUserDefined: parseInt(window.localStorage.BaseUserDefined) || [],
    UserDefined: parseInt(window.localStorage.UserDefined) || [],
    detailsUserDefined: window.localStorage.detailsUserDefined || [],
   };
    
 $scope.addDetails = function (detailsVarName, nextButtonId) {
    $scope.values[detailsVarName] = $scope.values[detailsVarName] || '';
    var myPopup = $ionicPopup.show({
      template: '<textarea style="border: 1px silver solid;" rows="6" id="inputText">' + $scope.values[detailsVarName] + '</textarea>',
      title: 'What would you like to add?',
      //subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        {
          text: '<b>Cancel</b>',
          type: 'button-negative'
        },
        {                                                                                       
          text: '<b>Save</b>',
          type: 'button-balanced',
          onTap: function (e) {
              $scope.values[detailsVarName] = inputText.value;
            }
          }
      ]
    });
  };
    
    
  $scope.Basesave = function() {
    window.localStorage.UserDefinedUnit = $scope.values.UserDefinedUnit;
    window.localStorage.UserDefinedTask = $scope.values.UserDefinedTask;
    window.localStorage.BaseUserDefined = $scope.values.BaseUserDefined;
      
       var data = window.localStorage.data ? JSON.parse(window.localStorage.data) : [];
    var d = new Date();
    if (data.length > 0) {
      var dateSplit = data[data.length - 1].Date.split('/');
      d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
      d.setDate(d.getDate() + 1);
    }
      
    data.push({
      uid: 1,
      Date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(),

      'user': '',
      'User Defined Task': $scope.values.UserDefinedTask,
      'User Defined Unit': $scope.values.UserDefinedUnit,
      'User Defined Baseline': $scope.values.BaseUserDefined,
   });
      
      window.localStorage.data = JSON.stringify(data);
      
      
           var myPopup = $ionicPopup.show ({
      template: "Your baseline data will be used to make your daily recording faster!",
      title: "Thank you for providing baseline data",
      scope: $scope,
           buttons: [
        {
          text: '<b>Continue</b>',
          type: 'button-positive'
        }
      ]
    });
  };
    
$scope.$watch("BaseUserDefined", function(newVal){
        $scope.values.UserDefined = $scope.values.BaseUserDefined;
    });
    
$scope.save = function() {
    window.localStorage.UserDefined = $scope.values.UserDefined;
    window.localStorage.detailsUserDefined = $scope.values.detailsUserDefined;
      
        var data = window.localStorage.data ? JSON.parse(window.localStorage.data) : [];
    var d = new Date();
    if (data.length > 0) {
      var dateSplit = data[data.length - 1].Date.split('/');
      d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
      d.setDate(d.getDate() + 1);
    }
      
    data.push({
      uid: 1,
      Date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(),
      'user': '',
      'User Defined Data': $scope.values.UserDefined,
      'User Defined Tell me more': $scope.values.detailsUserDefined,
   });
      
    window.localStorage.data = JSON.stringify(data);
        
       var myPopup = $ionicPopup.show({
      template: "Have a great day!",
      title: "Thank you for recording your symptoms",
      scope: $scope,
           buttons: [
        {
          text: '<b>Continue</b>',
          type: 'button-positive'
        }
      ]
    });
  };
    
    
  })



// Controller for Charts
.controller('ChartsCtrl', function ($scope, $stateParams) {
   $scope.$on('$ionicView.enter', function(e) {
     initChart();
   });

  var initChart = function() {
    $(function() {
      var series = buildSeries();
      activedata = series.pain;
      chart = new Highcharts.Chart({
        chart: {
           renderTo: 'container',
            defaultSeriesType: 'line',
            zoomType: 'x',

        },
        title: {
          text: 'History'
        },
        colors: ['#F4AC1C'],
         xAxis: {            
          type: 'datetime',
            dateTimeLabelFormats: {
                day: '%d %b %Y'
            }
        },
        yAxis: {
          title: {
            text: 'Impact'
          },
          ceiling: 10
        },
        legend: {
          enabled: false
        },
         plotOptions: {
          line: {
                pointPadding: 0,
                allowPointSelect: true,
                getExtremesFromAll: true,
            }
        },
        series: [{
          type: 'line',
          name: 'data',
          data: activedata
        }]
      });
    });
  };

  $scope.ShowPain = function(){
    var series = buildSeries();
    console.log(series.pain);
    var newSeriesOptions = {
      name: "Pain",
      color: '#F4AC1C'
    };
    chart.series[0].update(newSeriesOptions);
    chart.series[0].setData(series.pain);
  };

  $scope.ShowActivity = function(){
    var series = buildSeries();
    var newSeriesOptions = {
      name: "Activity",
      color: '#A7CAFB'
    };
    chart.series[0].update(newSeriesOptions);
    chart.series[0].setData(series.activity);
  };
    
  $scope.ShowMood = function(){
    var series = buildSeries();
    var newSeriesOptions = {
      name: "Mood",
      color: '#4453C7'
    };
    chart.series[0].update(newSeriesOptions);
    chart.series[0].setData(series.mood);
  };

  $scope.ShowUserDefined = function(){
    var series = buildSeries();
    var newSeriesOptions = {
      name: "Impact",
      color: '#15B659'
    };
    chart.series[0].update(newSeriesOptions);
    chart.series[0].setData(series.UserDefined);
  };

})


// Controller for the Setting page
.controller('AccountCtrl', function($scope, $ionicPopup) {
  $scope.settings = {
    winHealthHack: true,
    enableNotifications: localStorage.enableNotifications ? JSON.parse(localStorage.enableNotifications) : false,
    notificationTime: localStorage.notificationTime ? new Date(localStorage.notificationTime) : (new Date(Math.round(Date.now() / (60 * 60 * 1000)) * 60 * 60 * 1000)),
    notificationFrequency: localStorage.notificationFrequency ? JSON.parse(localStorage.notificationFrequency) : 24,
  };

  var sound = typeof device !== 'undefined' && device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';

  $scope.winHealthHackChanged = function() {
    if ($scope.settings.winHealthHack) return;
    setTimeout(function() {
      $scope.settings.winHealthHack = true;
      $scope.$apply();
    }, 700);
  };

  $scope.notificationTimeChanged = function() {
    localStorage.enableNotifications = JSON.stringify($scope.settings.enableNotifications);
    localStorage.notificationTime = JSON.stringify($scope.settings.notificationTime);
    localStorage.notificationFrequency = JSON.stringify($scope.settings.notificationFrequency);

    if (typeof cordova === 'undefined') return;

    cordova.plugins.notification.local.cancel(2, function() {
      // Notification was cancelled
      if ($scope.settings.enableNotifications) {
        console.log('Created notification', $scope.settings.notificationTime, $scope.settings.notificationFrequency * 60);
        cordova.plugins.notification.local.schedule({
          id: 2,
          title: 'PainLess',
          message: 'Reminder: Please tell us how you feel.',
          firstAt: $scope.settings.notificationTime,
          every: $scope.settings.notificationFrequency * 60,
          // sound: sound,
          icon: 'resources/icon.png'
        });
      }
    });


  };
  $scope.toggleNotifications = function() {
    localStorage.enableNotifications = JSON.stringify($scope.settings.enableNotifications);

    var scheduleNotification = function() {
      var date = new Date(Date.now() + 3 * 1000);

      $scope.notificationTimeChanged();

      cordova.plugins.notification.local.schedule({
        id: 1,
        title: 'PainLess',
        message: 'Please tell us how you are doing.',
        at: date,
        // sound: sound,
        icon: 'resources/icon.png'
      });

    };

    if (typeof cordova !== 'undefined' && $scope.settings.enableNotifications) {
      cordova.plugins.notification.local.hasPermission(function(granted) {
        if (!granted) {
          cordova.plugins.notification.local.registerPermission(function(granted) {
            if (!granted) {
              $scope.settings.enableNotifications = false;
              return $scope.toggleNotifications();
            }

            scheduleNotification();
          });
        } else {
          scheduleNotification();
        }
      });
    } else if (typeof cordova !== 'undefined') {
      cordova.plugins.notification.local.cancel(2, function() {
        // Notification was cancelled
      });
    }
  };

 $scope.loadShelly = function () {
   
    var myPopup = $ionicPopup.show({
      template: 'You are about to overwrite your existing data with the pre-loaded sample data set.',
      title: 'Careful!',
      //subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        {
          text: '<b>Cancel</b>',
          type: 'button-negative'
        },
        {
          text: '<b>OK</b>',
          type: 'button-balanced',
          onTap: function() {
    var path = 'data/Shelly.csv';
    $.get(path, function(csv) {
      var data = $.csv.toObjects(csv);
      window.localStorage.data = JSON.stringify(data);

      window.localStorage.username = "Shelly";
      window.localStorage.usergender = "Female";
      window.localStorage.userage = 18;
      window.localStorage.usermedicalcondition = 'Erythromelalgia';
      window.localStorage.userdrug = 'Nurofen Plus';
      window.localStorage.Basepain = 1;
      window.localStorage.Baseactivity = 5;
      window.localStorage.Basemood = 5;
    
    })
  }
        }
      ]
    })

  };

    
  $scope.clearAllData = function() {
      
      var myPopup = $ionicPopup.show({
      template: 'You are about to erase ALL existing data, including baseline data.',
      title: 'Careful!',
      //subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        {
          text: '<b>Cancel</b>',
          type: 'button-negative'
        },
        {
          text: '<b>OK</b>',
          type: 'button-balanced',
          onTap: function() {
                  window.localStorage.clear();
          }    
            
     }
      ]
    })
      
  };

})


// Controller for the Information page
.controller('InfoCtrl', function($scope) {
})





//The following settings are defunct controller settings for pages that are not used in this build. Maybe for the future?

// Controller for the Chats page
.controller('DoctorCtrl', function ($scope, $stateParams, EncouragmentPopups) {
   $scope.$on('$ionicView.enter', function(e) {
     initDoctorChart();
   });
   var initDoctorChart = function() {
    $(function() {
      var series = buildSeries();
      if (series.xAxis.length <8)
      {
          return;
      }
      var thismonthmood = 0;
      var thismonthpain = 0;
      var thismonthactivity = 0;
      var thismonthproductivity = 0;
      var thismonthextreme = 0;

      var lastmonthmood = 0;
      var lastmonthpain = 0;
      var lastmonthactivity = 0;
      var lastmonthproductivity = 0;
      var lastmonthextreme = 0;

      for (var i = series.xAxis.length-6; i<series.xAxis.length-2; i++)
      {
        thismonthmood = thismonthmood + series.weeklymood[i][1]/4;

        thismonthpain = thismonthpain + series.weeklypain[i][1]/4;
        thismonthactivity = thismonthactivity + series.weeklyactivity[i][1]/4;
        thismonthproductivity = thismonthproductivity + series.weeklyproductivity[i][1]/4;
        thismonthextreme =thismonthextreme + series.weeklyextremepain[i][1]/4;
      }



      for (var i = series.xAxis.length-10; i<series.xAxis.length-6; i++)
      {
        lastmonthmood = lastmonthmood + series.weeklymood[i][1]/4;
        lastmonthpain = lastmonthpain + series.weeklypain[i][1]/4;
        lastmonthactivity = lastmonthactivity + series.weeklyactivity[i][1]/4;
        lastmonthproductivity = lastmonthproductivity + series.weeklyproductivity[i][1]/4;
        lastmonthextreme = lastmonthextreme + series.weeklyextremepain[i][1]/4;
  }

      console.log([thismonthpain, thismonthactivity,thismonthproductivity,thismonthmood,thismonthextreme])
      console.log([lastmonthpain, lastmonthactivity,lastmonthproductivity,lastmonthmood,lastmonthextreme])

      activedata = series.weeklypain;
      chart = new Highcharts.Chart({
        chart: {
           renderTo: 'Doctorcontainer',
            defaultSeriesType: 'line',

        },
        title: {
          text: 'Your Last Month'
        },
        colors: ['#4453c7'],
        xAxis: {
          categories: ["Pain","Activity","Productivity","Mood","Extreme Pain"]
        },
        yAxis: {
          title: {
            text: 'Pain Impact'
          },
          ceiling: 10
        },
        legend: {
          enabled: false
        },
         plotOptions: {
           line: {
                pointPadding: 0,
                borderWidth: 0
            }
        },
        series: [{
          type: 'line',
          name: 'Last 4 weeks',
          data: [thismonthpain, thismonthactivity,thismonthproductivity,thismonthmood,thismonthextreme]
        }]
      });

      chart = new Highcharts.Chart({
        chart: {
           renderTo: 'Doctorcontainer2',
            defaultSeriesType: 'line',

        },
        title: {
          text: 'Change since last month'
        },
        colors: ['#F4AC1C'],

        xAxis: {
          categories: ["Pain","Activity","Productivity","Mood","Extreme Pain"]
        },
        yAxis: {
          title: {
            text: 'Pain Impact'
          },
          ceiling: 10
        },
        legend: {
          enabled: false
        },
         plotOptions: {
           line: {
                pointPadding: 0,
                borderWidth: 0
            }
        },
        series: [{
          type: 'line',
          name: 'Last 4 weeks',
          data: [
          thismonthpain - lastmonthpain,
          thismonthactivity - lastmonthactivity,
          thismonthproductivity - lastmonthproductivity,
          thismonthmood - lastmonthmood,
          thismonthextreme - lastmonthextreme
          ]
        }]
      });
    });


  };


})


// Controller for Goal
.controller('GoalsCtrl', function($scope) {
  $scope.$on('$ionicView.enter', function(e) {
    window.location = '#/questions/pain';
  });
})

// Controller for the History page
.controller('HistoryCtrl', function($scope, $stateParams, EncouragmentPopups) {
  $scope.$on('$ionicView.enter', function (e) {
    if ($stateParams.from && $stateParams.from.toLowerCase() == "questionaire") {
      // EncouragmentPopups.showEncouragement($scope);
    }
  });
});



  //   app.controller('myController', function($scope) {
  //   "use strict";
  //   // With "use strict", Dates can be passed ONLY as strings (ISO format: YYYY-MM-DD)
  //   $scope.options = {
  //     defaultDate: "2015-08-06",
  //     minDate: "2015-01-01",
  //     maxDate: "2015-12-31",
  //     disabledDates: [
  //         "2015-06-22",
  //         "2015-07-27",
  //         "2015-08-13",
  //         "2015-08-15"
  //     ],
  //     dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
  //     mondayIsFirstDay: true,//set monday as first day of week. Default is false
  //     eventClick: function(date) {
  //       console.log(date);
  //     },
  //     dateClick: function(date) {
  //       console.log(date);
  //     },
  //     changeMonth: function(month, year) {
  //       console.log(month, year);
  //     },
  //     filteredEventsChange: function(filteredEvents) {
  //       console.log(filteredEvents);
  //     },
  //   };
  //
  //   $scope.events = [
  //     {foo: 'bar', date: "2015-08-18"},
  //     {foo: 'bar', date: "2015-08-20"}
  //   ];
  // });

