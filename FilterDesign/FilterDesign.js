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
    board = JXG.JSXGraph.initBoard('mainbox', {boundingbox:[0, 1.2,20,-1], axis:true});
    return board;
}



$(document).ready(function() {

    $('#parks1').hide();
    $('#window1').hide();
    $('#FIRopen').hide();
    $('#IIRopen').show(); // Show IIR as default
    $('#fir_menu_option').hide();
    $("#parks_mcclellan_menu_option").hide(); // Window shows as default
    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 1.5, Math.PI,-.5]});


    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});

$('#FIR').on("click", function() {
        $('#FIRopen').show();
        $('#IIRopen').hide();
        $('#window1').show();
        $('#parks1').hide();
        $('#fir_menu_option').show();
        $('#iir_menu_option').hide();
    })
$('#IIR').on("click", function() {
    $('#IIRopen').show();
    $('#FIRopen').hide();
    $('#window1').hide();
    $('#parks1').hide();
    $('#fir_menu_option').hide();
    $('#iir_menu_option').show();
    $('#butlow').on("click", function() {
    })
})
$('#window').on("click", function() {
    $('#parks1').hide();
    $('#window1').show();
    $("window_menu_option").show();
    $("parks_mcclellan_menu_option").hide();
    $('#Hannwindow').on("click", function() {
            //default state == lowpass
            JXG.JSXGraph.freeBoard(board);
            board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
            var cutoff = $('#lowwindowcutoff').val();
            var order = $('#lowwindoworder').val();
            var alpha = order/2;
            cutoff = parseInt(cutoff)
            board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
            board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
            board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
            for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                var x = i
                var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                board.create('point', [x, y], {type:'plot'});
            }
            $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            //board.curve = board.create('point', plotData, {type:'plot'});
        $('#lowwindow').on("click", function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
            var cutoff = $('#lowwindowcutoff').val();
            var order = $('#lowwindoworder').val();
            var alpha = order/2;
            cutoff = parseInt(cutoff)
            board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
            board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
            board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
            for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                var x = i
                var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                board.create('point', [x, y], {type:'plot'});
            }
            $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            //board.curve = board.create('point', plotData, {type:'plot'});
        });
        $('#highwindow').on("click", function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
            var cutoff = $('#lowwindowcutoff').val();
            var order = $('#lowwindoworder').val();
            var alpha = order/2;
            cutoff = parseInt(cutoff)
            board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
            board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
            board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
            for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                var x = i
                var y = Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                board.create('point', [x, y], {type:'plot'});
            }
            $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            //board.curve = board.create('point', plotData, {type:'plot'});
        });
        $('#bandpasswindow').on("click", function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
            var cutoff = $('#lowwindowcutoff').val();
            var cutoff2 = $('#lowwindowcutoff2').val();
            cutoff = cutoff*Math.PI
            cutoff2 = cutoff2*Math.PI
            var order = $('#lowwindoworder').val();
            var alpha = order/2;
            cutoff = parseInt(cutoff)
            board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
            board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
            board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
            for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                var x = i
                var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
                board.create('point', [x, y], {type:'plot'});
            }
            $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var cutoff2 = $('#lowwindowcutoff2').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var cutoff2 = $('#lowwindowcutoff2').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindowcutoff2').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var cutoff2 = $('#lowwindowcutoff2').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            //board.curve = board.create('point', plotData, {type:'plot'});
        });
        $('#bandrejectwindow').on("click", function() {
            JXG.JSXGraph.freeBoard(board);
            board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
            var cutoff = $('#lowwindowcutoff').val();
            var cutoff2 = $('#lowwindowcutoff2').val();
            var order = $('#lowwindoworder').val();
            var alpha = order/2;
            cutoff = parseInt(cutoff)
            board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
            board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
            board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
            for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                var x = i
                var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
                board.create('point', [x, y], {type:'plot'});
            }
            $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var cutoff2 = $('#lowwindowcutoff2').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var cutoff2 = $('#lowwindowcutoff2').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindowcutoff2').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var cutoff2 = $('#lowwindowcutoff2').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            //board.curve = board.create('point', plotData, {type:'plot'});
        });
    });
    $('#Rectangularwindow').on("click", function() {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = 1;
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    });
    $('#Bartlettwindow').on("click", function() {
        board.removeObject(board.curve);
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var rem = (order + 1) % 2;
        if (rem == 0)
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = 1;
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    });
    $('#Hammwindow').on("click", function() {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = .54 - .46*Math.cos((2*Math.PI*i)/order);
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    });
    $('#Blackmanwindow').on("click", function() {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = .42 - .5*Math.cos((2*Math.PI*i)/order) + .08*Math.cos((4*Math.PI*i)/order);
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    });
    $('#Gaussianwindow').on("click", function() {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = 1;
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    });
    $('#lowwindow').on("click", function() {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        function f(x) {
            return .5 - 0.5*Math.cos((2*Math.PI*x)/order);
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
    $("#window_menu_option").hide();
    $("#parks_mcclellan_menu_option").show();
})
$('#IIRpress').on("click", function() {
    $('#window1').hide();
    $('#parks1').hide();
    $('#IIR').show();
})
