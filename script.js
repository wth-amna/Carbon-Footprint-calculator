document.addEventListener("DOMContentLoaded", function () {
  function calculateEnergyFootprint() {
    const energyEmissionFactor = 0.17815;
    const electricityConsumed =
      parseFloat(document.getElementById("electricityConsumed").value) || 0;
    const numOfPeople =
      parseInt(document.getElementById("numOfPeople").value) || 1;
    const monthlyEnergyFootprint = electricityConsumed * energyEmissionFactor;
    const perPersonEnergyFootprint = monthlyEnergyFootprint / numOfPeople;
    return perPersonEnergyFootprint;
  }

  function toggleTransportationInputs() {
    const vehicleType = document.getElementById("vehicalType").value.toLowerCase();
    const transportationInputs = document.getElementById("transportationInputs");

    if (vehicleType === "byfoot") {
      // If the vehicle type is "By foot", hide the transportation inputs
      transportationInputs.style.display = "none";
    } else {
      // For other vehicle types, show the transportation inputs
      transportationInputs.style.display = "block";
    }
  }

  // Add an event listener to the vehicle type dropdown to toggle the transportation inputs visibility
  document.getElementById("vehicalType").addEventListener("change", toggleTransportationInputs);
 

  // Function to calculate transportation emissions
  function calculateTransportationEmissions() {
    const numOfDaysInMonth = 30;
    const dailyDistance =
      parseFloat(document.getElementById("dailyDistance").value) || 0;
    const dailyFuelConsumed =
      parseFloat(document.getElementById("dailyFuelConsumed").value) || 0;
    const fuelType = document.getElementById("fuelType").value.toLowerCase();
    const vehicleType = document.getElementById("vehicalType").value.toLowerCase();

    let dailyFuelEF;
    if (vehicleType === "bike") {
      dailyFuelEF = 0.23;
    } else if (vehicleType === "car") {
      if (fuelType === "gasoline") {
        dailyFuelEF = 2.31;
      } else if (fuelType === "diesel") {
        dailyFuelEF = 2.6;
      } else {
        console.log("Invalid fuel type. Please enter 'gasoline' or 'diesel'.");
        return;
      }
    } else if (vehicleType === "public transport") {
      dailyFuelEF = 0.2;
    }

    const monthlyDistance = dailyDistance * numOfDaysInMonth;
    const monthlyFuelConsumed = dailyFuelConsumed * numOfDaysInMonth;
    const monthlyTransportFootprint = monthlyFuelConsumed * dailyFuelEF;
    return monthlyTransportFootprint;
  }

  function calculateSuiGasFootprint() {
    const suiGasEmissionFactor = 2.15;
    const suiGasConsumed =
      parseFloat(document.getElementById("gasConsumed").value) || 0;
    const monthlySuiGasFootprint = suiGasConsumed * suiGasEmissionFactor;
    return monthlySuiGasFootprint;
  }

  function showCalculatedFootprint(carbonFootprint) {
    const resultElement = document.querySelector(".result");
    const calculatedFootprintElement = document.getElementById("calculatedfootprint");
    calculatedFootprintElement.textContent = carbonFootprint;
    resultElement.style.display = "block"; // Make the result visible
  }

  function TotalCarbonFootprint() {
    energyFootprint = calculateEnergyFootprint();
    console.log("carbonfootprint", energyFootprint);
    transportFootprint = calculateTransportationEmissions();
    gasFootprint = calculateSuiGasFootprint();
    carbonFootprint = Math.round(energyFootprint + transportFootprint + gasFootprint);
    showCalculatedFootprint(carbonFootprint);
    // return carbonFootprint;

    // console.log("carbonfootprint",carbonFootprint);
  }

  document
    .getElementById("carbonFootprint")
    .addEventListener("click", TotalCarbonFootprint);
  // document.getElementById('calculatedFootprint').innerHTML(TotalCarbonFootprint)
});
