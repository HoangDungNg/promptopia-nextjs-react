import '@styles/globals.css';
import { Nav, Provider } from '@components';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
};

// Implement Search: Search by prompt, search by tag, search by username
// Implement Click on tag
// Implement view other profiles

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
