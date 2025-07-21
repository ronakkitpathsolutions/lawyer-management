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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import DatePicker from "@/shared/date-picker";
import FileUpload from "@/shared/file-upload";
import { MultiSelect } from "@/shared/multi-select";

const AddEditForm = ({ onClose, property = null, initialData = null }) => {
    // Support both prop names for backwards compatibility
    const propertyData = property || initialData;

    const {
        methods,
        fieldsData,
        onSubmit,
        loading,
        notification,
        isEditing,
    } = useAddEditForm({ onClose, property: propertyData });

    // Group fields by section
    const groupedFields = fieldsData.reduce((acc, field) => {
        if (!acc[field.section]) {
            acc[field.section] = [];
        }
        acc[field.section].push(field);
        return acc;
    }, {});

    // Section titles mapping
    const sectionTitles = {
        basic: "Basic Information",
        dates: "Important Dates",
        financial: "Financial Information",
        payment: "Payment Details",
        details: "Property Details",
        costs: "Cost Sharing",
        documents: "Documentation & Attachments"
    };

    const renderField = (field, hideLabel = false) => {
        if (!field) return null; // Safety check

        return (
            <FormField
                key={field.id}
                control={methods.control}
                name={field.name}
                render={({ field: formField }) => (
                    <FormItem className={field.type !== 'multi-select' ? "space-y-2" : "space-y-1"}>
                        {!hideLabel && field.label && (
                            <FormLabel
                                className="text-sm font-semibold text-gray-900 block mb-1"
                                style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}
                            >
                                {field.label}
                                {field.withAsterisk && <span className="text-red-500 ml-1">*</span>}
                            </FormLabel>
                        )}
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
                            ) : field.type === 'multi-select' ? (
                                <MultiSelect
                                    options={field.options || []}
                                    value={formField.value || []}
                                    onChange={formField.onChange}
                                    placeholder={field.placeholder}
                                    disabled={loading}
                                />
                            ) : field.type === 'date' ? (
                                <DatePicker
                                    value={formField.value}
                                    onChange={formField.onChange}
                                    placeholder={field.placeholder}
                                    disabled={loading}
                                />
                            ) : field.type === 'checkbox' ? (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={field.id}
                                        checked={formField.value}
                                        onCheckedChange={formField.onChange}
                                        disabled={loading}
                                    />
                                </div>
                            ) : field.type === 'file' ? (
                                <FileUpload
                                    value={formField.value}
                                    onChange={(file) => {
                                        formField.onChange(file);
                                    }}
                                    onRemove={() => formField.onChange("")}
                                    placeholder={field.placeholder}
                                    disabled={loading}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    maxSize={10 * 1024 * 1024} // 10MB
                                />
                            ) : field.type === 'number' ? (
                                <Input
                                    type="number"
                                    placeholder={field.placeholder}
                                    autoFocus={field.focus}
                                    disabled={loading}
                                    step="0.01"
                                    min="0"
                                    {...formField}
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
                        {field.note && (
                            <p className="text-sm text-red-500 mt-1">{field.note}</p>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
    };

    // Special renderer for document sections with better grouping
    const renderDocumentSection = (fields) => {
        // Group document fields by their type (land title, house title, etc.)
        const documentGroups = {
            landTitle: {
                select: fields.find(f => f.name === 'land_title'),
                upload: fields.find(f => f.name === 'land_title_document')
            },
            houseTitle: {
                select: fields.find(f => f.name === 'house_title'),
                upload: fields.find(f => f.name === 'house_title_document')
            },
            houseRegistration: {
                upload: fields.find(f => f.name === 'house_registration_book')
            },
            landLease: {
                upload: fields.find(f => f.name === 'land_lease_agreement')
            }
        };

        return (
            <div className="space-y-4">
                {/* Land Title Group */}
                {documentGroups.landTitle.select && (
                    <div>
                        <div className="space-y-4">
                            {renderField(documentGroups.landTitle.select)}
                            {documentGroups.landTitle.upload && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Upload Document
                                    </label>
                                    {renderField(documentGroups.landTitle.upload, true)}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* House Title Group */}
                {documentGroups.houseTitle.select && (
                    <div>
                        <div className="space-y-4">
                            {renderField(documentGroups.houseTitle.select)}
                            {documentGroups.houseTitle.upload && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Upload Document
                                    </label>
                                    {renderField(documentGroups.houseTitle.upload, true)}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* House Registration Book */}
                    {documentGroups.houseRegistration.upload && (
                        <div>
                            <FormLabel>
                                House Registration Book
                            </FormLabel>
                            <div>
                                {renderField(documentGroups.houseRegistration.upload, true)}
                            </div>
                        </div>
                    )}

                    {/* Land Lease Agreement */}
                    {documentGroups.landLease.upload && (
                        <div>
                            <FormLabel>
                                Land Lease Agreement
                            </FormLabel>
                            <div>
                                {renderField(documentGroups.landLease.upload, true)}
                            </div>
                        </div>
                    )}
                </div>
            </div >
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                    {notification}

                    <div className="max-h-[calc(100vh-176px)] overflow-y-auto px-2 space-y-8">
                        {Object.entries(groupedFields).map(([sectionKey, fields]) => (
                            <div key={sectionKey} className="space-y-4">
                                <div className="border-b pb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {sectionTitles[sectionKey] || sectionKey}
                                    </h3>
                                </div>
                                {sectionKey === 'documents' ? (
                                    <div className="space-y-6">
                                        {renderDocumentSection(fields)}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {fields.filter(field => !field.hidden).map((field) => renderField(field))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t sticky bottom-0 bg-white">
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
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    {isEditing ? 'Updating...' : 'Adding...'}
                                </>
                            ) : (
                                isEditing ? 'Update Property' : 'Add Property'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddEditForm;