/**
 * Service to handle contact form submissions.
 * Frontend prototype: simulates submission, validates, and resolves.
 * Future: connects to POST /api/contact -> Node.js/Express + MongoDB.
 */
export const contactService = {
  async submitContact(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!formData.name || !formData.phone) {
          reject(new Error('Please provide at least a name and contact phone number.'));
          return;
        }
        resolve({
          success: true,
          message: 'Thank you for reaching out! We will contact you soon.',
          receivedAt: new Date().toISOString(),
          data: formData,
        });
      }, 400);
    });
  },
};

export default contactService;
