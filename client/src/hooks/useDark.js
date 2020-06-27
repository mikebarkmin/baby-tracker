import useLocalStorage from './useLocalStorage';

function useDark() {
  const [dark, setDark] = useLocalStorage('dark', false);
  return [dark, setDark];
}

export default useDark;
