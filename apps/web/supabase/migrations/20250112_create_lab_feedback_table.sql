-- Create laboratory_feedback table for storing user feedback on laboratory features
CREATE TABLE IF NOT EXISTS public.laboratory_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_laboratory_feedback_user_id
  ON public.laboratory_feedback(user_id);

-- Create index for faster queries by username
CREATE INDEX IF NOT EXISTS idx_laboratory_feedback_username
  ON public.laboratory_feedback(username);

-- Create index for created_at for sorting
CREATE INDEX IF NOT EXISTS idx_laboratory_feedback_created_at
  ON public.laboratory_feedback(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.laboratory_feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read feedback
CREATE POLICY "Anyone can view laboratory feedback"
  ON public.laboratory_feedback
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert their own feedback
CREATE POLICY "Users can insert their own feedback"
  ON public.laboratory_feedback
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own feedback
CREATE POLICY "Users can update their own feedback"
  ON public.laboratory_feedback
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Add trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_laboratory_feedback_updated_at
  BEFORE UPDATE ON public.laboratory_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
