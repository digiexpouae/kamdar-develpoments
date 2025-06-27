import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Metadata } from 'next';

export const metadata = {
  title: 'Project 105 - Kamdar Developments',
  description: 'Project 105 - Sophisticated Living in the Heart of JVC',
};

export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
