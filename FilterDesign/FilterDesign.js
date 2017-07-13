var board = {};


// Macro function plotter
function addCurve(board, func, atts) {
    board.removeObject(board.curve)
    board.curve = board.create('functiongraph', [func], atts);
    return;
}

// Simplified plotting of function
function plot(func, atts) {
   if (atts==null) {
      return addCurve(board, func);
   } else {
      return addCurve(board, func, atts);
   }
}

// Usage of the macro
function doIt() {
    eval(document.getElementById('input').value);
}

function clearAll(board) {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('mainbox', {boundingbox:[0, 1.2,4000,-1], axis:true});
    return board;
}



$(document).ready(function() {

    $('#parks1').hide();
    $('#window1').hide();
    $('#FIRopen').hide();
    $('#IIRopen').hide();
    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 1.2, 4000,-1]});


    $('#FIR').on("click", function() {
        $('#FIRopen').show();
        $('#IIRopen').hide();
        $('#window1').hide();
        $('#parks1').hide();
    })
    $('#IIR').on("click", function() {
        $('#IIRopen').show();
        $('#FIRopen').hide();
        $('#window1').hide();
        $('#parks1').hide();
        $('#butlow').on("click", function() {
        })
    })
    $('#window').on("click", function() {
        $('#parks1').hide();
        $('#window1').show();
        $('#highwindow').on("click", function() {
            var cutoff = $('#lowwindowcutoff').val();
            var order = $('#lowwindoworder').val();
            function f(x) {
               return (x/cutoff)/(Math.sqrt(1 + Math.pow(x/cutoff, 2*order)));
            }
            plot(f);
            $('#lowwindowcutoff').on('keyup', function () {
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                function f(x) {
                    return (x/cutoff)/(Math.sqrt(1 + Math.pow(x/cutoff, 2*order)));
                }
                plot(f);
            });
            $('#lowwindoworder').on('keyup', function () {
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                function f(x) {
                    return (x/cutoff)/(Math.sqrt(1 + Math.pow(x/cutoff, 2*order)));
                }
                plot(f);
            });
            $('#lowwindowsamp').on('keyup', function () {
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var samp = $('#lowwindowsamp').val();
                if (samp > 2*cutoff) {
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 1.2, samp,-1]});
                    function f(x) {
                        return (x/cutoff)/(Math.sqrt(1 + Math.pow(x/cutoff, 2*order)));
                    }
                    plot(f);
                }
            });
        })
        $('#lowwindow').on("click", function() {
            var cutoff = $('#lowwindowcutoff').val();
            var order = $('#lowwindoworder').val();
            function f(x) {
               return 1/Math.sqrt(1 + Math.pow(x/cutoff, 2*order));
            }
            plot(f);
            $('#lowwindowcutoff').on('keyup', function () {
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                function f(x) {
                    return 1/Math.sqrt(1 + Math.pow(x/cutoff, 2*order));
                }
                plot(f);
            });
            $('#lowwindoworder').on('keyup', function () {
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                function f(x) {
                    return 1/Math.sqrt(1 + Math.pow(x/cutoff, 2*order));
                }
                plot(f);
            });
            $('#lowwindowsamp').on('keyup', function () {
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var samp = $('#lowwindowsamp').val();
                if (samp > 2*cutoff) {
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 1.2, samp,-1]});
                    function f(x) {
                        return 1/Math.sqrt(1 + Math.pow(x/cutoff, 2*order));
                    }
                    plot(f);
                }
            });
        })
        $('#bandpasswindow').on("click", function() {
        })
        $('#bandrejectwindow').on("click", function() {
        })
    })
    $('#parks').on("click", function() {
        $('#window1').hide();
        $('#parks1').show();
    })
    $('#IIRpress').on("click", function() {
        $('#window1').hide();
        $('#parks1').hide();
        $('#IIR').show();
    })

})