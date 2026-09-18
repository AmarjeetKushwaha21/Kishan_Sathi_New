import { FiFileText } from 'react-icons/fi';

import PageHeader from '@/components/ui/PageHeader';

export default function SoilHeader(props) {
  return <PageHeader {...props} statusIcon={FiFileText} />;
}