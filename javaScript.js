document.addEventListener("DOMContentLoaded", () => {
    actualizarBalance();
});

let operaciones = [];

function agregarOperacion() {
    const descripcion = document.getElementById("descripcion").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const tipo = document.getElementById("tipo").value;

    if (!descripcion || isNaN(monto)) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const operacion = { descripcion, monto, tipo };
    operaciones.push(operacion);
    actualizarLista();
    actualizarBalance();
}

function actualizarLista() {
    const lista = document.getElementById("lista-operaciones");
    lista.innerHTML = "";
    operaciones.forEach((op, index) => {
        const li = document.createElement("li");
        li.classList = "flex justify-between bg-gray-100 p-2 rounded mt-2";
        li.innerHTML = `
            <span>${op.descripcion} - <strong class="${op.tipo === 'gasto' ? 'text-red-500' : 'text-green-500'}">
                ${op.tipo === 'gasto' ? '-' : '+'}$${op.monto}
            </strong></span>
            <button onclick="eliminarOperacion(${index})" class="text-red-500">X</button>
        `;
        lista.appendChild(li);
    });
}

function actualizarBalance() {
    let total = 0;
    operaciones.forEach(op => {
        total += op.tipo === "gasto" ? -op.monto : op.monto;
    });

    document.getElementById("balance").textContent = `$${total}`;
}

function eliminarOperacion(index) {
    operaciones.splice(index, 1);
    actualizarLista();
    actualizarBalance();
}
