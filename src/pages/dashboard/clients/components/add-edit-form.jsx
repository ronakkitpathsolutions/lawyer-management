import React from "react";
import useAddEditForm from "./use-add-edit-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DatePicker from "@/shared/date-picker";

const AddEditForm = ({ onClose, client = null }) => {
  const {
    methods,
    fieldsData,
    onSubmit,
    loading,
    notification,
    isEditing,
  } = useAddEditForm({ onClose, client });

  return (
    <div className="w-full">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {notification}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldsData.map((field) => (
              <FormField
                key={field.id}
                control={methods.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <FormLabel>
                      {field.label}
                      {field.withAsterisk && <span className="text-destructive ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                      {field.type === 'textarea' ? (
                        <Textarea
                          placeholder={field.placeholder}
                          autoFocus={field.focus}
                          {...formField}
                        />
                      ) : field.type === 'date' ? (
                        <DatePicker
                          value={formField.value}
                          onChange={formField.onChange}
                          placeholder={field.placeholder}
                          disabled={loading}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          autoFocus={field.focus}
                          {...formField}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditing ? 'Update Client' : 'Add Client'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEditForm;
