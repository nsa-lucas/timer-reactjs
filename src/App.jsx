import { useState, useRef } from 'react';

import './style.css';

export default function App() {
    const [hora, setHora] = useState(0);
    const [minuto, setMinuto] = useState(0);
    const [segundo, setSegundo] = useState(0);
    const [rodando, setRodando] = useState(false);

    let timer = useRef(null);

    function handleTimer() {
        let _hora = hora;
        let _minuto = minuto;
        let _segundo = segundo;
        let _rodando = rodando;

        // impede criacao de varios setInterval caso usuario clique varias vezes em iniciar
        if (_rodando) return;

        if (_hora + _minuto + _segundo > 0) {
            _rodando = true;
            setRodando(_rodando);

            timer.current = setInterval(() => {
                if (_hora + _minuto + _segundo === 0) {
                    clearInterval(timer.current);
                    _rodando = false;
                    setRodando(_rodando);
                    clearInterval(timer.current);
                }

                if (_segundo > 0) {
                    _segundo -= 1;
                    setSegundo(_segundo);
                } else if (_minuto > 0) {
                    _minuto -= 1;
                    setMinuto(_minuto);
                    _segundo = 59;
                    setSegundo(_segundo);
                } else if (_hora > 0) {
                    _hora -= 1;
                    setHora(_hora);
                    _minuto = 59;
                    setMinuto(_minuto);
                    _segundo = 59;
                    setSegundo(_segundo);
                }
            }, 1000);
        }
    }

    function pause() {
        clearInterval(timer.current);
        let _rodando = false;
        setRodando(_rodando);
    }

    function clear() {
        setHora(0);
        setMinuto(0);
        setSegundo(0);

        clearInterval(timer.current);
    }

    return (
        <div className="container">
            <div className="input">
                <div className="inputGroup">
                    <label>Horas</label>
                    <input
                        type="number"
                        name="hora"
                        value={hora}
                        maxLength={2}
                        readOnly={rodando ? true : false}
                        onChange={e => {
                            if (e.target.value > 59) e.target.value = 1;
                            if (e.target.value < 0) e.target.value = 59;
                            setHora(e.target.value);
                        }}
                    />
                </div>
                <div className="inputGroup">
                    <label>Minutos</label>
                    <input
                        type="number"
                        name="minuto"
                        value={minuto}
                        readOnly={rodando ? true : false}
                        onChange={e => {
                            if (e.target.value > 59) e.target.value = 1;
                            if (e.target.value < 0) e.target.value = 59;
                            setMinuto(e.target.value);
                        }}
                    />
                </div>
                <div className="inputGroup">
                    <label>Segundos</label>
                    <input
                        type="number"
                        name="segundo"
                        value={segundo}
                        maxLength={2}
                        readOnly={rodando ? true : false}
                        onChange={e => {
                            if (e.target.value > 59) e.target.value = 1;
                            if (e.target.value < 0) e.target.value = 59;
                            setSegundo(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="btns">
                <button className="btn" type="button" onClick={handleTimer}>
                    Iniciar
                </button>
                <button
                    className="btn"
                    type="button"
                    onClick={rodando ? pause : clear}
                >
                    {rodando ? 'Pause' : 'Limpar'}
                </button>
            </div>
        </div>
    );
}
