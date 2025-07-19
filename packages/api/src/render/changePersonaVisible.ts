import { renderPatch } from '../_instance';
import { Persona } from './schema';

export interface ChangePersonaVisibleRequest {
  personaId: string;
  visible: boolean;
  type: 'APP' | 'DEFAULT';
}

export type ChangePersonaVisibleResponse = Persona;

export const changePersonaVisible = async (
  request: ChangePersonaVisibleRequest,
): Promise<ChangePersonaVisibleResponse> => renderPatch(`/personas`, request);
