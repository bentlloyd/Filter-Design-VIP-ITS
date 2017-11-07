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

function onHannWindowClick() {
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
            var x = i
            var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
            board.create('point', [x, y], {type:'plot'});
        }
    });
}

function onRectangularWindowClick() {
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
}

function onBartlettWindowClick() {
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
}

function onHammingWindowClick() {
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
}

function onBlackmanWindowClick() {
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
}

function onGaussianWindowClick() {

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
}

function onLowWindowClick() {
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
            onRectangularWindowClick();
        } else if (value === "bartlett_window") {
            onBartlettWindowClick();
        } else if (value === "hann_window") {
            onHannWindowClick();
        } else if (value === "blackman_window") {
            onBlackmanWindowClick();
        } else if (value === "gaussian_window") {
            onGaussianWindowClick();
        }
    });

    $("#iir_filter_type_selector").change(function() {
        var value = $(this).val();

        if (value === "butterworth_lowpass") {
            onButterworthLowpassClick();
        } else if (value === "butterworth_highpass") {
            onButterworthHighpassClick();
        } else if (value === "butterworth_bandpass") {
            onButterworthBandpassClick();
        } else if (value === "butterworth_bandreject") {
            onButterworthBandrejectClick();
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
