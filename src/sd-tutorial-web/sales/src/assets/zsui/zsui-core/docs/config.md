# Documentation for Configuration

We can configure themes for ZSUI library using config.js file. 
It is currently used to configure third party components like Highcharts.

# Usage

We can configure various chart background/text/line colors along with font styles as follows:

```javascript
var zs = (function(ns) {
    ns.themeName = 'zs';
    ns.themeVersion = '3.2.0';
    
    ns.charts = {
        background: '#fff',
        backgroundDark: '#f7f7f7',
        border: '#e1e9ef',
        text: 'rgb(83, 86, 90)',
        highlight: '#fff4c7',

        chart1: '#86c8bc',	// Aqua	
        chart2: '#00629b',	// Blue
        chart3: '#6e2b62',	// Plum
        chart4: '#b8cc7b',	// Celery
        chart5: '#01a6dc',	// Cerulean
        chart6: '#a3b2aa',	// Pewter
        chart7: '#a0afc6',	// Lavender Gray

        chartCurve: '#86c8bc',
        chartAxis: '#d0dde6', 
        chartLegend: '#d0dde6',
        chartGoal: '#6e2b62',
        chartPlot: '#f7f7f7', 	
        chartAttain: '#ed8b00',	 
        chartWhatIf: '#00629b',

        chartDotRadius: 5,
        chartDotWidth: 3,
        chartDotHoverradius: 6,
        chartDotHoverWidth:4,

        fontFamily:'Roboto, Helvetica, "Helvetica Neue", Arial, sans-serif',
        fontSize:14,
        padding:8
    };
    return ns;
})(window.zs || {});
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## zs

zs theme configuration file for ZSUI library

Type: [object][1]

### charts

Use to configure third party components like Highcharts

Type: [object][1]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object