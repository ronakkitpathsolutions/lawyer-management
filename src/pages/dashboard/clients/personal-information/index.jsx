import React from "react";
import { FormProvider } from "react-hook-form";
import { PLACEHOLDER_MESSAGES as msg } from "@/utils/constants";
import Confirmation from "@/shared/confirmation";
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
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PersonalInformation = () => {
  const {
    methods,
    fieldsData,
    onSubmit,
    loading,
    memberFields,
    appendMember,
    removeMember,
    memberDetails,
    handleOpenDeleteMember,
    handleCloseDeleteMember,
    isOpenDeleteMember,
    handleDeleteConfirm,
    deleteLoading,
  } = usePersonalInformation();

  // Group fields by section
  const groupedFields = fieldsData.reduce((acc, field) => {
    if (!acc[field.section]) {
      acc[field.section] = [];
    }
    acc[field.section].push(field);
    return acc;
  }, {});

  const sectionTitles = {
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
              <FormItem className="flex flex-row items-center mt-4 space-x-3 space-y-0">
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
                        value === "" ? undefined : Number(value),
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
    <>
      <div className="h-full">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {groupedFields.personal ? (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedFields.personal.map((field) => (
                      <div key={field.id}>{renderField(field)}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {memberFields?.length
                    ? "Add More Member"
                    : "Would you like to include your partner or family members in your application?"}
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendMember(memberDetails, {
                      focusIndex: memberFields.length, // Focus on the newly added member
                    })
                  }
                >
                  + Add More
                </Button>
              </CardHeader>

              <CardContent
                className={cn(
                  "w-full space-y-6",
                  !memberFields?.length ? "hidden" : "",
                )}
              >
                {memberFields.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative border rounded-lg p-6 bg-muted/30"
                  >
                    {/* Delete Button */}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 rounded-tl-none rounded-br-none"
                      onClick={() =>
                        item?.id
                          ? handleOpenDeleteMember(item.id)
                          : removeMember(index)
                      }
                    >
                      <Trash2 size={16} />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Member Name */}
                      {renderField({
                        id: `member_name_${index}`,
                        name: `relationships.${index}.member_name`,
                        type: "text",
                        label: "Member Name",
                        placeholder: msg.default("member name"),
                      })}

                      {/* Member Email */}
                      {renderField({
                        id: `member_email_${index}`,
                        name: `relationships.${index}.member_email`,
                        type: "email",
                        label: "Email",
                        placeholder: msg.default("email"),
                      })}

                      {/* Relationship */}
                      {renderField({
                        id: `relationship_${index}`,
                        name: `relationships.${index}.relationship`,
                        type: "select",
                        label: "Relationship",
                        placeholder: msg.default("relationship"),
                        options: [
                          { value: "spouse", label: "Spouse" },
                          { value: "child", label: "Child" },
                          { value: "parent", label: "Parent" },
                          { value: "sibling", label: "Sibling" },
                          { value: "dependent", label: "Dependent" },
                          { value: "other", label: "Other" },
                        ],
                      })}

                      {/* Date of Birth */}
                      {renderField({
                        id: `dob_${index}`,
                        name: `relationships.${index}.date_of_birth`,
                        type: "date",
                        label: "Date of Birth",
                        placeholder: msg.default("date of birth"),
                      })}

                      {/* Contact Number */}
                      {renderField({
                        id: `contact_${index}`,
                        name: `relationships.${index}.contact_number`,
                        type: "phone",
                        label: "Contact Number",
                        placeholder: msg.default("contact number"),
                      })}

                      {/* Nationality */}
                      {renderField({
                        id: `nationality_${index}`,
                        name: `relationships.${index}.nationality`,
                        type: "text",
                        label: "Nationality",
                        placeholder: msg.default("nationality"),
                      })}

                      {/* Passport Number */}
                      {renderField({
                        id: `passport_${index}`,
                        name: `relationships.${index}.passport_number`,
                        type: "text",
                        label: "Passport Number",
                        placeholder: msg.default("passport number"),
                      })}

                      {/* Yellow / Pink Card */}
                      {renderField({
                        id: `yellow_${index}`,
                        name: `relationships.${index}.has_yellow_or_pink_card`,
                        type: "checkbox",
                        label: "Has Yellow / Pink Card?",
                      })}

                      {/* Property in Thailand */}
                      {renderField({
                        id: `property_${index}`,
                        name: `relationships.${index}.has_bought_property_in_thailand`,
                        type: "checkbox",
                        label: "Has Bought Property in Thailand?",
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            {["contact", "address", "family", "status"].map((section) =>
              groupedFields[section] ? (
                <Card key={section} className="w-full">
                  <CardHeader>
                    <CardTitle>{sectionTitles[section]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groupedFields[section].map((field) => (
                        <div key={field.id}>{renderField(field)}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null,
            )}

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
      <Confirmation
        open={isOpenDeleteMember}
        handleClose={handleCloseDeleteMember}
        title="Delete Member"
        description="Are you sure you want to delete this member?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        handleSubmit={handleDeleteConfirm}
      />
    </>
  );
};

export default PersonalInformation;
