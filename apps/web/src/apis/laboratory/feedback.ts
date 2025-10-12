import { supabase } from '@/lib/supabase/client';

export interface LaboratoryUpvote {
  id: string;
  user_id: string;
  username: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUpvoteRequest {
  user_id: string;
  username: string;
}

export interface CheckUpvoteResponse {
  hasUpvoted: boolean;
  upvote?: LaboratoryUpvote;
}

/**
 * Create or update laboratory upvote
 */
export async function createOrUpdateUpvote(request: CreateUpvoteRequest): Promise<LaboratoryUpvote> {
  // Check if upvote already exists for this user
  const { data: existingUpvote, error: checkError } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .eq('user_id', request.user_id)
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
 * Check if user has already upvoted
 */
export async function checkUserUpvote(userId: string): Promise<CheckUpvoteResponse> {
  const { data, error } = await supabase.from('laboratory_feedback').select('*').eq('user_id', userId).maybeSingle();

  if (error) {
    throw new Error(`Failed to check user upvote: ${error.message}`);
  }

  return {
    hasUpvoted: !!data,
    upvote: data ? (data as LaboratoryUpvote) : undefined,
  };
}

/**
 * Get all laboratory upvotes
 */
export async function getAllUpvotes(): Promise<LaboratoryUpvote[]> {
  const { data, error } = await supabase
    .from('laboratory_feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    throw new Error(`Failed to get upvotes: ${error?.message ?? 'No data returned'}`);
  }

  return data as LaboratoryUpvote[];
}

/**
 * Get upvote count
 */
export async function getUpvoteCount(): Promise<number> {
  const { count, error } = await supabase.from('laboratory_feedback').select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Failed to get upvote count: ${error.message}`);
  }

  return count ?? 0;
}
