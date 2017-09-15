    var out = 0;
    var alpha = 10/2;
    var plotData = [
      [],
      []
    ];
    for (i = .01; i < Math.PI; i = i + .01) {
        plotData[0][i] = i;
    }
    for (i = .01; i < Math.PI; i = i + .01) {
    /*
        out = Math.PI*(i-alpha);
        console.log("i: " + i)
        console.log("out: " + out + " ");
        plotData[1][i] = Math.sin(1000*Math.PI*(i-alpha)/(Math.PI*(i-alpha)));
        console.log("plotdata: " + plotData[1][i]);
        */
        plotData[1][i] = Math.sin(2*Math.PI*i)/(Math.PI*i)
        console.log("plotData: " + plotData[1][i])
    }
