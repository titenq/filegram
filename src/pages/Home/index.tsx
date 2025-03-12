import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from '@/pages/Home/Home.module.css';
import login from '@/api/login';
import Modal from '@/components/Modal';
import { useAuth } from '@/hooks/useAuth';
import Captcha from '@/components/Captcha';
import logo from '@/assets/filegram.png';

const Home = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      setModalMessage('Por favor, complete o captcha corretamente');
      setIsModalOpen(true);

      return;
    }

    if (!username || !password) {
      setModalMessage('Preencha todos os campos');
      setIsModalOpen(true);
      
      return;
    }
    
    const response = await login(username, password);

    if (response.error) {
      setModalMessage(`Erro no login: ${response.error}`);
      setIsModalOpen(true);

      return;
    }

    if (!response.login) {
      setModalMessage('Usuário ou senha inválidos');
      setIsModalOpen(true);

      return;
    }

    setIsAuthenticated(true);
    navigate('/arquivos');
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        <div className={styles.logo_container}>
          <img
            src={logo}
            width={96}
            height={75}
            className={styles.logo_header}
            alt="Filegram logo"
          />
          <h1 className={styles.title}>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label className={styles.label} htmlFor="username">Usuário</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label} htmlFor="password">Senha</label>
            <div className={styles.password_container}>
              <input
                className={styles.input}
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div onClick={handlePasswordVisible} className={styles.icon_container}>
                {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
          </div>

          <Captcha onValidate={setIsCaptchaValid} />

          <button
            className={styles.login_button}
            type="submit"
          >
            Logar
          </button>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
