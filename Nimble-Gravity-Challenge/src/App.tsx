import { SubmitForm } from "./SubmitForm";
import { useState, useEffect } from 'react';
import "./SubmitForm.css"

interface TipoDatosCandidato {
  uuid: string;
  jobId: string;
  candidateId: string; 
  repoUrl: string;
}

interface Job {
    id: string;
    title: string;
}

const datosCandidato: TipoDatosCandidato = {
  uuid: "",
  jobId: "",
  candidateId: "",
  repoUrl: ""
};

const base_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";
const email = "guidocardozo2004@gmail.com"

export function App() {
    const [jobs, setJobs] = useState<Job[]>([]);
    useEffect(() => {
        const cargarDatos = async () => {
        try {
            const resCandidato = await fetch(`${base_URL}/api/candidate/get-by-email?email=${email}`, {
                    method: 'GET'
            });
            if (resCandidato.ok) {
                const dataCandidato = await resCandidato.json();
                datosCandidato.uuid = dataCandidato.uuid;
                datosCandidato.candidateId = dataCandidato.candidateId;
            }

            const resJobs = await fetch(`${base_URL}/api/jobs/get-list`, {
                    method: 'GET'
            });
            if (resJobs.ok) {
                const dataJobs = await resJobs.json();
                setJobs(dataJobs); 
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
        };
    cargarDatos();
    }, []);
    
    return (
        <div className="app-container">
            <h1 className="app-title">Nimble Gravity Challenge</h1>
            <h2 className="app-subtitle">Guido Cardozo</h2>
            <div className="submit-forms-container">
                {jobs.map((job) => {
                    datosCandidato.jobId = job.id;
                    return (
                        <SubmitForm 
                            positionTitle={job.title} 
                            baseURL={base_URL} 
                            datosCandidato={datosCandidato}
                            key={job.id} 
                        />  
                    )
                })}
            </div>
        </div>
    );
}