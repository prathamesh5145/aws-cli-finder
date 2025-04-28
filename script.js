const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

async function fetchCommands() {
    const response = await fetch('aws-commands.json');
    const awsCommands = await response.json();
    renderCommands(awsCommands);
}

function renderCommands(awsCommands, filterText = '') {
    resultsDiv.innerHTML = '';

    const filter = filterText.toLowerCase();

    Object.keys(awsCommands).forEach(service => {
        if (service.includes(filter) || filter === '') {
            const serviceSection = document.createElement('div');
            serviceSection.className = "bg-white p-4 rounded-lg shadow-md transition-all";

            const title = document.createElement('button');
            title.className = "text-2xl font-semibold text-gray-800 mb-2 w-full text-left";
            title.textContent = service.toUpperCase();
            title.onclick = () => {
                commandList.classList.toggle('hidden');
            };

            const commandList = document.createElement('ul');
            commandList.className = "list-disc list-inside space-y-1 mt-2 hidden";

            awsCommands[service].forEach(command => {
                const item = document.createElement('li');
                item.textContent = `aws ${service} ${command}`;
                item.className = "text-gray-600";
                commandList.appendChild(item);
            });

            serviceSection.appendChild(title);
            serviceSection.appendChild(commandList);
            resultsDiv.appendChild(serviceSection);
        }
    });
}

// Initial Load
fetchCommands();

// Live Search
searchInput.addEventListener('input', async (e) => {
    const response = await fetch('aws-commands.json');
    const awsCommands = await response.json();
    renderCommands(awsCommands, e.target.value);
});
