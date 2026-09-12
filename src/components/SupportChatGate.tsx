import { useLocation } from 'react-router-dom';
import SupportChat from '@/components/SupportChat';

const SupportChatGate = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/support-admin')) return null;
  return <SupportChat />;
};

export default SupportChatGate;
