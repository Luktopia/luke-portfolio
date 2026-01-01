/* This function creates a constant variable for doller figures. It formats the number to a string for display purposes. It adds commas to the number, makes sure it has two decimal places, and adds a dollar sign before the number */
const money = n => `$${n.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;



/*********************************************************************************************************************************************/
/* These functions go on the about.html page. It uses a button to display information about the team's performance stats. I decided to use it because it looks neat and adds a little interaction to an otherwise dull page. It uses destructuring to extract values from the objects. */

// Luke
(() => {
    const aboutRunBtn = document.getElementById('lukeStats');
    const aboutOut = document.getElementById('lukeDisplay');

    if (!aboutRunBtn || !aboutOut) return;
    aboutRunBtn.addEventListener('click', () => {

        const aboutMsgs = [];

        const luke = {
            roi2024: 48.19,
            roi2025: 33.75,
            netW: 2171336669612.43,
            favCo: "Emery's Emery Boards",
            ptc2026: "Leo's Leotards"
        };

        const {roi2024 = 0.0, roi2025 = 0.0, netW = 0.0, favCo = "none", ptc2026 = "none"} = luke;

        aboutMsgs.push(`
            
            2024 ROI: ${roi2024}%
            2025 ROI: ${roi2025}%
            Net Worth: ${money(netW)}
            Favorite Company: ${favCo}
            Pick to Click 2026: ${ptc2026}

            `);

        aboutOut.textContent = aboutMsgs;

    });
})();

// Johnny Johnson
(() => {
    const aboutRunBtn = document.getElementById('johnStats');
    const aboutOut = document.getElementById('johnDisplay');

    if (!aboutRunBtn || !aboutOut) return;
    aboutRunBtn.addEventListener('click', () => {

        const aboutMsgs = [];

        const john = {
            roi2024: 14.34,
            roi2025: 12.95,
            netW: 1956612.14,
            favCo: "Johnny's Johnnycakes",
            ptc2026: "Kim's Kimonos"
        };

        const {roi2024 = 0.0, roi2025 = 0.0, netW = 0.0, favCo = "none", ptc2026 = "none"} = john;

        aboutMsgs.push(`
            
            2024 ROI: ${roi2024}%
            2025 ROI: ${roi2025}%
            Net Worth: ${money(netW)}
            Favorite Company: ${favCo}
            Pick to Click 2026: ${ptc2026}

            `);

        aboutOut.textContent = aboutMsgs;

    });
})();

// Mikey Michaelson
(() => {
    const aboutRunBtn = document.getElementById('mikeStats');
    const aboutOut = document.getElementById('mikeDisplay');

    if (!aboutRunBtn || !aboutOut) return;
    aboutRunBtn.addEventListener('click', () => {

        const aboutMsgs = [];

        const mike = {
            roi2024: 27.38,
            roi2025: 26.17,
            netW: 3482052.29,
            favCo: "Mike's Microphones",
            ptc2026: "Cain's Canes"
        };

        const {roi2024 = 0.0, roi2025 = 0.0, netW = 0.0, favCo = "none", ptc2026 = "none"} = mike;

        aboutMsgs.push(`
            
            2024 ROI: ${roi2024}%
            2025 ROI: ${roi2025}%
            Net Worth: ${money(netW)}
            Favorite Company: ${favCo}
            Pick to Click 2026: ${ptc2026}

            `);

        aboutOut.textContent = aboutMsgs;

    });
})();

// Stevie Stevenson
(() => {
    const aboutRunBtn = document.getElementById('steveStats');
    const aboutOut = document.getElementById('steveDisplay');

    if (!aboutRunBtn || !aboutOut) return;
    aboutRunBtn.addEventListener('click', () => {

        const aboutMsgs = [];

        const steve = {
            roi2024: 82.19,
            roi2025: 73.53,
            netW: 3.50,
            favCo: "Ivy's Ivory",
            ptc2026: "Nick's Nickels"
        };

        const {roi2024 = 0.0, roi2025 = 0.0, netW = 0.0, favCo = "none", ptc2026 = "none"} = steve;

        aboutMsgs.push(`
            
            2024 ROI: -${roi2024}%
            2025 ROI: -${roi2025}%
            Net Worth: ${money(netW)}
            Favorite Company: ${favCo}
            Pick to Click 2026: ${ptc2026}

            `);

        aboutOut.textContent = aboutMsgs;

    });
})();


/*********************************************************************************************************************************************/
/* This is my dashboard for the info.html page. This dashboard shows a list of fake companies. It links to my companies.json data page and sorts the data by both total value and profit margin. I did this to try and replicate a site page where you can look at various companies and sort them by returns etc. I also included a function to change the color of the profit margins. */

const state = {
    data: [],
    filtered: [],
    sort: 'value-desc'
};


const grid = document.getElementById('company-list');
const sortSel = document.getElementById('sort');

function applyFilters() {
    let arr = [...state.data];


    switch (state.sort) {
        case 'value-asc':
            arr.sort((a, b) => a.totalValue - b.totalValue);
            break;
        case 'value-desc':
            arr.sort((a, b) => b.totalValue - a.totalValue);
            break;
        case 'profit-asc':
            arr.sort((a, b) => a.profitMargin - b.profitMargin);
            break;
        case 'profit-desc':
            arr.sort((a, b) => b.profitMargin - a.profitMargin);
            break;
    }

    state.filtered = arr;
    renderGrid();
}

function renderGrid() {

    grid.innerHTML = state.filtered.map(company => `

        <article class="companyCard">

            <img src="${company.image}" alt="${company.name}" class="thumb" loading="lazy">
    
            <div class="company-info">

                <h3>${company.name}</h3>

                <div>Profit Margin: <span class="${setProfitColor(company.profitMargin)}">${company.profitMargin}%</span></div>
                
                <div>Total Value: ${money(company.totalValue)}</div>

            </div>

        </article>
        

        
    `).join('');
}


function setProfitColor(margin) {
    if(margin >=20) {
        return 'green'
    } else if (margin >=10) {
        return 'orange'
    } else {
        return 'red'
    }
};


function attachEventListeners() {
    sortSel.addEventListener('change', e => {
        state.sort = e.target.value;
        applyFilters();
    });
}

async function infoInit() {
    try {
        const res = await fetch('data/companies.json');
        const data = await res.json();
        state.data = data;
        attachEventListeners();
        applyFilters();
    } catch (e) {
        grid.innerHTML = `<div>Failed to load companies.json<br><small>${e}</small></div>`;
    }
}

infoInit();

/*********************************************************************************************************************************************/
/* These are my template literals for my chart.html page. There is one chart for each of the four companies I chose to represent. */

(() => {
    const chart = document.getElementById('chart');
    if (!chart) return;


    function chartCard(compName= 'Unknown', percGain = 0.0, closingPrc = 0.0) {
        
        return `
        <div class="aboutCard">
            <div>${compName} went up by ${percGain}% to close at ${money(closingPrc)}</div>
        </div>
        
        `;
    }

    chart.innerHTML = chartCard("Mike's Microphones", 1.2, 1284.56);
})();

(() => {
    const chart2 = document.getElementById('chart2');
    if (!chart2) return;


    function chartCard(compName= 'Unknown', percGain = 0.0, closingPrc = 0.0) {
        
        return `
        <div class="aboutCard">
            <div>${compName} went up by ${percGain}% to close at ${money(closingPrc)}</div>
        </div>
        
        `;
    }

    chart2.innerHTML = chartCard("Nick's Nickels", 0.5, 0.57);
})();

(() => {
    const chart3 = document.getElementById('chart3');
    if (!chart3) return;


    function chartCard(compName= 'Unknown', percGain = 0.0, closingPrc = 0.0) {
        
        return `
        <div class="aboutCard">
            <div>${compName} went up by ${percGain}% to close at ${money(closingPrc)}</div>
        </div>
        
        `;
    }

    chart3.innerHTML = chartCard("Ollie's Olives", 1.7, 790.34);
})();

(() => {
    const chart4 = document.getElementById('chart4');
    if (!chart4) return;


    function chartCard(compName= 'Unknown', percGain = 0.0, closingPrc = 0.0) {
        
        return `
        <div class="aboutCard">
            <div>${compName} went down by ${percGain}% to close at ${money(closingPrc)}</div>
        </div>
        
        `;
    }

    chart4.innerHTML = chartCard("Pete's Pizza", 2.2, 1689.69);
})();

/*********************************************************************************************************************************************/
/* These are my calculations for my returns.html page. They take the companies.json file and calculate various financial metrics. You use a button and all the text is displayed in a box. There are three calculations. Total value, average value, average profit margin. */

const retOut = document.getElementById('returnOut');

const render = content => {
    retOut.innerHTML = `<pre>${content}</pre>`;
};

// Total Value of all Companies

document.getElementById("totCoValue").addEventListener("click", () => {
    fetch("data/companies.json")
        .then(res => res.json())
        .then(comps => {
            const total = comps.reduce((sum, comp) => sum + comp.totalValue, 0);
            const list = comps
                .map(i => `${i.name} Value = ${money(i.totalValue)}`)
                .join("\n");
            const text = `
Companies:

${list}

Total Value of All Companies: ${money(total)}
`;
            render(text.trim());
        })
        .catch(err => render("Error loading companies.json: ") + err); 
});


// Average Company Value

document.getElementById("avgCoValue").addEventListener("click", () => {
    fetch("data/companies.json")
        .then(res => res.json())
        .then(comps => {
            const totNum = comps.length;
            const total = comps.reduce((sum, comp) => sum + comp.totalValue, 0);
            const avg = total / totNum;
            const list = comps
                .map(i => `${i.name} Value = ${money(i.totalValue)}`)
                .join("\n");
            const text = `
Companies:

${list}

Average Value of A Company: ${money(avg)}
`;
            render(text.trim());
        })
        .catch(err => render("Error loading companies.json: ") + err); 
});

// Average Company Profit Margin

document.getElementById("avgCoMargin").addEventListener("click", () => {
    fetch("data/companies.json")
        .then(res => res.json())
        .then(comps => {
            const totNum = comps.length;
            const total = comps.reduce((sum, comp) => sum + comp.profitMargin, 0);
            const avg = total / totNum;
            const list = comps
                .map(i => `${i.name} Profit Margin = ${i.profitMargin}%`)
                .join("\n");
            const text = `
Companies:

${list}

Average Profit Margin For A Company: ${avg.toFixed(2)}%
`;
            render(text.trim());
        })
        .catch(err => render("Error loading companies.json: ") + err); 
});

/*********************************************************************************************************************************************/
/* Subscription Info input and return on the subs.html page. I did this in IT130. I thought it would be fun. You put in a password, but it doesn't show up when you return. */

function signUp() {
    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let userName = document.getElementById("userInput").value;
    let pass = document.getElementById("passInput").value;

    let subOutput = document.getElementById("subOutput");

    subOutput.innerHTML = `
        <h3>You are all signed up!</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Username: ${userName}</p>
        <p>Password:  ***HIDDEN***</p>
    `;

}























/* Username Checker */

let useName = document.getElementById("username");
let checkMark = document.getElementById("checkMark");

const admin = "luke";
const pBush = "ProfessorBush";

function checkUserName(data) {
    if (data === admin) {
        checkMark.classList.add("valid");        
    } else if (data === pBush) {
        checkMark.classList.add("valid");        
    } else {
        checkMark.classList.remove("valid");        
    }
}

