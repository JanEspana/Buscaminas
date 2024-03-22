class Casilla
{
    constructor(x, y, mina, vecinos, visible, bandera)
    {
        this.x = x;
        this.y = y;
        this.mina = mina;
        this.vecinos = vecinos;
        this.visible = visible;
        this.bandera = bandera;
    }
    revelar()
    {
        this.visible = true;
        casillasVisibles++;
    }
    marcar()
    {
        this.bandera = true;
    }
}