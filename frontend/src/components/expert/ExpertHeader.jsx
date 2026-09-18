import { FiUsers } from 'react-icons/fi';

import PageHeader from '@/components/ui/PageHeader';

export default function ExpertHeader(props) {
  return <PageHeader {...props} statusIcon={FiUsers} />;
}