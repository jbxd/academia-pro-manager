
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const PhotoUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user, updateUserData } = useAuth();
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecione uma imagem.');
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 2MB.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      // Update the profile in the database
      // The profiles table has integer id field, not UUID type
      // Just save the avatar URL in the bio field since we don't have a proper avatar field
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ bio: `User with avatar: ${data.publicUrl}` })
        .eq('user_id', user.id); // Use user_id instead of id field
      
      if (updateError) throw updateError;
      
      // Update the user context
      await updateUserData({ avatar: data.publicUrl });
      
      toast.success('Foto atualizada com sucesso!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Erro ao atualizar a foto. Tente novamente.');
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  
  return (
    <>
      <Avatar className="h-32 w-32">
        <AvatarImage src={user?.avatar} alt={user?.name} />
        <AvatarFallback className="text-2xl">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <Button 
        variant="outline" 
        onClick={handleClick}
        disabled={isUploading}
        className="bg-custom-red text-white hover:bg-custom-red/80 border-none"
      >
        {isUploading ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2">⏳</span>
            Enviando...
          </span>
        ) : (
          <>
            <Camera className="h-4 w-4 mr-2" />
            Alterar foto
          </>
        )}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </>
  );
};
