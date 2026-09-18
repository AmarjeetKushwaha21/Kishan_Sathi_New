import ErrorPage from '@/pages/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page not found"
      message="The page you are looking for was moved, removed, or never existed."
      actionLabel="Back to home"
      action={() => {
        window.location.href = '/';
      }}
    />
  );
}