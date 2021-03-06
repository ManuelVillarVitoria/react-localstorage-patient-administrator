import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';

function App() {

  //Citas con LocalStorage
  //Como LocalStorgae solo almacena strings, ponemos json.parse, para poner el array dentro de un string
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //State de array de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Hook useEffect para que esté pendiente,cuando el state de citas cambie, mediante el array de dependencias.
  // Es como usar el componentDidMount y componentDidUpdate en una misma función.
  //JSON.stringify convierte el array en un string.
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas));
    } else {
      localStorage.setItem('citas',JSON.stringify([]));
    }
  },[citas])

  //Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    //console.log(cita);

    //Se podría usar este código: citas.push(cita), pero no seguiriamos las buenas 
   //prácticas, ya que en React siempre se utilizan funciones que modifiquen el State.
    guardarCitas([...citas,cita]);
  }

  //Función que elimina una cita por su ID
  const eliminarCita = id => {
    //console.log(id);
    //Decimos que la cita sea diferente al id, porque cuando se filtren las citas queremos 
    //nos retorne el resto y que la que se filtre se elimine.
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    //Como filter nos crea un array nuevo, no hace falta pasar array: guardarCitas([nuevasCitas])
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional
  //console.log(citas.length);
  const titulo = citas.length === 0 ? 'No hay citas'  : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Appointment
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;