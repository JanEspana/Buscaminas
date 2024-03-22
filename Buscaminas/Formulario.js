function init()
{
    document.cookie = '';
    let form = document.getElementById("Formulario");
    form.addEventListener("submit", function (event)
    {
        event.preventDefault();

        let regexName = /^[A-Za-z]+$/;
        let regexSurname = /^[A-Za-z]+$/;
        let regexNick = /^[A-Za-z]+[0-9]$/;
        let regexEmail = /^[a-z0-9._%+-]+@itb.cat$/;
        let regexNumeric = /^[0-9]+$/;

        if (!regexName.test(document.getElementById("Name").value))
        {
            alert("El nombre no es válido");
        }
        else if (!regexSurname.test(document.getElementById("Surname").value))
        {
            alert("Los apellidos no son válidos");
        }
        else if (!regexNick.test(document.getElementById("Nick").value))
        {
            alert("El apodo no es válido");
        }
        else if (!regexEmail.test(document.getElementById("Email").value))
        {
            alert("El correo electrónico no es válido");
        }
        else if (!regexNumeric.test(document.getElementById("Filas").value))
        {
            alert("El número de filas no es válido");
        }
        else if (!regexNumeric.test(document.getElementById("Columnas").value))
        {
            alert("El número de columnas no es válido");
        }
        else if (!regexNumeric.test(document.getElementById("Minas").value))
        {
            alert("El número de minas no es válido");
        }
        else if (parseInt(document.getElementById("Minas")) > parseInt(document.getElementById("Filas")) * parseInt(document.getElementById("Columnas")))
        {
            alert("El número de minas no puede ser mayor que el número de casillas");
        }
        else if(this.BirthDate.valueAsDate.getFullYear() > new Date().getFullYear() - 18)
        {
            alert("Debes ser mayor de edad para jugar");
        }
        else
        {
            CreateCookie("Name", document.getElementById("Name").value);
            CreateCookie("Surname", document.getElementById("Surname").value);
            CreateCookie("Nick", document.getElementById("Nick").value);
            CreateCookie("BirthDate", document.getElementById("BirthDate").value);
            CreateCookie("Email", document.getElementById("Email").value);
            CreateCookie("Filas", parseInt(document.getElementById("Filas").value));
            CreateCookie("Columnas", parseInt(document.getElementById("Columnas").value));
            CreateCookie("Minas", parseInt(document.getElementById("Minas").value));
            //enviar cookies al padre
            window.opener.postMessage(document.cookie, '*');
            window.close();
        }
    });
}

function CreateCookie(name, value, days) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}