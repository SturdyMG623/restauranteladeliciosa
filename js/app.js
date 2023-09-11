const menu1 = document.querySelector('.menu1');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnHamburguesa = document.querySelector('.hamburguesa');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostre = document.querySelector('.postre');
const contenedorPlatillos = document.querySelector('.platillos');

document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});

const eventos = () =>{
    menu1.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar')
    botonCerrar();
}

const botonCerrar = () => {
    const cerMenu = document.createElement('p');
    const overley = document.createElement('div');
    overley.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overley);
    cerMenu.textContent = 'X';
    cerMenu.classList.add('cerrar-menu1');

    while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5])
    }
    navegacion.appendChild(cerMenu);
    cerrarMenu(cerMenu,overley);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen)
        }
    })
})

imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const cerrarMenu = (boton,overley) => {
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overley.remove();
    });

    overley.onclick = function(){
        overley.remove();
        navegacion.classList.add('ocultar')
    }
}

const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');
    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);
    const hamburguesas = platillosArreglo.filter (hamburguesa=> hamburguesa.getAttribute('data-platillo') === 'hamburguesa');
    const pastas = platillosArreglo.filter (pasta=> pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter (pizza=> pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter (postre=> postre.getAttribute('data-platillo')=== 'postre');
    
    mostrarPlatillos(hamburguesas, pastas, pizzas, postres, platillosArreglo);
}

const mostrarPlatillos = (hamburguesas, pastas, pizzas, postres, todos)=>{
    btnHamburguesa.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        hamburguesas.forEach(hamburguesa=> contenedorPlatillos.appendChild(hamburguesa));
    });
    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });
    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });
    btnPostre.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
    });
    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}