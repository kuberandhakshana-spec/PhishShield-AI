function scanWebsite() {

    const url = document.getElementById("urlInput").value.trim();
    const result = document.getElementById("result");

    if (url === "") {

        result.innerHTML = `
            <h2>⚠️ URL Required</h2>
            <p>Please enter a website URL to start the analysis.</p>
        `;

        return;
    }

    let risk = 0;
    let reasons = [];

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes("login")) {
        risk += 25;
        reasons.push("Suspicious login keyword detected");
    }

    if (lowerUrl.includes("verify")) {
        risk += 25;
        reasons.push("Suspicious verification keyword detected");
    }

    if (lowerUrl.includes("account")) {
        risk += 20;
        reasons.push("Account-related keyword detected");
    }

    if (lowerUrl.includes("password")) {
        risk += 25;
        reasons.push("Password-related keyword detected");
    }

    if (lowerUrl.includes("secure")) {
        risk += 15;
        reasons.push("Suspicious security keyword detected");
    }

    if (lowerUrl.startsWith("http://")) {
        risk += 10;
        reasons.push("Website is not using HTTPS");
    }

    if (risk > 100) {
        risk = 100;
    }

    let status;
    let icon;
    let className;
    let recommendation;

    if (risk >= 70) {

        status = "HIGH RISK";
        icon = "🔴";
        className = "high";

        recommendation =
        "Avoid entering passwords, OTPs or personal information on this website.";

    }

    else if (risk >= 30) {

        status = "MEDIUM RISK";
        icon = "🟡";
        className = "medium";

        recommendation =
        "Proceed carefully and verify the website before entering sensitive information.";

    }

    else {

        status = "LOW RISK";
        icon = "🟢";
        className = "low";

        recommendation =
        "No obvious suspicious URL indicators were detected.";

    }

    let indicatorList;

    if (reasons.length > 0) {

        indicatorList = reasons
            .map(reason => `<li>⚠️ ${reason}</li>`)
            .join("");

    }

    else {

        indicatorList =
        "<li>✅ No suspicious indicators detected.</li>";

    }

    result.innerHTML = `

        <h2>🔐 Website Security Analysis</h2>

        <p>
            <strong>Scanned URL:</strong> ${url}
        </p>

        <p>
            <strong>Phishing Risk:</strong> ${risk}%
        </p>

        <div class="risk-bar">
            <div
                id="riskFill"
                class="${className}"
                style="width: ${risk}%">
            </div>
        </div>

        <p class="status">
            ${icon} ${status}
        </p>

        <div class="recommendation">
            <strong>🛡️ Safety Recommendation</strong>
            <p>${recommendation}</p>
        </div>

        <h3>🔎 Detected Indicators</h3>

        <ul>
            ${indicatorList}
        </ul>

    `;
}