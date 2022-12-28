class DifferentialEquation {
    constructor() {
        this.t = [];
        this.approx = [];
    }

    f(x, y) {
        return 0.4 * y - 0.1 * x * Math.sqrt(y);
    }

    exactSolution(x) {
        return ((x+5)/4 + 3/4*Math.exp(0.2*x))**2; 
    }

    // displayValue() {
    //     for(let i=0; i<this.t.length; i++) {
    //         let t_i = this.t[i];
    //         t_i = Math.round(t_i * 100)/100;
    //         console.log(t_i + " " + this.approx[i] + " " + this.exactSolution(this.t[i]) + "\n");
    //     }
    // }

    printDataTable() {
        let res = [['x', 'Numeric Solution', 'Exact Solution']];
        for(let i=0; i<this.t.length; i++) {
            res.push([this.t[i], this.approx[i], this.exactSolution(this.t[i])]);
        }
        return res;
    }

    // printNumericSolution() {
    //     let res = [['x', 'Numeric Solution']];
    //     for(let i=0; i<this.t.length; i++) {
    //         res.push([this.t[i], this.approx[i]]);
    //     }
    //     return res;
    // }

    // printExactSolution() {
    //     let res = [['x', 'Exact Solution']];
    //     for(let i=0; i<this.t.length; i++) {
    //         res.push([this.t[i], this.exactSolution(this.t[i])]);
    //     }
    //     return res;
    // }

    eulerMethod(a, b, N, alpha) {
        // initial condition y(a) = alpha
        let h = (b-a)/N;

        this.t = [];
        for(let i=0; i<=N; i++) {
            this.t.push(a + h*i);
        }

        this.approx = [alpha, ];

        for(let i=0; i<N; i++) {
            let K1 = h * this.f(this.t[i], this.approx[i]);
            this.approx.push(this.approx[i] + K1); // generating this.approx[i+1]
        }
    }

    midpointMethod(a, b, N, alpha) {
        let h = (b-a)/N;

        this.t = [];
        for(let i=0; i<=N; i++) {
            this.t.push(a + h*i);
        }

        this.approx = [alpha, ];

        for(let i=0; i<N; i++) {
            let K1 = h * this.f(this.t[i], this.approx[i]);
            let K2 = h * this.f(this.t[i] + h/2, this.approx[i] + K1/2);
            this.approx.push(this.approx[i] + K2); // generating this.approx[i+1]
        }
    }

    RK2Method(a, b, N, alpha) {
        this.midpointMethod(a, b, N, alpha)
    }

    RK4Method(a, b, N, alpha) {
        let h = (b-a)/N;

        this.t = [];
        for(let i=0; i<=N; i++) {
            this.t.push(a + h*i);
        }

        this.approx = [alpha, ];

        for(let i=0; i<N; i++) {
            let K1 = h*this.f(this.t[i], this.approx[i]);
            let K2 = h*this.f(this.t[i] + h/2, this.approx[i] + K1/2);
            let K3 = h*this.f(this.t[i] + h/2, this.approx[i] + K2/2);
            let K4 = h*this.f(this.t[i] + h, this.approx[i] + K3);
            this.approx.push(this.approx[i] + (K1 + 2*K2 + 2*K3 + K4)/6);
        }
    }
}

// reference: https://www.w3schools.com/ai/ai_google_chart.asp

google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

let diff_eqn = new DifferentialEquation();
diff_eqn.RK4Method(0, 10, 100, 4);

function drawChart() {
    // Set Data
    var data = google.visualization.arrayToDataTable(diff_eqn.printDataTable());
    // Set Options
    var options = {
      title: 'Numeric Solution to the ODE',
      hAxis: {title: 'x'},
      vAxis: {title: 'y'},
      legend: { position: 'bottom', textStyle: { color: '#555', fontSize: 14} }
    };

    // Draw Chart
    var chart = new google.visualization.LineChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

// let diff_eqn = new DifferentialEquation();

// diff_eqn.RK4Method(0, 10, 100, 4);
// diff_eqn.displayValue();


// function drawChart() {
//     // Set Data
//     var data = google.visualization.arrayToDataTable(diff_eqn.printNumericSolution());
//     // Set Options
//     var options = {
//       title: 'Solving ODE numerically',
//       hAxis: {title: 'x'},
//       vAxis: {title: 'y'},
//       legend: 'none'
//     };
//     // Draw Chart
//     var chart = new google.visualization.LineChart(document.getElementById('myChart'));
//     chart.draw(data, options);
// }
