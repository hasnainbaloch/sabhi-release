import './App.less';
import ProvideAuth from './context/Auth';
import SocketProvider from './context/Socket';

import AppRoutes from './Routes';

const App = () => (
  <div className="App">
    <ProvideAuth>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </ProvideAuth>
  </div>
);

export default App;
