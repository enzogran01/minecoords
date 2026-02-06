// classes
class Coord {
    constructor(name, x, z, dimension) {
        this.name = name;
        this.x = x;
        this.z = z;
        this.dimension = dimension;
    }

    toDimension() {
        if (this.dimension === "end") return;
        return this.dimension === "ove" ? { x: this.x / 8, z: this.z / 8 } : { x: this.x * 8, z: this.z * 8 };
    }

    formatDimension() {
        const map = {
            ove: "Overworld",
            net: "Nether",
            end: "The End"
        };
        return map[this.dimension] ?? "Desconhecida";
    }
}

// variables
const allCoords = [];
const coordName = document.getElementById("coordName");
const xCoord = document.getElementById("xCoord");
const zCoord = document.getElementById("zCoord");
const dimension = document.getElementById("dimension");
const saveCoordBtn = document.getElementById("saveCoordBtn");
const coordsDisplayDiv = document.getElementById("coordsDisplayDiv");
const newCoordBtn = document.getElementById("newCoordBtn");
const newCoordDialog = document.getElementById("newCoordDialog");

// functions
function clearInputs () {
    coordName.value = '';
    xCoord.value = '';
    zCoord.value = '';
    dimension.value = 'ove';
}

function formatCoordCard (coord) {
    const { name, x, z } = coord;

    const thisDimension = coord.formatDimension();
    const card = document.createElement("div");
    const h3Name = document.createElement("h3");
    const pX = document.createElement("p");
    const pZ = document.createElement("p");
    const pDimension = document.createElement("p");
    
    h3Name.textContent = `${name}`;
    pX.textContent = `X: ${x}`;
    pZ.textContent = `Z: ${z}`;
    pDimension.textContent = thisDimension;

    card.appendChild(h3Name);
    card.appendChild(pX);
    card.appendChild(pZ);
    card.appendChild(pDimension);

    card.classList.add("flex", "flex-col", "bg-blue-500", "text-2xl", "p-1");

    if (thisDimension !== "The End") {
        const btnDimension = document.createElement("button");
        const spanAlternateDimension = document.createElement("p");

        btnDimension.textContent = `Converter para ${thisDimension === "Overworld" ? "Nether" : "Overworld"}`;
        card.appendChild(btnDimension);

        btnDimension.addEventListener("click", () => {
            const converted = coord.toDimension();
            spanAlternateDimension.textContent = `(${(thisDimension === "Overworld" ? "Nether" : "Overworld").toUpperCase()}) X: ${converted.x.toFixed(1)} / Z: ${converted.z.toFixed(1)}`;
            card.appendChild(spanAlternateDimension);
        });
    }

    return card;
}

function renderCards() {
    coordsDisplayDiv.innerHTML = "";

    allCoords.forEach(coord => {
        const card = formatCoordCard(coord);
        coordsDisplayDiv.appendChild(card);
        console.log(card);
    });
}

function toggleDialog() {
    if (newCoordDialog.attributes.getNamedItem("open")) {
        newCoordDialog.close();
        return;
    }
    newCoordDialog.showModal();
}

// eventlisteners
newCoordBtn.addEventListener("click", toggleDialog);

saveCoordBtn.addEventListener("click", () => {
    toggleDialog();

    const coord = new Coord(
        coordName.value,
        Number(xCoord.value),
        Number(zCoord.value),
        dimension.value
    );

    allCoords.push(coord);
    clearInputs();
    renderCards();
});
