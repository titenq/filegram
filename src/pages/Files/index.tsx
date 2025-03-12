import { useEffect, useState } from 'react';

import { FaTrashAlt } from 'react-icons/fa';

import styles from '@/pages/Files/Files.module.css';
import { IFile } from '@/interfaces/fileInterface';
import { backendBaseUrl } from '@/helpers/baseUrl';

const Files = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchFiles = async () => {
      const response = await fetch(`${backendBaseUrl}/files`);
      const data = await response.json();

      setFiles(data);
      setLoading(false);
    };

    fetchFiles();
  }, [isDelete]);

  const handleDownload = async (fileId: string, filename: string) => {
    try {
      const response = await fetch(`${backendBaseUrl}/files/${fileId}/download`);

      if (!response.ok) throw new Error('Erro no download');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

    } catch (err) {
      console.error('Falha no download:', err);
    }
  };

  const handleDelete = async (id: string, messageId: string) => {
    try {
      await fetch(`${backendBaseUrl}/files/${id}/${messageId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDelete(true);
    }
  };

  return (
    <div>
      {files.length === 0 && !loading && (
        <div className={styles.no_files}>Nenhum arquivo encontrado</div>
      )}

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className={styles.container}>
          {files.map((file) => (
            <div key={file._id} className={styles.button_container}>
              <button
                onClick={() => handleDownload(file.telegramPath, file.filename)}
              >
                {file.filename}
              </button>

              <button
                className={styles.button_icon}
                onClick={() => handleDelete(file._id, file.telegramMessageId.toString())}
              >
                <FaTrashAlt size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Files;
