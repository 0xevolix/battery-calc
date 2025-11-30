function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`button[onclick="switchTab('${tabName}')"]`).classList.add('active');

    if (tabName === 'cylinder') {
        calculateCylinder();
    } else if (tabName === 'rectangle') {
        calculateRectangle();
    }
}

function calculateCylinder() {
    const outerDiameter = parseFloat(document.getElementById('outer-diameter').value);
    const innerDiameter = parseFloat(document.getElementById('inner-diameter').value);
    const height = parseFloat(document.getElementById('height').value);
    const fraction = parseFloat(document.getElementById('fraction').value);
    const energyDensity = parseFloat(document.getElementById('energy-density').value);
    const voltage = parseFloat(document.getElementById('voltage').value);
    const loadwh = parseFloat(document.getElementById('load-wh').value);

    if (innerDiameter >= outerDiameter) {
        alert('Der Innendurchmesser muss kleiner als der Außendurchmesser sein!');
        return;
    }

    const outerRadius = outerDiameter / 2;
    const innerRadius = innerDiameter / 2;
    const volume = Math.PI * height * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2)) * fraction;

    const volumeCm3 = volume / 1000;

    // Energy capacity (Wh)
    const capacityWh = energyDensity * volumeCm3;

    // Calculate mAh (Wh = V * Ah -> mAh = (Wh * 1000) / Voltage)
    const capacitymAh = (capacityWh * 1000) / voltage;

    const runtimeMin = (capacityWh / loadwh) * 60;

    document.getElementById('capacity-result').textContent = capacityWh.toFixed(4);
    document.getElementById('mAh-result').textContent = capacitymAh.toFixed(1);
    document.getElementById('runtime-result').textContent = runtimeMin.toFixed(1);
}

function calculateRectangle() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height-rect').value);
    const energyDensity = parseFloat(document.getElementById('energy-density-rect').value);
    const voltage = parseFloat(document.getElementById('voltage-rect').value);
    const loadwhr = parseFloat(document.getElementById('load-whr').value);

    const volume = length * width * height;
    const volumeCm3 = volume / 1000;
    // Energy capacity (Wh)
    const capacityWh = energyDensity * volumeCm3;
    // Calculate mAh (Wh = V * Ah -> mAh = (Wh * 1000) / Voltage)
    const capacitymAh = (capacityWh * 1000) / voltage;

    const runtimeMinr = (capacityWh / loadwhr) * 60;

    document.getElementById('capacity-result-rect').textContent = capacityWh.toFixed(4);
    document.getElementById('mAh-result-rect').textContent = capacitymAh.toFixed(1);
    document.getElementById('runtime-resultr').textContent = runtimeMinr.toFixed(1);
}

window.onload = function() {
    switchTab('cylinder');
};

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', () => {
        const activeTab = document.querySelector('.tab-content.active').id;
        if (activeTab === 'cylinder') {
            calculateCylinder();
        } else if (activeTab === 'rectangle') {
            calculateRectangle();
        }
    });
});