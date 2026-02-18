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
    const btnDeleteCoord = document.createElement("button");
    const titleDiv = document.createElement("div");
    const btnDimension = document.createElement("button");
    const spanAlternateDimension = document.createElement("p");

    h3Name.textContent = `${name}`;
    pX.textContent = `X: ${x}`;
    pZ.textContent = `Z: ${z}`;
    pDimension.textContent = thisDimension;
    btnDeleteCoord.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

    card.appendChild(titleDiv);
    titleDiv.appendChild(btnDeleteCoord);
    titleDiv.appendChild(h3Name);
    card.appendChild(pX);
    card.appendChild(pZ);
    card.appendChild(pDimension);

    card.classList.add("flex", "flex-col", "items-center", bgColor, "text-2xl", "p-4", "h-full", "max-h-fit", "w-full", "rounded-xl", "transition-all", "hover:-translate-y-1", "hover:shadow-lg", "duration-300");
    titleDiv.classList.add("flex", "items-center", "justify-center", "w-full", "mb-4", "relative");
    btnDeleteCoord.classList.add("absolute", "right-[90%]", "flex", "items-center", "justify-center", "m-0", "p-1", "cursor-pointer", "transition-all", "duration-100", "active:scale-90", "active:bg-white/40", "rounded-full");
    pDimension.classList.add("p-2", "rounded-xl");
    h3Name.classList.add("text-3xl"); 
    btnDimension.classList.add("p-2", "rounded-md", "bg-slate-700", "text-white", "mt-4", "mb-2", "transition-all", "duration-200", "cursor-pointer", "active:bg-slate-500", "active:-translate-y-1", "disabled:opacity-70", "disabled:pointer-events-none");
    spanAlternateDimension.classList.add("text-center", "text-xl");

    card.appendChild(btnDimension);

    btnDeleteCoord.addEventListener("click", () => {
        // renderCards();
    });

    if (thisDimension !== "The End") {
        btnDimension.textContent = `Converter para ${thisDimension === "Overworld" ? "Nether" : "Overworld"}`;

        btnDimension.addEventListener("click", () => {
            const converted = coord.toDimension();
            spanAlternateDimension.textContent = `(${(thisDimension === "Overworld" ? "Nether" : "Overworld").toUpperCase()}) X: ${converted.x.toFixed(1)} | Z: ${converted.z.toFixed(1)}`;
            card.appendChild(spanAlternateDimension);
        });
    } else {
        btnDimension.textContent = "Conversão indisponível";
        btnDimension.disabled = true;
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
