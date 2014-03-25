// angular.module('gla')
// .directive(
//     "bnLoad",
//     function() {

// // I bind the DOM events to the scope.
// function link( $scope, element, attributes ) {

// // I evaluate the expression in the currently
// // executing $digest - as such, there is no need
// // to call $apply().
// function handleLoadSync() {

//     logWithPhase( "handleLoad - Sync" );

//     alert("handleLoad - Sync");

//     $scope.$eval( attributes.bnLoad );

// }


// // I evaluate the expression and trigger a
// // subsequent $digest in order to let AngularJS
// // know that a change has taken place.
// function handleLoadAsync() {

//     logWithPhase( "handleLoad - Async" );
//     alert("handleLoad - Async");

//     $scope.$apply(
//         function() {

//             handleLoadSync();

//         }
//         );

// }


// // I log the given value with the current scope
// // phase.
// function logWithPhase( message ) {

//     console.log( message, ":", $scope.$$phase );

// }


// // -------------------------------------- //
// // -------------------------------------- //


// // Check to see if the image has already loaded.
// // If the image was pulled out of the browser
// // cache; or, it was loaded as a Data URI,
// // then there will be no delay before complete.
// if ( element[ 0 ].src && element[ 0 ].complete ) {

//     handleLoadSync();

// // The image will be loaded at some point in the
// // future (ie. asynchronous to link function).
// } else {

//     element.on( "load.bnLoad", handleLoadAsync );

// }


// // For demonstration purposes, let's also listen
// // for the attribute interpolation to see which
// // phase the scope is in.
// attributes.$observe(
//     "src",
//     function( srcAttribute ) {

//         logWithPhase( "$observe : " + srcAttribute );

//     }
//     );


// // For demonstration purposes, let's also watch
// // for changes in the image complete value. NOTE:
// // the directive should NOT know about this model
// // value; but, we are examining life cycles here.
// $scope.$watch(
//     "( image || staticImage ).complete",
//     function( newValue ) {

//         logWithPhase( "$watch : " + newValue );

//     }
//     );


// // -------------------------------------- //
// // -------------------------------------- //


// // When the scope is destroyed, clean up.
// $scope.$on(
//     "$destroy",
//     function() {

//         element.off( "load.bnLoad" );

//     }
//     );

// }


// // Return the directive configuration.
// return({
//     link: link,
//     restrict: "A"
// });

// }
// )