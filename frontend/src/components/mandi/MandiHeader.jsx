import { FiTrendingUp } from 'react-icons/fi';

import PageHeader from '@/components/ui/PageHeader';

export default function MandiHeader(props) {
  return <PageHeader {...props} statusIcon={FiTrendingUp} />;
}