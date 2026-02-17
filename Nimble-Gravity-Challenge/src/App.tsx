import { SubmitForm } from "./SubmitForm";
import { useState, useEffect } from 'react';
import "./SubmitForm.css"

interface TipoDatosCandidato {
  uuid: string;
  jobId: string;
  candidateId: string; 
  repoUrl: string;
  applicationId: string
}

interface Job {
    id: string;
    title: string;
}

const datosCandidato: TipoDatosCandidato = {
  uuid: "",
  jobId: "",
  candidateId: "",
  repoUrl: "",
  applicationId: ""
};

const base_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";
const email = "guidocardozo2004@gmail.com"

export function App() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarDatos = async () => {
            setLoading(true);
            setError(null);
            try {
                const resCandidato = await fetch(`${base_URL}/api/candidate/get-by-email?email=${email}`, {
                    method: 'GET'
                });
                if (resCandidato.ok) {
                    const dataCandidato = await resCandidato.json();
                    datosCandidato.uuid = dataCandidato.uuid;
                    datosCandidato.candidateId = dataCandidato.candidateId;
                    datosCandidato.applicationId = dataCandidato.applicationId;
                    console.log(dataCandidato);
                } else {
                    setError('Error al obtener datos del candidato');
                    setLoading(false);
                    return;
                }

                const resJobs = await fetch(`${base_URL}/api/jobs/get-list`, {
                    method: 'GET'
                });
                if (resJobs.ok) {
                    const dataJobs = await resJobs.json();
                    setJobs(dataJobs);
                } else {
                    setError('Error al obtener la lista de trabajos');
                }
            } catch (error) {
                setError('Error de red al cargar los datos');
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    return (
        <div className="app-container">
            <h1 className="app-title">Nimble Gravity Challenge</h1>
            <h2 className="app-subtitle">Guido Cardozo</h2>
            {loading && <div style={{textAlign: 'center', margin: '2rem'}}>Cargando datos...</div>}
            {error && <div style={{color: 'red', textAlign: 'center', margin: '2rem'}}>{error}</div>}
            {!loading && !error && (
                <div className="submit-forms-container">
                    {jobs.map((job) => {
                        datosCandidato.jobId = job.id;
                        return (
                            <SubmitForm 
                                positionTitle={job.title} 
                                baseURL={base_URL} 
                                datosCandidato={{
                                    uuid: datosCandidato.uuid,
                                    jobId: job.id,
                                    candidateId: datosCandidato.candidateId,
                                    repoUrl: "",
                                    applicationId: datosCandidato.applicationId,
                                }}
                                key={job.id} 
                            />  
                        )
                    })}
                </div>
            )}
        </div>
    );
}