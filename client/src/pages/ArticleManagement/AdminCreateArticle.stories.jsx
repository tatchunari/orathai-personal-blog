import { fn } from 'storybook/test';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './../../context/authentication';
import AdminCreateArticle from './AdminCreateArticle';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Pages/AdminCreateArticle',
  component: AdminCreateArticle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onSave: fn() },

  argTypes: {
    title: { control: 'text' },
  },

  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>

        <Story />
        </AuthProvider>
      </MemoryRouter>
    )
  ],

};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
  },
};

export const WithLoading = {
  args: {
    loading: true
  },
};

export const WithData = {
  args: {
    form: {thumbnail_image: "",
    title: "",
    introduction: "",
    content: "",
    author: "test",
    category: "",
    }
  }};

export const WithError = {
  args: {
    errors: {
      name: "title",
      message: "Title is required"
    }
  },
};