import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useTransition, animated, useSpringRef, useChain, config } from '@react-spring/web';
import axios from 'axios';
import { Receipt } from './types';
import styles from './styles.module.css';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Receipt[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/receipt');
        setData(response.data.body);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : '#282c34',
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {!open && (
        <button className={styles.expandButton} onClick={() => setOpen(true)}>
          Expand
        </button>
      )}
      {open && (
        <button className={styles.backButton} onClick={() => setOpen(false)}>
          Back
        </button>
      )}
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
      >
        {transition((style, item) => (
          <animated.div
            key={item._id}
            className={styles.item}
            style={{ ...style, background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}
          >
            <div>
              <div className={styles.name}>{item.profesional_id.nombre1} {item.profesional_id.apellPat}</div>
              <div className={styles.name}>{item.persona_id.rut}</div>
            </div>
          </animated.div>
        ))}
      </animated.div>
    </div>
  );
}

export default App;
