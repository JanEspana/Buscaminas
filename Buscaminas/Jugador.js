class Jugador
        {
            #edad;
            constructor(nombre, apellido, nick, fechaNacimiento, contraseña)
            {
                this.nombre = nombre;
                this.apellido = apellido;
                this.nick = nick;
                this.fechaNacimiento = fechaNacimiento;
                this.contraseña = contraseña;
            }
            getEdad()
            {
                return this.#edad;
            }
            setEdad(edad)
            {
                this.#edad = new Date().getFullYear() - this.fechaNacimiento.getFullYear();
            }
        }