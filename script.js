function getPortfolio() {
    const walletAddress = document.getElementById('walletAddress').value.trim();

    if (walletAddress === '') {
        alert("Please enter a valid Ethereum wallet address.");
        return;
    }

    const etherscanAPIKey = 'YOUR_ETHERSCAN_API_KEY'; // Replace with your Etherscan API key
    const etherscanAPIURL = `https://api.etherscan.io/api?module=account&action=tokenbalance&address=${walletAddress}&tag=latest&apikey=${etherscanAPIKey}`;

    $.ajax({
        url: etherscanAPIURL,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status === '1') {
                const tokenBalances = response.result;

                if (tokenBalances.length === 0) {
                    alert("No token balances found for the provided address.");
                } else {
                    displayPortfolio(tokenBalances);
                }
            } else {
                alert(`Error: ${response.message}`);
            }
        },
        error: function () {
            alert("Failed to fetch data from Etherscan API. Please try again later.");
        }
    });
}

function displayPortfolio(tokenBalances) {
    const portfolioDiv = document.getElementById('portfolio');
    portfolioDiv.innerHTML = ''; // Clear previous data

    const table = document.createElement('table');
    const headerRow = table.insertRow(0);

    const headers = ['Token Symbol', 'Token Balance'];
    headers.forEach((headerText, index) => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });

    tokenBalances.forEach((token) => {
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.textContent = token.tokenSymbol;
        cell2.textContent = token.balance;
    });

    portfolioDiv.appendChild(table);
}
