/** @type { import('@storybook/react-vite').Preview } */
import "./../src/App.css";
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './../src/context/authentication';
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};


export default preview;