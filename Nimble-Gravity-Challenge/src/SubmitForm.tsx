import { useState } from "react";

export const SubmitForm = ({ positionTitle, baseURL, datosCandidato }: any) => {
    const [repoUrl, setRepoUrl] = useState("");

    const cargarUrl = (githubURL:any) => {
        setRepoUrl(githubURL.target.value);
    };

    const handleClick = async (datosCandidato:any) => {
        if (!(repoUrl.trim() === "")) {
            try {
                const datosActualizados = { ...datosCandidato, repoUrl };
                const response = await fetch(`${baseURL}/api/candidate/apply-to-job`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosActualizados), 
                });
                if (response.ok) {
                    console.log('Datos enviados correctamente');
                } else {
                    console.error('Error al enviar los datos');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        }
    };

    return (
        <article className="submit-form">
            <header className="submit-form-header">
                <div className="submit-form-header-title">
                    <strong>{positionTitle}</strong>
                </div>
                <div className="submit-form-header-input">
                    <input 
                        type="text" 
                        placeholder="https://github.com/usuario/repo"
                        value={repoUrl}
                        onChange={cargarUrl}
                    />
                </div>
            </header>
            <aside className="submit-form-aside">
                <button className="submit-form-button" onClick={() => handleClick(datosCandidato)}>
                    Submit
                </button>
            </aside>
            


        </article>
    )
}