import React, {Fragment, useState} from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';

function App() {

  //State de array de citas
  const [citas, guardarCitas] = useState([]);

  //Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    //console.log(cita);

    //Se podría usar este código: citas.push(cita), pero no seguiriamos las buenas 
   //prácticas, ya que en React siempre se utilizan funciones que modifiquen el State.
    guardarCitas([...citas,cita]);
  }

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
            <h2>Administra tus citas</h2>
            {citas.map(cita => (
              <Appointment
                key={cita.id}
                cita={cita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;