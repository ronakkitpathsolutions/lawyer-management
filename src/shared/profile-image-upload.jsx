import React from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProfileImageUpload = ({
  imageUrl,
  userName = '',
  uploading = false,
  onImageUpload,
  className
}) => {
  const fileInputRef = React.useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
          <AvatarImage 
            src={imageUrl} 
            alt={userName}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        
        {/* Upload overlay */}
        <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={triggerFileInput}
            disabled={uploading}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Camera className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={triggerFileInput}
          disabled={uploading}
          className="gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Change Photo
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          JPG, PNG or GIF. Max size 5MB.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;
