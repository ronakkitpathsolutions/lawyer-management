import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/utils/validations";
import useProfileStore from "./use-profile-store";
import { toastError, toastSuccess } from "@/lib/toast";
import { api } from "@/api";
import useAsyncOperation from "@/hooks/use-async-operation";

const useProfile = () => {
  const { data, getData } = useProfileStore();
  
  // Async operations for better error handling and loading states
  const [
    executeUpdateProfile,
    updating
  ] = useAsyncOperation(async (formData) => {
    const response = await api.auth.updateProfile({ data: formData });
    toastSuccess("Profile updated successfully!");
    
    // Update user data in auth context
    console.log('response?.data?.data :>> ', response?.data?.data);
    
    // Refresh profile data
    await getData();
  });

  const [executeImageUpload, uploading] = useAsyncOperation(async (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toastError("Please select a valid image file (JPEG, PNG, GIF)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toastError("Image size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append('profile', file);

    await api.auth.updateProfile({ data: formData });
    toastSuccess("Profile image updated successfully!");
    
    // Refresh profile data
    await getData();
  });

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
    },
  });

  React.useEffect(() => {
    getData();
  }, [getData]);

  React.useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
      });
    }
  }, [data, form]);

  return {
    form,
    data,
    updating,
    uploading,
    handleUpdateProfile: executeUpdateProfile,
    handleImageUpload: executeImageUpload,
  };
}

export default useProfile