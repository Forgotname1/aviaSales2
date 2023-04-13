import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from './components/header/header';
import Content from './components/Content/content';
import { getTickets } from './store/appSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const stop = useSelector((state) => state.stop);
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch, stop]);
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
