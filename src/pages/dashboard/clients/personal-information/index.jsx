import React from "react";
import { FormProvider } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import usePersonalInformation from "./use-personal-information";
import DatePicker from "@/shared/date-picker";
import { PhoneInput } from "@/shared/phone-input";

const PersonalInformation = () => {
  const { methods, fieldsData, onSubmit, loading } = usePersonalInformation();

  // Group fields by section
  const groupedFields = fieldsData.reduce((acc, field) => {
    if (!acc[field.section]) {
      acc[field.section] = [];
    }
    acc[field.section].push(field);
    return acc;
  }, {});

  const sectionTitles = {
    personal: "Personal Information",
    contact: "Contact Information",
    address: "Address Information",
    family: "Family Information",
    status: "Status Information",
  };

  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <FormField
            key={field.id}
            control={methods.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {field.label}
                  {field.withAsterisk && (
                    <span className="text-red-500">*</span>
                  )}
                </FormLabel>
                <Select
                  {...formField}
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "textarea":
        return (
          <FormField
            key={field.id}
            control={methods.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {field.label}
                  {field.withAsterisk && (
                    <span className="text-red-500">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    {...formField}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "checkbox":
        return (
          <FormField
            key={field.id}
            control={methods.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    {field.label}
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "date":
        return (
          <FormField
            key={field.id}
            control={methods.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {field.label}
                  {field.withAsterisk && (
                    <span className="text-red-500">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder={field.placeholder}
                    {...formField}
                    value={formField.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "number":
        return (
          <FormField
            key={field.id}
            control={methods.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {field.label}
                  {field.withAsterisk && (
                    <span className="text-red-500">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    {...formField}
                    value={formField.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Convert to number if value exists and is not empty
                      formField.onChange(
                        value === "" ? undefined : Number(value)
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "phone":
        return (
          <FormField
            key={field.id}
            control={methods.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {field.label}
                  {field.withAsterisk && (
                    <span className="text-red-500">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder={field.placeholder}
                    autoFocus={field.focus}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormField
            key={field.id}
            control={methods.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {field.label}
                  {field.withAsterisk && (
                    <span className="text-red-500">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                    value={formField.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <div className="h-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {Object.entries(groupedFields).map(([section, fields]) => (
            <Card key={section} className="w-full ">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {sectionTitles[section]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className={`${
                        field.type === "textarea"
                          ? "md:col-span-2 lg:col-span-3"
                          : ""
                      } ${
                        field.type === "checkbox"
                          ? "md:col-span-2 lg:col-span-1"
                          : ""
                      }`}
                    >
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end gap-4 pt-6">
            <Button type="button" variant="outline" className="px-8">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="px-8">
              {loading ? "Updating..." : "Update Client"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PersonalInformation;
