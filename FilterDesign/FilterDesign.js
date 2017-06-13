var filter = {};
var dataX = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1,2,3,4,5,6,7,8];
var dataY = [1, 2, 3, 4, 5, 6, 7, 8];







$(document).ready(function() {


    $('#lowpass').on("click", function() {
        filter = JXG.JSXGraph.initBoard('mainbox', {boundingbox: [-20, 20, 20, -20], axis: true});
        filter.create('curve', [dataX,function(dataX){ return dataX*dataX}],{strokeColor:'blue',strokeWidth:3,dash:1})
    })


})