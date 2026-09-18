import testimonialsData from '@/data/mock/testimonials.json';

/**
 * Service to fetch testimonials.
 * Currently uses mock data with demo disclaimer; connects to API later.
 */
export const testimonialService = {
  async getTestimonials() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...testimonialsData]), 50);
    });
  },
};

export default testimonialService;
