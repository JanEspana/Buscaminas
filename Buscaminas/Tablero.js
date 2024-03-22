class Tablero
        {
            matriz;
            constructor(filas, columnas, minas)
            {
                this.filas = filas;
                this.columnas = columnas;
                this.minas = minas;
                this.matriz = this.generarTablero();
            }
            generarTablero()
            {
                this.matrizTablero = [];   
                for (var i = 0; i < this.filas; i++)
                {
                    this.matrizTablero[i] = [];
                    for (var j = 0; j < this.columnas; j++)
                    {
                        this.matrizTablero[i][j] = new Casilla(i, j, 0, 0, false, false);
                    }
                }
            }
            colocarBombas(x, y)
            {
                for (var i = 0; i < this.minas; i++)
                {
                    var xRand = Math.floor(Math.random() * this.filas);
                    var yRand = Math.floor(Math.random() * this.columnas);
                    if (this.matrizTablero[xRand][yRand].mina == 0 && xRand != x && yRand != y)
                    {
                        this.matrizTablero[xRand][yRand].mina = 1;
                    }
                    else
                    {
                        i--;
                    }
                }
            }
            calcularBombasAdyacentes()
            {
                for (var i = 0; i < this.filas; i++)
                {
                    for (var j = 0; j < this.columnas; j++)
                    {
                        this.calcularVecinos(i, j);
                    }
                }
            }
            calcularVecinos(i, j)
            {
                if (this.matrizTablero[i][j].mina == 1)
                {
                    if(i > 0 && j > 0)
                    {
                        this.matrizTablero[i-1][j-1].vecinos++;
                    }
                    if(i > 0)
                    {
                        this.matrizTablero[i-1][j].vecinos++;
                    }
                    if(i > 0 && j < this.columnas - 1)
                    {
                        this.matrizTablero[i-1][j+1].vecinos++;
                    }
                    if(j > 0)
                    {
                        this.matrizTablero[i][j-1].vecinos++;
                    }
                    if(j < this.columnas - 1)
                    {
                        this.matrizTablero[i][j+1].vecinos++;
                    }
                    if(i < this.filas - 1 && j > 0)
                    {
                        this.matrizTablero[i+1][j-1].vecinos++;
                    }
                    if(i < this.filas - 1)
                    {
                        this.matrizTablero[i+1][j].vecinos++;
                    }
                    if(i < this.filas - 1 && j < this.columnas - 1)
                    {
                        this.matrizTablero[i+1][j+1].vecinos++;
                    }
                }
            }
            destaparCasilla(i, j)
            {
                if (this.matrizTablero[i][j].mina == 1)
                {
                    for (var i = 0; i < this.filas; i++)
                    {
                        for (var j = 0; j < this.columnas; j++)
                        {
                            this.matrizTablero[i][j].revelar();
                        }
                    }
                    alert('Has perdido');
                }
                else if (this.matrizTablero[i][j].vecinos == 0)
                {
                    this.matrizTablero[i][j].revelar();
                    if(i > 0 && j > 0 && !this.matrizTablero[i-1][j-1].visible)
                    {
                        this.destaparCasilla(i-1, j-1);
                    }
                    if(i > 0 && !this.matrizTablero[i-1][j].visible)
                    {
                        this.destaparCasilla(i-1, j);
                    }
                    if(i > 0 && j < this.columnas - 1 && !this.matrizTablero[i-1][j+1].visible)
                    {
                        this.destaparCasilla(i-1, j+1);
                    }
                    if(j > 0 && !this.matrizTablero[i][j-1].visible)
                    {
                        this.destaparCasilla(i, j-1);
                    }
                    if(j < this.columnas - 1 && !this.matrizTablero[i][j+1].visible)
                    {
                        this.destaparCasilla(i, j+1);
                    }
                    if(i < this.filas - 1 && j > 0 && !this.matrizTablero[i+1][j-1].visible)
                    {
                        this.destaparCasilla(i+1, j-1);
                    }
                    if(i < this.filas - 1   && !this.matrizTablero[i+1][j].visible)
                    {
                        this.destaparCasilla(i+1, j);
                    }
                    if(i < this.filas - 1 && j < this.columnas - 1 && !this.matrizTablero[i+1][j+1].visible)
                    {
                        this.destaparCasilla(i+1, j+1);
                    }
                }
                else if (this.matrizTablero[i][j].vecinos > 0)
                {
                    this.matrizTablero[i][j].revelar();
                }
            }
        }

