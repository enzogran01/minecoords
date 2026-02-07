// classes
class Coord {
    constructor(name, x, z, dimension) {
        this.name = name;
        this.x = x;
        this.z = z;
        this.dimension = dimension;
        this.bgColor = dimension === "ove" ? "bg-blue-400" : dimension === "net" ? "bg-red-400" : "bg-purple-400";
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
const closeDialogBtn = document.getElementById("closeDialog");

// functions
function clearInputs () {
    coordName.value = '';
    xCoord.value = '';
    zCoord.value = '';
    dimension.value = 'ove';
}

function formatCoordCard (coord) {
    const { name, x, z, bgColor } = coord;

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

    h3Name.classList.add("text-3xl", "mb-4");  
    card.classList.add("flex", "flex-col", "items-center", bgColor, "text-2xl", "p-2", "h-fit");

    if (thisDimension !== "The End") {
        const btnDimension = document.createElement("button");
        const spanAlternateDimension = document.createElement("p");

        btnDimension.classList.add("p-2", "rounded-md", "bg-slate-700", "text-white", "mt-4", "mb-2", "transition-all", "duration-200", "cursor-pointer", "active:bg-slate-500", "active:-translate-y-1");
        spanAlternateDimension.classList.add("text-center", "text-xl");

        btnDimension.textContent = `Converter para ${thisDimension === "Overworld" ? "Nether" : "Overworld"}`;
        card.appendChild(btnDimension);

        btnDimension.addEventListener("click", () => {
            const converted = coord.toDimension();
            spanAlternateDimension.textContent = `(${(thisDimension === "Overworld" ? "Nether" : "Overworld").toUpperCase()}) X: ${converted.x.toFixed(0)} | Z: ${converted.z.toFixed(0)}`;
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
    });
}

function toggleDialog() {
    if (newCoordDialog.attributes.getNamedItem("open")) {
        newCoordDialog.close();
        return;
    }
    newCoordDialog.showModal();
}

function validaFormulario() {
    if (coordName.value.trim() === "") {
        return false;
    }
    if (xCoord.value.trim() === "" || zCoord.value.trim() === "") {
        return false;
    }
    return true;
}

// eventlisteners
newCoordBtn.addEventListener("click", toggleDialog);
closeDialogBtn.addEventListener("click", () => {toggleDialog(), clearInputs()});

saveCoordBtn.addEventListener("click", () => {
    if (!validaFormulario()) {
        return;
    }

    const coord = new Coord(
        coordName.value.trim(),
        Number(xCoord.value.trim()),
        Number(zCoord.value.trim()),
        dimension.value
    );
    
    allCoords.push(coord);
    clearInputs();
    toggleDialog();
    renderCards();
});
