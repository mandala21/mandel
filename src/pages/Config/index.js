import React, { useState } from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import './styles.css';
import { Link } from 'react-router-dom';

export default function Config() {
    const config = useSelector(state => state);
    const dispatch = useDispatch();
    const [command, setCommand] = useState(config[config.current_type] ? 
                                            config[config.current_type].command : ''
                                        );
    const [type, setType] = useState(config.current_type);
    const [projectPath, setProjectPath] = useState(config[config.current_type] ?
                                                    config[config.current_type].project_path : ''
                                                );


    const handleSaveState = (e) => {
        if(type){
            dispatch({type:'CHANGE_TYPE',value:type});
        }
        if(command){
            dispatch({type:'CHANGE_COMMAND',value:command});
        }
        if(projectPath){
            dispatch({type:'CHANGE_PROJECT_PATH',value:projectPath});
        }
    }

    return (
        <div className="config-wrapper">
            <div className="row h100">
                <div className="menu-settings">
                    <div className="title-content">
                        <Link to="/">
                            <FiArrowLeft className="icon" />
                        </Link>
                        <p className="title">Configurações</p>
                    </div>
                    <ul>
                        <li className="active">
                            Geral
                    </li>
                    </ul>
                </div>
                <div className="content-settings">
                    <div className="group-input">
                        <p>Framework:</p>
                        <select className="select-input"
                                onChange={(e)=>{setType(e.target.value)}}
                                defaultValue={type}
                            >
                            {
                                config.avaliable_types.map((el,i)=>(
                                    <option key={i}
                                            value={el}
                                        >
                                            {el.toUpperCase()}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="group-input">
                        <p>Caminho do projeto:</p>
                        <input className="input-txt" value={projectPath}
                                onChange={(e)=>setProjectPath(e.target.value)} />
                    </div>
                    <div className="group-input">
                        <p>Comando:</p>
                        <input className="input-txt"
                                value={command}
                                onChange={(e)=>{setCommand(e.target.value)}} />
                    </div>
                    <div className="row end">
                        <div className="group-input">
                            <button className="button-primary"
                                    onClick={(e)=>{handleSaveState()}}    
                                >
                                    Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
