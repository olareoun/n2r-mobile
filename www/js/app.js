angular.module('gla', ['ionic'])
.controller('GlaCtrl', function($scope, $http, $timeout, $ionicModal, SlideShows, Backend) {

  var createSlideShow = function(slideShowTitle) {
    var newSlideShow = SlideShows.newSlideShow(slideShowTitle);
    $scope.slideShows.push(newSlideShow);
    SlideShows.save($scope.slideShows);
    $scope.selectSlideShow(newSlideShow, $scope.slideShows.length-1);
  };

  $scope.slide = {};
  $scope.slide.elements = [];
  $scope.slide.valid = false;

  $scope.myform = {};
  $scope.myform.title = "";
  $scope.myform.content = "";

  $scope.slideShows = SlideShows.all();

  $scope.activeSlideShow = $scope.slideShows[SlideShows.getLastActiveIndex()];

  $scope.hideElementOptions = false;

  $scope.createDisabled = function(){
    return !$scope.slide.valid;
  };

  $scope.addTitle = function(){
    $scope.hideElementOptions = false;
    $scope.slide.valid = true;
    $scope.slide.elements.push({type: 'title', source: $scope.myform.title});
    $scope.myform.title = "";
    $scope.titleInput.display = false;
  };

  $scope.quitTitle = function(){
    $scope.myform.title = "";
    $scope.titleInput.display = false;
    $scope.hideElementOptions = false;
  };

  $scope.addContent = function(){
    $scope.hideElementOptions = false;
    $scope.slide.elements.push({type: 'content', source: $scope.myform.content});
    $scope.myform.content = "";
    $scope.contentInput.display = false;
  };

  $scope.quitContent = function(){
    $scope.myform.content = "";
    $scope.contentInput.display = false;
    $scope.hideElementOptions = false;
  };

  $scope.titleInput = {};
  $scope.titleInput.display = false;

  $scope.showTitle = function(){
    $scope.hideElementOptions = true;
    $scope.titleInput.display = true;
    $scope.contentInput.display = false;
  };

  $scope.contentInput = {};
  $scope.contentInput.display = false;

  $scope.showContent = function(){
    $scope.hideElementOptions = true;
    $scope.titleInput.display = false;
    $scope.contentInput.display = true;
  };

  $scope.deleteSlide = function(slide){
    var index = $scope.activeSlideShow.slides.indexOf(slide);
    $scope.activeSlideShow.slides.splice(index, 1);
  };

  $scope.deleteElement = function(element){
    var index = $scope.slide.elements.indexOf(element);
    $scope.slide.elements.splice(index, 1);
  };

  $scope.isActive = function(slideShow){
    return $scope.activeSlideShow == slideShow;
  };

  $scope.newSlideShow = function() {
    var slideShowTitle = prompt('SlideShow name');
    if(slideShowTitle) {
      createSlideShow(slideShowTitle);
    }
  };

  $scope.deleteSlideShow = function(slideShow){
    var index = $scope.slideShows.indexOf(slideShow);
    $scope.slideShows.splice(index, 1);
    SlideShows.save($scope.slideShows);
    if (SlideShows.getLastActiveIndex() == index){
      $scope.selectSlideShow($scope.slideShows[$scope.slideShows.length - 1], $scope.slideShows.length - 1);
    }
  };

  $scope.selectSlideShow = function(slideShow, index) {
    $scope.activeSlideShow = slideShow;
    SlideShows.setLastActiveIndex(index);
    $scope.sideMenuController.close();
  };

  $ionicModal.fromTemplateUrl('templates/new-slide.html', function(modal) {
    $scope.slideModal = modal;
  }, {
    scope: $scope
  });

  $scope.createSlide = function() {
    if(!$scope.activeSlideShow || !$scope.slide) {
      return;
    }
    $scope.activeSlideShow.slides.push({
      elements: $scope.slide.elements
    });
    $scope.slideModal.hide();

    SlideShows.save($scope.slideShows);

    $scope.slide.elements = [];
    $scope.hideElementOptions = false;
    $scope.slide.valid = false;
  };

  $scope.generate = function(){
    var notes = $scope.activeSlideShow.slides.map(function(note){
      var json = {};
      json["elements"] = note.elements;
      return json;
    });

    var callbacks = {
      success: function(id){
        window.open(Backend.getUrl(id), '_blank', 'location=no');
      },
      error: function(){
        alert("Se ha producido un error!!");
      }
    }

    Backend.generate(notes, callbacks);
  };

  $scope.newSlide = function() {
    $scope.slideModal.show();
  };

  $scope.closeNewSlide = function() {
    $scope.slideModal.hide();
    $scope.slide.elements = [];
    $scope.hideElementOptions = false;
    $scope.slide.valid = false;
    $scope.myform.title = "";
    $scope.myform.content = "";
    $scope.titleInput.display = false;
    $scope.contentInput.display = false;
  };

  $scope.toggleSlideShows = function() {
    $scope.sideMenuController.toggleLeft();
  };

  $scope.onPhotoDataSuccess = function(imageData) {
      $scope.$apply(function(){
        $scope.slide.elements.push({ type: 'image', source: "data:image/jpeg;base64," + imageData });
      });
  };

  $scope.capturePhoto = function() {
    navigator.camera.getPicture($scope.onPhotoDataSuccess, $scope.onFail, { quality: 10,
      targetWidth: 500,
      targetHeight: 500,
      encodingType: Camera.EncodingType.PNG,
      allowEdit: false,
      destinationType: navigator.camera.DestinationType.DATA_URL });
  };

  $scope.getPhoto = function(source) {
    navigator.camera.getPicture($scope.onPhotoURISuccess, $scope.onFail, { quality: 10,
      encodingType: Camera.EncodingType.PNG,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: source });
  };

  $scope.onFail = function(message) {
    alert('Failed because: ' + message);
  };

});
