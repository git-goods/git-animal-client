import { supabase } from '@/lib/supabase/client';

export interface LaboratoryUpvote {
  id: string;
  user_id: string;
  username: string;
  laboratory_id: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUpvoteRequest {
  user_id: string;
  username: string;
  laboratory_id: string;
}

export interface CheckUpvoteResponse {
  hasUpvoted: boolean;
  upvote?: LaboratoryUpvote;
}

/**
 * Create or update laboratory upvote
 */
export async function createOrUpdateUpvote(request: CreateUpvoteRequest): Promise<LaboratoryUpvote> {
  // Check if upvote already exists for this user + laboratory combination
  const { data: existingUpvote, error: checkError } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .eq('user_id', request.user_id)
    .eq('laboratory_id', request.laboratory_id)
    .maybeSingle();

  if (checkError) {
    throw new Error(`Failed to check existing upvote: ${checkError.message}`);
  }

  // If upvote exists, update timestamp
  if (existingUpvote) {
    const typedUpvote = existingUpvote as LaboratoryUpvote;
    const { data, error } = await supabase
      .from('laboratory_feedback')
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq('id', typedUpvote.id)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to update upvote: ${error?.message ?? 'No data returned'}`);
    }

    return data as LaboratoryUpvote;
  }

  // Otherwise, create new upvote
  const { data, error } = await supabase
    .from('laboratory_feedback')
    .insert({
      user_id: request.user_id,
      username: request.username,
      laboratory_id: request.laboratory_id,
      description: null,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create upvote: ${error?.message ?? 'No data returned'}`);
  }

  return data as LaboratoryUpvote;
}

/**
 * Check if user has already upvoted for a specific laboratory
 */
export async function checkUserUpvote(userId: string, laboratoryId: string): Promise<CheckUpvoteResponse> {
  const { data, error } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .eq('user_id', userId)
    .eq('laboratory_id', laboratoryId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to check user upvote: ${error.message}`);
  }

  return {
    hasUpvoted: !!data,
    upvote: data ? (data as LaboratoryUpvote) : undefined,
  };
}

/**
 * Get all laboratory upvotes for a specific laboratory
 */
export async function getAllUpvotes(laboratoryId: string): Promise<LaboratoryUpvote[]> {
  const { data, error } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .eq('laboratory_id', laboratoryId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    throw new Error(`Failed to get upvotes: ${error?.message ?? 'No data returned'}`);
  }

  return data as LaboratoryUpvote[];
}

/**
 * Get upvote count for a specific laboratory
 */
export async function getUpvoteCount(laboratoryId: string): Promise<number> {
  const { count, error } = await supabase
    .from('laboratory_feedback')
    .select('*', { count: 'exact', head: true })
    .eq('laboratory_id', laboratoryId);

  if (error) {
    throw new Error(`Failed to get upvote count: ${error.message}`);
  }

  return count ?? 0;
}
