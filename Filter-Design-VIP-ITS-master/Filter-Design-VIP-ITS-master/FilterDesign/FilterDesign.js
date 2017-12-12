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

function onFIRIIRSelect(value) {
    if (value === "FIR") {
        $('#IIRopen').hide();
        $('#window1').show();
        $('#parks1').hide();
        $('#windows_parks_mcclellan_span').show();
    } else if (value === "IIR") {
        $("#windows_parks_mcclellan_span").hide();
        $('#parks1').hide();
        $('#window1').hide();
        $('#IIRopen').show();
    }
}

function onWindowClick() {
    $('#parks1').hide();
    $('#window1').show();
}

function onParksMcClellanClick() {
    $('#window1').hide();
    $('#parks1').show();
}

var impule = []

function onHannWindowClick() {
                var window = [];
                var total = [];
                var impulse = [];
                var fft;
                //default state == lowpass
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                    y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                /*$('#lowpass1').on("click", function() {
                    var img = []
                    JXG.JSXGraph.freeBoard(board);
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 0, sampling/2, -120]});
                    console.log("total: " + total);
                    var fft = new FFT(8192,sampling);
                    fft.forward(total);
                    var spectrum = fft.spectrum;
		            var brd = JXG.JSXGraph.initBoard('jsxboxMag', {boundingbox: [-1, 0.1, fft.spectrum.length/4, -0.1], axis:true}),
                    console.log("newtotal: " + total);
                });*/
                $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindow_fsamp').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
            });
}

function onRectangularWindowClick() {
                var window = [];
                var total = [];
                var impulse = [];
                var fft;
                //default state == lowpass
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = 1;
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                /*$('#lowpass1').on("click", function() {
                    var img = []
                    JXG.JSXGraph.freeBoard(board);
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 0, sampling/2, -120]});
                    console.log("total: " + total);
                    var fft = new FFT(8192,sampling);
                    fft.forward(total);
                    var spectrum = fft.spectrum;
		            var brd = JXG.JSXGraph.initBoard('jsxboxMag', {boundingbox: [-1, 0.1, fft.spectrum.length/4, -0.1], axis:true}),
                    console.log("newtotal: " + total);
                });*/
                $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = 1;
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = 1;
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindow_fsamp').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = 1;
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
            });
}

function onBartlettWindowClick() {
                var window = [];
                var total = [];
                var impulse = [];
                var fft;
                //default state == lowpass
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                /*$('#lowpass1').on("click", function() {
                    var img = []
                    JXG.JSXGraph.freeBoard(board);
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 0, sampling/2, -120]});
                    console.log("total: " + total);
                    var fft = new FFT(8192,sampling);
                    fft.forward(total);
                    var spectrum = fft.spectrum;
		            var brd = JXG.JSXGraph.initBoard('jsxboxMag', {boundingbox: [-1, 0.1, fft.spectrum.length/4, -0.1], axis:true}),
                    console.log("newtotal: " + total);
                });*/
                $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindow_fsamp').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
            });
}

function onHammingWindowClick() {
                var window = [];
                var total = [];
                var impulse = [];
                var fft;
                //default state == lowpass
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .54 - .46*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                /*$('#lowpass1').on("click", function() {
                    var img = []
                    JXG.JSXGraph.freeBoard(board);
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 0, sampling/2, -120]});
                    console.log("total: " + total);
                    var fft = new FFT(8192,sampling);
                    fft.forward(total);
                    var spectrum = fft.spectrum;
		            var brd = JXG.JSXGraph.initBoard('jsxboxMag', {boundingbox: [-1, 0.1, fft.spectrum.length/4, -0.1], axis:true}),
                    console.log("newtotal: " + total);
                });*/
                $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .54 - .46*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .54 - .46*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindow_fsamp').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .54 - .46*Math.cos((2*Math.PI*i)/order);
                    board.create('point', [i, window[i]], {type:'plot', strokeColor: 'green'});
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
            });
}

function onBlackmanWindowClick() {
                var window = [];
                var total = [];
                var impulse = [];
                var fft;
                //default state == lowpass
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = 0.42-(0.5*cos((2*i*pi)/order))+(0.08*cos((4*pi*i)/order));
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                /*$('#lowpass1').on("click", function() {
                    var img = []
                    JXG.JSXGraph.freeBoard(board);
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 0, sampling/2, -120]});
                    console.log("total: " + total);
                    var fft = new FFT(8192,sampling);
                    fft.forward(total);
                    var spectrum = fft.spectrum;
		            var brd = JXG.JSXGraph.initBoard('jsxboxMag', {boundingbox: [-1, 0.1, fft.spectrum.length/4, -0.1], axis:true}),
                    console.log("newtotal: " + total);
                });*/
                $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = 0.42-(0.5*cos((2*i*pi)/order))+(0.08*cos((4*pi*i)/order));
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    window[i] = 0.42-(0.5*cos((2*i*pi)/order))+(0.08*cos((4*pi*i)/order));
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindow_fsamp').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = 0.42-(0.5*cos((2*i*pi)/order))+(0.08*cos((4*pi*i)/order));
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
            });
}

function onGaussianWindowClick() {
                var window = [];
                var total = [];
                var impulse = [];
                var fft;
                //default state == lowpass
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                /*$('#lowpass1').on("click", function() {
                    var img = []
                    JXG.JSXGraph.freeBoard(board);
                    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 0, sampling/2, -120]});
                    console.log("total: " + total);
                    var fft = new FFT(8192,sampling);
                    fft.forward(total);
                    var spectrum = fft.spectrum;
		            var brd = JXG.JSXGraph.initBoard('jsxboxMag', {boundingbox: [-1, 0.1, fft.spectrum.length/4, -0.1], axis:true}),
                    console.log("newtotal: " + total);
                });*/
                $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
                });
                $('#lowwindow_fsamp').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var sampling = $('#lowwindow_fsamp').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff);
                var wc = cutoff/(sampling*2);
                window = [];
                for (i = 0; i <= order; i = i + 1) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    window[i] = .5 - .5*Math.cos((2*Math.PI*i)/order);
                }
                board.setBoundingBox([0, 1, order, -1])
                board.create('axis',[[0,0],[order,0]],{strokeColor:'red'});
                board.create('axis',[[0, -1],[0, 1]],{strokeColor:'red'});
                impulse = [];
                for (i = 0; i <= order; i = i + 1) {
                    var x = i;
                    var y;
                    var y = Math.sin(2*Math.PI*(wc)*(i - alpha))/(Math.PI*(i - alpha));
                    impulse[i] = y;
                    total[i] = impulse[i]*window[i];
                    board.create('point', [x, y], {type:'plot'});
                }
                var y = 0;
                if (order % 2 == 0) {
                	y = wc*Math.PI/1.5
                }
                var x = order/2;
                board.create('point', [x, y], {type:'plot'});
                for (i = 0; i < impulse.length; i++) {
                    console.log("i: " + i);
                    console.log("window: " + window[i]);
                    console.log("impulse: " + impulse[i]);
                    total[i] = window[i]*impulse[i];  //filter coefficients
                }
            });
}

function onSineClick() {
     var bufferSize = 1024
     var f1 = 100;
     var f2 = 300;
     var fs = 1000
     var T = 1/fs
     var L = 1000
     t = []
     func = []
     for (i = 0; i < 1024; i++) {
        t[i] = i/fs;
     }
     for (i = 0; i < t.length; i++) {
         func[i] = .7*Math.sin(2*Math.PI*50*t[i]) + Math.sin(2*Math.PI*120*t[i]);
     }
    console.log("func: " + func);

          var fft  = new FFT(bufferSize, fs);
            fft.forward(func);

            console.log("spectrum: " + fft.spectrum);
            var spectrum = fft.spectrum;
            var freqs = new Array (fft.spectrum.length);
            var mags  = new Array (fft.spectrum.length);
            console.log("freqs: " + freqs);
            console.log("mags: " + mags);

            var n;
            for (n = 0; n < fft.spectrum.length; n++){
                freqs[n] = n+1;
                mags[n]  = spectrum[n];
            }
                JXG.JSXGraph.freeBoard(board);
            board = JXG.JSXGraph.initBoard('mainbox', {boundingbox: [-1, 1, fft.spectrum.length/2, -0.1], axis:true}),

	  board.create('curve', [freqs,mags],{strokeColor:'red',strokeWidth:3});
}

function onLowWindowClick() {
}

function onAutoOrderClick() {

}

function onSetOrderClick()  {

}

function onButterworthLowpassClick() {

}

function onButterworthHighpassClick() {

}

function onButterworthBandpassClick() {

}

function onButterworthBandrejectClick() {

}

$(document).ready(function() {

    $('#IIRopen').hide();
    $('#window1').show();
    $('#parks1').hide();
    $('#windows_parks_mcclellan_span').show();

    $('#Impulseresponse').on('click', function() {
        alert("click");
    })


    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
    onHannWindowClick();

    $('#fir_iir_selector').change(function() {
            onFIRIIRSelect($(this).val());
    });

    $('#windows_parks_mcclellan_selector').change(function() {
        var value = $(this).val();

        if (value === "window") {
            onWindowClick();
        } else if (value === "parks_mcclellan") {
            onParksMcClellanClick();
        }
    });

    $('#window_window_selector').change(function() {
        var value = $(this).val();

        if (value === "rectangular_window") {
            onRectangularWindowClick()
        } else if (value === "bartlett_window") {
            onRectangularWindowClick()
        } else if (value === "hann_window") {
            onHannWindowClick();
        } else if (value === "blackman_window") {
            onBlackmanWindowClick();
        } else if (value === "gaussian_window") {
            onGaussianWindowClick();
        } else if (value === "sine") {
            onSineClick();
        } else if (value === "hamming_window") {
            onHammingWindowClick
        }
    });

    $("#iir_filter_type_selector").change(function() {
        var value = $(this).val();

        if (value === "butterworth_lowpass") {
            onLowpassClick();
        } else if (value === "butterworth_highpass") {
            onHighpassClick();
        } else if (value === "butterworth_bandpass") {
            onBandpassClick();
        } else if (value === "butterworth_bandreject") {
            onBandrejectClick();
        }
    });

    $('#parks_order_type_selector').change(function() {
        var value = $(this).val();

        if (value === "auto_order") {
            onAutoOrderClick();
        } else if (value === "setorder") {
            onSetOrderClick();
        }
    });

    $('#iir_order_type_selector').change(function() {
        var value = $(this).val();

        if (value === "auto_order") {
            onAutoOrderClick();
        } else if (value === "setorder") {
            onSetOrderClick();
        }
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

});
