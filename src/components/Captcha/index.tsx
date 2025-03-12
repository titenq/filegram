import { useState, useEffect } from 'react';

import styles from '@/components/Captcha/Captcha.module.css';

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

const Captcha = ({ onValidate }: CaptchaProps) => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const generateNumbers = () => {
    setNumber1(Math.floor(Math.random() * 10));
    setNumber2(Math.floor(Math.random() * 10));
    setUserAnswer('');
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setUserAnswer(answer);
    onValidate(Number(answer) === number1 + number2);
  };

  return (
    <div className={styles.captcha_container}>
      <span>{number1} + {number2} = </span>
      <input
        type="number"
        value={userAnswer}
        onChange={handleChange}
        placeholder="?"
      />
    </div>
  );
};

export default Captcha;
