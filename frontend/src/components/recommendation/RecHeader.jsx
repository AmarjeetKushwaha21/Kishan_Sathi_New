import { FiCpu } from 'react-icons/fi';

import PageHeader from '@/components/ui/PageHeader';

export default function RecHeader(props) {
  return <PageHeader {...props} status="AI Sathi" statusIcon={FiCpu} />;
}