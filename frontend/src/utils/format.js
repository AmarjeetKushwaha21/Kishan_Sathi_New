export function formatINR(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`;
}