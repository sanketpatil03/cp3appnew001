-- Create storage bucket for leave attachments
INSERT INTO storage.buckets (id, name, public) 
VALUES ('leave-attachments', 'leave-attachments', false);

-- Create storage policies for leave attachments
CREATE POLICY "Users can view their own leave attachments"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'leave-attachments' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload their own leave attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'leave-attachments' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own leave attachments"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'leave-attachments' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );