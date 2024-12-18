const API_KEY = "9NswY80M8Hmco2ALWA26Wg==rLdfGyT0BETm9XLS";

let totalCalories = 0; // Variable to track total calories burned
let walkingStepCount = 0; // Variable to track walking steps

async function fetchCalories(activity) {
    const url = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Api-Key": API_KEY,
            },
        });
        const data = await response.json();
        console.log(`API Response for ${activity}:`, data); // Debugging log
        return data?.calories || 0; // Fallback to 0 if calories are not available
    } catch (error) {
        console.error("Error fetching calories:", error);
        return 0; // Fallback to 0 in case of error
    }
}

async function updateSteps() {
    const stepsInput = document.getElementById("steps-input").value; // Get user input
    if (stepsInput) {
        walkingStepCount = parseInt(stepsInput); // Parse input as integer
        document.getElementById("steps-count").textContent = walkingStepCount; // Update steps in HTML

        let calories = await fetchCalories("walking");
        if (!calories || calories === 0) {
            console.warn("Using fallback calculation for walking.");
            calories = walkingStepCount * 0.04; // Approximation: 0.04 calories per step
        }
        console.log("Calories burned for walking:", calories); // Debugging log
        calculateCalories(calories); // Update total calories
    } else {
        console.warn("No steps input provided.");
    }
}

function deleteSteps() {
    walkingStepCount = 0; // Reset step count
    document.getElementById("steps-input").value = ""; // Clear input field
    document.getElementById("steps-count").textContent = walkingStepCount; // Reset count in HTML
    calculateCalories(0); // Reset calories
}

async function updateDistance() {
    const distanceInput = document.getElementById("distance-input").value; // Get user input
    if (distanceInput) {
        const runningDistance = parseInt(distanceInput); // Parse input as integer
        document.getElementById("running-distance").textContent = runningDistance; // Update distance in HTML

        let calories = await fetchCalories("running");
        if (!calories || calories === 0) {
            console.warn("Using fallback calculation for running.");
            calories = runningDistance * 50; // Approximation: 50 calories per kilometer
        }
        console.log("Calories burned for running:", calories); // Debugging log
        calculateCalories(calories); // Update total calories
    } else {
        console.warn("No distance input provided.");
    }
}

function deleteDistance() {
    document.getElementById("distance-input").value = ""; // Clear input field
    document.getElementById("running-distance").textContent = 0; // Reset distance in HTML
    calculateCalories(0); // Reset calories
}

// Calculate and update total calories, then update progress bar
function calculateCalories(newCalories) {
    totalCalories = newCalories; // Update total calories
    document.getElementById("total-calories").textContent = totalCalories.toFixed(2); // Display total in HTML
    console.log("Updated Total Calories:", totalCalories); // Debugging log
    updateProgressBar(totalCalories); // Call to update progress bar
}

// Update progress bar based on the total calories burned
function updateProgressBar(caloriesBurned) {
    const progressBar = document.getElementById("progress-bar");
    const dailyTarget = 2000; // Example of a daily calorie target

    const progressPercentage = Math.min((caloriesBurned / dailyTarget) * 100, 100); // Calculate progress percentage
    console.log("Progress Percentage:", progressPercentage); // Debugging log

    // Update the progress bar's width and content
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${progressPercentage.toFixed(2)}%`; // Update progress bar text
}
