import { useContext, useEffect, useRef } from 'react';
import Context from '../contexts/SocketContext';

function useSocket(eventKey, callback) {
  const socket = useContext(Context);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (eventKey) {
      function socketHandler() {
        callbackRef.current && callbackRef.current.apply(this, arguments);
      }

      socket.on(eventKey, socketHandler);
      return () => socket.removeListener(eventKey, socketHandler);
    }
  }, [eventKey, socket]);

  return socket;
}

export default useSocket;
