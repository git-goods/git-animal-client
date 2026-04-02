import { STATIC_IMAGE_URL } from '@/shared/config/outlink';

export const getPersonaImage = (type: string) => `${STATIC_IMAGE_URL}/personas/${type}`;

export const getBackgroundImage = (type: string) => `${STATIC_IMAGE_URL}/backgrounds/${type}`;
