import React, {Fragment, useState} from 'react';
//Instalamos la siguiente libreria de ID (npm install uuid)
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
    //Crear el State para citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //El State para el error comienza con false, porque al principio no hay errores, podría ser null también.
    const [error, actualizarError] = useState(false);

    //Función que se ejecuta cada vez que el usuario escribe en un input.
    const actualizarState = e => {
        //console.log(e.target.value);
        //Es necesario entrar en las propiedades de react mediante la función.
        //No se puede hacer como en JS poner 'cita.mascota = e.target.value;'
        actualizarCita({
            // Usamos rest parameters o spread en el valor inicial del State, para que la 
            //propiedad 'name' no se rescriba en los diferentes campos.
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores con destructuring pra no estar poniendo: cita.mascota, cita.propietario, etc..
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Función para cuando el usuario presiona agregar cita
    const submitCita = e => {
       e.preventDefault();
       //console.log('enviando form')
       console.log(mascota);

       //Validar
       //En la validación cuando hay un error, siempre hay que 
       //colocar un 'return', para que no se continue ejecutando el código.
       if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
          hora.trim() === '' || sintomas.trim() === '') {
           //console.log('Hay un error')
           actualizarError(true);
           return;
       }

       //Eliminar el mensaje previo
       actualizarError(false);
       
       //Asignar un ID
       cita.id = uuidv4();
       console.log(cita);


       //Crear la cita



       //Reiniciar el form
    }

    return (  
        <Fragment>
            <h2>Crear Cita</h2>

                {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

                <form
                    onSubmit={submitCita}
                >
                    <label>Nombre Mascota</label>
                    <input 
                        type="text"
                        name="mascota"
                        className="u-full-width"
                        placeholder="Nombre Mascota"
                        onChange={actualizarState}
                        value={mascota}
                    />
                    <label>Nombre Dueño</label>
                    <input 
                        type="text"
                        name="propietario"
                        className="u-full-width"
                        placeholder="Nombre Dueño de la mascota"
                        onChange={actualizarState}
                        value={propietario}
                    />
                    <label>Fecha</label>
                    <input 
                        type="date"
                        name="fecha"
                        className="u-full-width"
                        onChange={actualizarState}
                        value={fecha}
                    />
                    <label>Hora</label>
                    <input 
                        type="time"
                        name="hora"
                        className="u-full-width"
                        onChange={actualizarState}
                        value={hora}
                    />
                    <label>Síntomas</label>
                    <textarea
                        name="sintomas"
                        className="u-full-width"
                        onChange={actualizarState}
                        value={sintomas}
                    ></textarea>
                    <button
                        type="submit"
                        className="u-full-width button-primary"
                    >Agregar Cita</button>
                </form>
        </Fragment>
    );
}
 
export default Form
;