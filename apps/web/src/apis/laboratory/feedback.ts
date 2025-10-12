import { supabase } from '@/lib/supabase/client';

export interface LaboratoryFeedback {
  id: string;
  user_id: string;
  username: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateFeedbackRequest {
  user_id: string;
  username: string;
  description?: string;
}

export interface CheckFeedbackResponse {
  hasUpvoted: boolean;
  feedback?: LaboratoryFeedback;
}

/**
 * Create or update laboratory feedback (upvote)
 */
export async function createOrUpdateFeedback(
  request: CreateFeedbackRequest,
): Promise<LaboratoryFeedback> {
  // Check if feedback already exists for this user
  const { data: existingFeedback, error: checkError } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .eq('user_id', request.user_id)
    .maybeSingle();

  if (checkError) {
    throw new Error(`Failed to check existing feedback: ${checkError.message}`);
  }

  // If feedback exists, update it
  if (existingFeedback) {
    const typedFeedback = existingFeedback as LaboratoryFeedback;
    const { data, error } = await supabase
      .from('laboratory_feedback')
      .update({
        description: request.description,
        updated_at: new Date().toISOString(),
      })
      .eq('id', typedFeedback.id)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to update feedback: ${error?.message ?? 'No data returned'}`);
    }

    return data as LaboratoryFeedback;
  }

  // Otherwise, create new feedback
  const { data, error } = await supabase
    .from('laboratory_feedback')
    .insert({
      user_id: request.user_id,
      username: request.username,
      description: request.description,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create feedback: ${error?.message ?? 'No data returned'}`);
  }

  return data as LaboratoryFeedback;
}

/**
 * Check if user has already upvoted
 */
export async function checkUserFeedback(userId: string): Promise<CheckFeedbackResponse> {
  const { data, error } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to check user feedback: ${error.message}`);
  }

  return {
    hasUpvoted: !!data,
    feedback: data ? (data as LaboratoryFeedback) : undefined,
  };
}

/**
 * Get all laboratory feedback
 */
export async function getAllFeedback(): Promise<LaboratoryFeedback[]> {
  const { data, error } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    throw new Error(`Failed to get feedback: ${error?.message ?? 'No data returned'}`);
  }

  return data as LaboratoryFeedback[];
}

/**
 * Get feedback count
 */
export async function getFeedbackCount(): Promise<number> {
  const { count, error } = await supabase
    .from('laboratory_feedback')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Failed to get feedback count: ${error.message}`);
  }

  return count ?? 0;
}
