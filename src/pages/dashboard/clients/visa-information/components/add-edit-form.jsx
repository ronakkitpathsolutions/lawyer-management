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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/shared/date-picker";

const AddEditForm = ({ onClose, visa = null, initialData = null }) => {
  // Support both prop names for backwards compatibility
  const visaData = visa || initialData;
  
  const {
    methods,
    fieldsData,
    onSubmit,
    loading,
    notification,
    isEditing,
  } = useAddEditForm({ onClose, visa: visaData });

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
                  <FormItem>
                    <FormLabel>
                      {field.label}
                      {field.withAsterisk && <span className="text-destructive ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                      {field.type === 'select' ? (
                        <Select
                          value={formField.value}
                          onValueChange={formField.onChange}
                          disabled={loading}
                        >
                          <SelectTrigger autoFocus={field.focus}>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                          disabled={loading}
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
                isEditing ? 'Update Visa' : 'Add Visa'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEditForm;