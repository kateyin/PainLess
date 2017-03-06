angular.module('starter.services', ['ionic'])


// Factory for encouragement Popup - after daily recording
.factory("EncouragmentPopups", function ($ionicPopup) {
  var api = {};

  var positiveHeaders = ["Thank you for the data!"];
  var improvementMessages = [
    '<img src="img/up-arrow.png" align="left" />Your productivity is 20% higher',
    '<img src="img/up-arrow.png" align="left" />You\'ve been entering data for 7 days!',
    '<img src="img/down-arrow.png" align="left" />Your pain is 10% lower!',
    '<img src="img/up-arrow.png" align="left" />Your activity is 35% higher!',
    '<img src="img/up-arrow.png" align="left" />You have entered 500 data points. Good job!',
    '<img src="img/down-arrow.png" align="left" />Your pain is 80% lower!',
    '<img src="img/up-arrow.png" align="left" />Your activity is 150% higher!',
    '<img src="img/up-arrow.png" align="left" />Your mood is 50% better. have a great day',
    '<img src="img/up-arrow.png" align="left" />Your mood is 200% improved! Yay!',
    '<img src="img/up-arrow.png" align="left" />You have been recording data for 6 months. Good work!',
    '<img src="img/up-arrow.png" align="left" />You have 1000 data points. Nice job!',
    '<img src="img/up-arrow.png" align="left" />Your productivity is 300% improved. Excellent.',

    '<img src="img/smiley_face_2.png" align="left" />You look nice today',
    '<img src="img/smiley_face_2.png" align="right" />All in all I think you\'re doing great',
    '<img src="img/smiley_face_2.png" align="left" />You\'re the best',
    '<img src="img/smiley_face_2.png" align="right" />Shot bro',
    '<img src="img/smiley_face_2.png" align="left" />You are amazing. remember that',
    '<img src="img/smiley_face_2.png" align="right" />Treat yourself',
    'To do: Keep tracking',
    '<img src="img/smiley_face_2.png" align="right" />You can do this'
  ];

  api.showEncouragement = function ($scope) {
    $scope = $scope.$new();
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: improvementMessages[Math.floor(Math.random() * improvementMessages.length)],
      title: positiveHeaders[Math.floor(Math.random() * positiveHeaders.length)],
      //subTitle: 'Please use normal things',
      //scope: $scope,
      buttons: [
        {
          text: '<b>Continue</b>',
          type: 'button-positive'
        }
      ]
    });
    myPopup.then(function (res) {
      console.log('Tapped!', res);
    });
    //$timeout(function () {
    //  myPopup.close(); //close the popup after 3 seconds for some reason
    //}, 3000);
  };

  return api;

});
