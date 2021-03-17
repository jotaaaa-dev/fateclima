import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Jumbotron from 'react-bootstrap/Jumbotron'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

import { FaCloudRain } from 'react-icons/fa'

function App(){
    const [cidade, setCidade] = useState('')
    const [clima, setClima] = useState(null)
    const [erroClima, setErroClima] = useState(null)

    async function obtemClima(cidade){
      const apiWeather = process.env.REACT_APP_APIWEATHER
      let urlClima = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&units=metric&appid=${apiWeather}`
      await fetch(urlClima)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.cod === '404' ? setErroClima('Cidade não encontrada!') : setClima(data)
      })
      .catch(function (error) {
        console.error(`Erro ao obter o clima da cidade : ${error.message}`)
      })
    }
  
  return (
    <> {/* React Fragment */}
      <Navbar bg= "success" variant= "dark">
        <Navbar.Brand href= "#inicio">FateClima</Navbar.Brand>
        <Nav className= "mr-auto">
          <Nav.Link href= "#inicio">Início</Nav.Link>
          <Nav.Link href= "#contato">Contato</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type= "text" value={cidade}
          onChange={event => setCidade(event.target.value)}
          placeholder= "Digite a cidade..."/>&nbsp;
        <Button variant= "info" onClick={() => obtemClima(cidade)}><FaCloudRain/> Obter Clima</Button>
        </Form>
      </Navbar>


      {erroClima &&
      <Toast onClose={() =>setErroClima(null)} delay={6000} autohide className="bg-danger">
        <Toast.Header>
          <strong className="mr-auto">{erroClima}</strong>
          <small>😖😖😖</small>
        </Toast.Header>
          <Toast.Body className="bg-white text-danger">
            Por favor, faça uma nova busca.
          </Toast.Body>
      </Toast>
      }


      <Jumbotron>
        <h1><FaCloudRain/> FateClima </h1>
        <p>Consulte o clima de qualquer cidade do mundo. <br></br>
        App desenvolvido em ReactJS e integrado com as API's Opencagedata e OpenWeatherMap
        </p>
      </Jumbotron>
      {clima &&
      <p>Cidade: {clima.name} - Temperatura: {clima.main.temp} </p>
      }
    </>
  )
}

export default App