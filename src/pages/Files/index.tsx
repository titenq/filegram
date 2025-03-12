import { useEffect, useState } from 'react';

import { FaTrashAlt } from 'react-icons/fa';

import styles from '@/pages/Files/Files.module.css';
import { IFile } from '@/interfaces/fileInterface';
import getFiles from '@/api/getFiles';
import getFile from '@/api/getFile';
import deleteFile from '@/api/deleteFile';

const Files = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchFiles = async () => {
      const response = await getFiles();

      setFiles(response);
      setLoading(false);
    };

    fetchFiles();
  }, [isDelete]);

  const handleDownload = async (fileId: string, filename: string) => {
    await getFile(fileId, filename);
  };

  const handleDelete = async (id: string, messageId: string) => {
    await deleteFile(id, messageId);
    
    setIsDelete(true);
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
