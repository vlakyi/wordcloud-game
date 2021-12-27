import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NickNameContext } from '../../contexts/NickNameContext';
import './Home.scss';

const Home = (): JSX.Element => {
  const { globalNickName, setGlobalNickName } = useContext(NickNameContext);
  const [nickName, setNickName] = useState(globalNickName);
  const navigate = useNavigate();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNickName(value);
  };

  const onButtonClick = () => {
    // To handle empty spaces as nickName
    const trimmedNickName = nickName.trim();

    if (trimmedNickName.length > 0) {
      setNickName(trimmedNickName);
      setGlobalNickName(trimmedNickName);
      navigate('../game');
    }
  };

  return (
    <section className="home-page">
      <h1 className="home-page__header">Wordcloud game</h1>
      <input
        className="home-page__input"
        placeholder="Enter your nickname here..."
        value={nickName}
        onChange={onInputChange}
      />
      <button onClick={onButtonClick}>play</button>
    </section>
  );
};

export default Home;
