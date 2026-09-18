import { FiTruck } from 'react-icons/fi';

import PageHeader from '@/components/ui/PageHeader';

export default function LogisticsHeader(props) {
  return <PageHeader {...props} statusIcon={FiTruck} />;
}