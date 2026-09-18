/**
 * Service to handle collaboration partnership requests.
 * Frontend prototype: simulates submitting partner collaboration inquiry.
 * Future: connects to POST /api/collaborate -> Node.js/Express + MongoDB.
 */
export const collaborationService = {
  async submitCollaboration(collabData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Collaboration request received. Our partnerships team will get in touch.',
          receivedAt: new Date().toISOString(),
          data: collabData,
        });
      }, 400);
    });
  },
};

export default collaborationService;
