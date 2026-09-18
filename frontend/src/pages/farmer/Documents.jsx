import { useState } from 'react';
import { FiFileText, FiUpload } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import DocumentRow from '@/components/farmer/DocumentRow';
import { useFarmer } from '@/context/FarmerContext';

export default function Documents() {
  const { documents } = useFarmer();
  const [extra, setExtra] = useState([]);

  const all = [...extra, ...documents];
  const verified = all.filter((d) => d.status === 'verified').length;
  const pending = all.filter((d) => d.status === 'pending').length;
  const expired = all.filter((d) => d.status === 'expired').length;

  function onUpload() {
    setExtra((prev) => [
      {
        id: `up-${Date.now()}`,
        name: 'New uploaded document',
        type: 'Uploaded',
        ref: 'Awaiting review',
        status: 'pending',
        updated: 'Just now',
      },
      ...prev,
    ]);
  }

  return (
    <PageTransition>
      <FarmerHeader title="Documents" subtitle="Land records, identity and licences" showBack status={`${verified} verified`} />

      <div className="flex flex-wrap gap-2">
        <Badge variant="primary" size="md">✓ {verified} Verified</Badge>
        <Badge variant="accent" size="md">⏳ {pending} Pending</Badge>
        {expired > 0 && <Badge variant="danger" size="md">! {expired} Expired</Badge>}
      </div>

      <div className="mt-5 space-y-3">
        {all.map((doc) => (
          <DocumentRow key={doc.id} document={doc} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-primary-300 bg-primary-50/40 p-4 text-center">
        <p className="text-xs text-gray-500">
          Upload your land records, passbook or soil health card. Documents are verified within 24 hours.
        </p>
        <Button className="mt-3" leftIcon={FiUpload} onClick={onUpload}>
          Upload new document
        </Button>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
        <FiFileText className="text-primary-500" aria-hidden="true" /> PDF, JPG or PNG up to 5 MB each.
      </p>
    </PageTransition>
  );
}