import { PUBLIC_PAGES } from '@/data/publicPages';
import FeaturePage from '@/components/public/FeaturePage';

export default function DiseaseDetectionPage() {
  return <FeaturePage page={PUBLIC_PAGES['disease-detection']} />;
}
