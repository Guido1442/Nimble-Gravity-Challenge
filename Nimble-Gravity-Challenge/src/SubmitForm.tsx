import { useState } from "react";
import "./SubmitForm.css";

export const SubmitForm = ({ positionTitle, baseURL, datosCandidato }: any) => {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const cargarUrl = (githubURL: any) => {
        setRepoUrl(githubURL.target.value);
    };

    const handleClick = async () => {
        setError(null);
        setSuccess(false);
        if (!repoUrl.trim().startsWith("https://github.com/")) {
            setError("Ingresa una URL de GitHub válida.");
            return;
        }
        setLoading(true);
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
                setSuccess(true);
                setRepoUrl("");
            } else {
                setError("Error al enviar los datos");
            }
        } catch (error) {
            setError("Error de red. Intenta más tarde.");
        } finally {
            setLoading(false);
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
                        disabled={loading}
                    />
                </div>
            </header>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>Enviado correctamente</div>}
            <aside className="submit-form-aside">
                <button className="submit-form-button" type="button" onClick={handleClick} disabled={loading}>
                    {loading ? 'Enviando...' : 'Submit'}
                </button>
            </aside>
        </article>
    );
}