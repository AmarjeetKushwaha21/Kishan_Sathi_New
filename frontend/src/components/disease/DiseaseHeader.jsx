import { FiShield } from 'react-icons/fi';

import PageHeader from '@/components/ui/PageHeader';

export default function DiseaseHeader(props) {
  return <PageHeader {...props} statusIcon={FiShield} />;
}
