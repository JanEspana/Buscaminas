function init() {
    if (document.cookie == '') {
        var form = window.open('Formulario.html', 'Formulario', 'width=500, height=500');
        form.moveTo(500, 100);
        var docCookies = document.cookie.split(';');
        window.addEventListener('message', function (event) {
            var cookies = event.data.split(';');
            cookieArray = document.cookie.split(';');
            if (cookies.length > 0) {
                var tablero = new Tablero(parseInt(getCookie('Filas', cookieArray)), parseInt(getCookie('Columnas', cookieArray)), parseInt(getCookie('Minas', cookieArray)));
                var jugador = new Jugador(getCookie('Name', cookieArray), getCookie('Surname', cookieArray), getCookie('Nick', cookieArray), getCookie('BirthDate', cookieArray), getCookie('Email', cookieArray));
                initJuego(tablero, jugador);
            }
        });
    }
    else {
        var cookieArray = document.cookie.split(';');
        var tablero = new Tablero(parseInt(getCookie('Filas', cookieArray)), parseInt(getCookie('Columnas', cookieArray)), parseInt(getCookie('Minas', cookieArray)));
        var jugador = new Jugador(getCookie('Name', cookieArray), getCookie('Surname', cookieArray), getCookie('Nick', cookieArray), getCookie('BirthDate', cookieArray), getCookie('Email', cookieArray));
        initJuego(tablero, jugador);
    }
}
let numclicks = 0;
let casillasVisibles = 0;
let winCondition = false;
function initJuego(tablero, jugador) {
    document.getElementById('juego').innerHTML = '';
    crearTablaDOM(tablero, jugador);
    crearAjustes();
    console.log(tablero);
    console.log(jugador);
}
function crearTablaDOM(tablero, jugador) {
    let mensaje = document.getElementById('mensaje');
    mensaje.innerHTML = `¡Bienvenido, ${jugador.nick}! Disfruta la partida.`;
    for (var i = 0; i < tablero.filas; i++) {
        let filaNueva = document.createElement('div');
        filaNueva.style.display = 'flex';
        for (var j = 0; j < tablero.columnas; j++) {
            let casilla = document.createElement('div');
            casilla.style.width = '30px';
            casilla.style.height = '30px';
            casilla.style.margin = '5px';
            casilla.style.backgroundColor = 'lightgrey';
            casilla.style.border = '1px solid black';
            casilla.id = i + '-' + j;
            casilla.className = 'casilla';
            filaNueva.appendChild(casilla);

            casilla.addEventListener('click', () => {
                let x = parseInt(casilla.id.split('-')[0]);
                let y = parseInt(casilla.id.split('-')[1]);
                if (numclicks == 0) {
                    tablero.colocarBombas(x, y);
                    tablero.calcularBombasAdyacentes();
                }
                if (!tablero.matrizTablero[x][y].visible && !tablero.matrizTablero[x][y].bandera) {
                    tablero.destaparCasilla(x, y);
                    actualizaTablero(tablero, x, y, casilla);
                }
                numclicks++;
                console.log(numclicks);
                if (casillasVisibles == tablero.filas * tablero.columnas - tablero.minas) {
                    console.log(casillasVisibles);
                    alert('Has ganado');
                    for (let i = 0; i < tablero.filas; i++) {
                        for (let j = 0; j < tablero.columnas; j++) {
                            tablero.matrizTablero[i][j].visible = true;
                            winCondition = true;
                            actualizaTablero(tablero);
                        }
                    }
                }
            });

            casilla.addEventListener('contextmenu', () => {
                let x = parseInt(casilla.id.split('-')[0]);
                let y = parseInt(casilla.id.split('-')[1]);
                if (!tablero.matrizTablero[x][y].visible) {
                    tablero.matrizTablero[x][y].bandera = !tablero.matrizTablero[x][y].bandera;
                    marcarBandera(tablero.matrizTablero[x][y].bandera, casilla, x, y);
                }
                event.preventDefault();
            });
        }
        document.getElementById('juego').appendChild(filaNueva);
    }
}
function crearAjustes()
{
    ajustes.innerHTML = '<button id="reiniciar">Reiniciar</button>';
    reiniciar.addEventListener('click', () =>
    {
        var form = window.open('Formulario.html', 'Formulario', 'width=500, height=500');
            form.moveTo(500, 100);
            var docCookies = document.cookie.split(';');
            window.addEventListener('message', function (event) {
                var cookies = event.data.split(';');
                cookieArray = document.cookie.split(';');
                if (cookies.length > 0) {
                    var tablero = new Tablero(parseInt(getCookie('Filas', cookieArray)), parseInt(getCookie('Columnas', cookieArray)), parseInt(getCookie('Minas', cookieArray)));
                    var jugador = new Jugador(getCookie('Name', cookieArray), getCookie('Surname', cookieArray), getCookie('Nick', cookieArray), getCookie('BirthDate', cookieArray), getCookie('Email', cookieArray));
                    initJuego(tablero, jugador);
                    this.location.reload(); 
                }
            });
    });

}
function actualizaTablero(tablero) {
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.matrizTablero[i][j].visible && !tablero.matrizTablero[i][j].bandera && tablero.matrizTablero[i][j].mina == 0) {
                if (tablero.matrizTablero[i][j].vecinos > 0) {
                    document.getElementById(i + '-' + j).style.backgroundColor = 'lightgreen';
                    document.getElementById(i + '-' + j).innerHTML = tablero.matrizTablero[i][j].vecinos;
                }
                if (tablero.matrizTablero[i][j].vecinos == 0) {
                    document.getElementById(i + '-' + j).style.backgroundColor = 'lightblue';
                }
            }
            else if (tablero.matrizTablero[i][j].mina == 1 && tablero.matrizTablero[i][j].visible) {
                if (winCondition)
                {
                    document.getElementById(i + '-' + j).style.backgroundColor = 'lightpink';
                    document.getElementById(i + '-' + j).innerHTML = '<img src="imgs/flor.png" width="30px" height="30px">';
                }
                else
                {
                    document.getElementById(i + '-' + j).style.backgroundColor = 'red';
                    document.getElementById(i + '-' + j).innerHTML = '<img src="imgs/bomba.png" width="30px" height="30px">';
                }
            }
        }
    }
}

function marcarBandera(bandera, casilla, x, y) {
    if (bandera) {
        casilla.innerHTML = "<img src='imgs/bandera.png' width='30px' height='30px'>"
        document.getElementById(x + '-' + y).style.backgroundColor = 'yellow';
    }
    else {
        casilla.innerHTML = '';
        document.getElementById(x + '-' + y).style.backgroundColor = 'lightgrey';
    }
}

function getCookie(cookie, cookies) {
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].includes(cookie)) {
            return cookies[i].split('=')[1];
        }
    }
    return '';
}