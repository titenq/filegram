import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '@/pages/FileUpload/FileUpload.module.css';
import uploadFile from '@/api/uploadFile';

const FileUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    await uploadFile(formData);

    setLoading(false);
    navigate('/arquivos');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="file" 
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={loading}
          className={styles.file_input}
        />
        <button 
          type="submit"
          disabled={loading || !file}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
