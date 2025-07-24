import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { propertyValidationSchema } from "@/utils/validations";
import {
    PLACEHOLDER_MESSAGES as msg,
    ACTION_MESSAGES,
    TYPE_OF_TRANSACTION_OPTIONS,
    TYPE_OF_PROPERTY_OPTIONS,
    ACCEPTABLE_PAYMENT_METHODS_OPTIONS,
    PLACE_OF_PAYMENT_OPTIONS,
    PROPERTY_CONDITION_OPTIONS,
    FURNITURE_INCLUDED_OPTIONS,
    HOUSE_TITLE_OPTIONS,
    LAND_TITLE_OPTIONS,
    DECLARED_LAND_OFFICE_PRICE_OPTIONS,
    YES_NO_OPTIONS,
    BUYER_SELLER_COST_OPTIONS,
    LESSEE_LESSOR_COST_OPTIONS,
    MORTGAGOR_MORTGAGEE_COST_OPTIONS,
    USUFRUCTUARY_OWNER_COST_OPTIONS,
    SERVITUDE_COST_OPTIONS,
    HANDOVER_DATE_OPTIONS,
    INTENDED_CLOSING_DATE_OPTIONS,
} from "@/utils/constants";
import useAsyncOperation from "@/hooks/use-async-operation";
import { api } from "@/api";
import { toastSuccess } from "@/lib/toast";
import usePropertyStore from "../use-property-store";
import { useParams } from "react-router";
import { removeEmptyFields } from "@/utils/helper";

const useAddEditForm = ({ onClose, property = null }) => {
    const { id } = useParams(); // client id from route params
    const { getAll, params } = usePropertyStore();
    const isEditing = Boolean(property);

    const initialValues = useMemo(() => ({
        property_name: property?.property_name || "",
        agent_name: property?.agent_name || "",
        broker_company: property?.broker_company || "",
        transaction_type: property?.transaction_type 
            ? (typeof property.transaction_type === 'string' 
                ? property.transaction_type.split(',').filter(Boolean)
                : Array.isArray(property.transaction_type) 
                    ? property.transaction_type 
                    : [])
            : [],
        property_type: property?.property_type || "",
        reservation_date: property?.reservation_date || "",
        intended_closing_date_specific: property?.intended_closing_date_specific || "",
        intended_closing_date: property?.intended_closing_date || "",
        handover_date: property?.handover_date || "",
        selling_price: property?.selling_price || "",
        deposit: property?.deposit || "",
        intermediary_payment: property?.intermediary_payment || "",
        closing_payment: property?.closing_payment || "",
        acceptable_method_of_payment: property?.acceptable_method_of_payment 
            ? (typeof property.acceptable_method_of_payment === 'string' 
                ? property.acceptable_method_of_payment.split(',').filter(Boolean)
                : Array.isArray(property.acceptable_method_of_payment) 
                    ? property.acceptable_method_of_payment 
                    : [])
            : [],
        place_of_payment: property?.place_of_payment || "",
        property_condition: property?.property_condition || "",
        repair_details: property?.repair_details || "",
        house_warranty: property?.house_warranty || "",
        warranty_term: property?.warranty_term || "",
        warranty_condition: property?.warranty_condition || "",
        furniture_included: property?.furniture_included || "",
        transfer_fee: property?.transfer_fee || "",
        withholding_tax: property?.withholding_tax || "",
        business_tax: property?.business_tax || "",
        lease_registration_fee: property?.lease_registration_fee || "",
        mortgage_fee: property?.mortgage_fee || "",
        usufruct_registration_fee: property?.usufruct_registration_fee || "",
        servitude_registration_fee: property?.servitude_registration_fee || "",
        declared_land_office_price: property?.declared_land_office_price || "",
        land_title: property?.land_title || "",
        land_title_document: property?.land_title_document || null,
        house_title: property?.house_title || "",
        house_title_document: property?.house_title_document || null,
        house_registration_book: property?.house_registration_book || null,
        land_lease_agreement: property?.land_lease_agreement || null,
    }), [property]);

    const methods = useForm({
        resolver: zodResolver(propertyValidationSchema),
        defaultValues: initialValues,
        values: initialValues,
    });

    // Watch house_warranty field to conditionally show warranty fields
    const houseWarranty = methods.watch("house_warranty");
    const transaction_type = methods.watch("transaction_type");
    const property_type = methods.watch("property_type");
    const property_condition = methods.watch("property_condition");
    
    // Watch title and document fields for conditional requirements
    const landTitle = methods.watch("land_title");
    const landTitleDocument = methods.watch("land_title_document");
    const houseTitle = methods.watch("house_title");
    const houseTitleDocument = methods.watch("house_title_document");

    const intended_closing_date = methods.watch("intended_closing_date");

    const fieldsData = useMemo(
        () => [
            // Basic Information
            {
                id: "property_name",
                name: "property_name",
                type: "text",
                label: "Name of the Property",
                placeholder: msg.default("property name"),
                withAsterisk: true,
                focus: true,
                section: "basic",
            },
            {
                id: "agent_name",
                name: "agent_name",
                type: "text",
                label: "Name of Agent",
                placeholder: msg.default("agent name"),
                withAsterisk: false,
                section: "basic",
            },
            {
                id: "broker_company",
                name: "broker_company",
                type: "text",
                label: "Name of Broker Company",
                placeholder: msg.default("broker company"),
                withAsterisk: false,
                section: "basic",
            },
            {
                id: "transaction_type",
                name: "transaction_type",
                type: "multi-select",
                label: "Type of Transaction",
                placeholder: msg.select("transaction type"),
                options: TYPE_OF_TRANSACTION_OPTIONS,
                withAsterisk: false,
                section: "basic",
            },
            {
                id: "property_type",
                name: "property_type",
                type: "select",
                label: "Type of Property",
                placeholder: msg.select("property type"),
                options: TYPE_OF_PROPERTY_OPTIONS,
                withAsterisk: false,
                section: "basic",
            },

            // Dates
            {
                id: "intended_closing_date",
                name: "intended_closing_date",
                type: "select",
                label: "Intended Closing Date",
                placeholder: msg.select("intended closing date"),
                options: INTENDED_CLOSING_DATE_OPTIONS,
                withAsterisk: false,
                section: "dates",
            },
            {
                id: "reservation_date",
                name: "reservation_date",
                type: "date",
                label: "Reservation Date",
                placeholder: msg.default("reservation date"),
                withAsterisk: false,
                section: "dates",
            },
            {
                id: "intended_closing_date_specific",
                name: "intended_closing_date_specific",
                type: "date",
                label: "Intended Closing Date (Specific)",
                placeholder: msg.select("intended closing date"),
                withAsterisk: ['on_or_before', 'after', 'only_on'].includes(intended_closing_date),
                section: "dates",
                disabled: !['on_or_before', 'after', 'only_on'].includes(intended_closing_date),
            },
            {
                id: "handover_date",
                name: "handover_date",
                 type: "select",
                label: "Handover Date",
                options: HANDOVER_DATE_OPTIONS,
                placeholder: msg.select("handover date"),
                withAsterisk: false,
                section: "dates",
            },

            // Financial Information
            {
                id: "selling_price",
                name: "selling_price",
                type: "number",
                label: "Selling Price (THB)",
                placeholder: msg.default("selling price"),
                withAsterisk: false,
                section: "financial",
            },
            {
                id: "deposit",
                name: "deposit",
                type: "number",
                label: "Deposit (THB)",
                placeholder: msg.default("deposit"),
                withAsterisk: false,
                section: "financial",
            },
            {
                id: "intermediary_payment",
                name: "intermediary_payment",
                type: "number",
                label: "Intermediary Payment (THB)",
                placeholder: msg.default("intermediary payment"),
                withAsterisk: false,
                section: "financial",
            },
            {
                id: "closing_payment",
                name: "closing_payment",
                type: "number",
                label: "Closing Payment (THB)",
                placeholder: msg.default("closing payment"),
                withAsterisk: false,
                section: "financial",
            },

            // Payment Details
            {
                id: "acceptable_method_of_payment",
                name: "acceptable_method_of_payment",
                type: "multi-select",
                maxDisplayed: 2,
                label: "Acceptable Method of Payment",
                placeholder: msg.select("payment method"),
                options: ACCEPTABLE_PAYMENT_METHODS_OPTIONS,
                withAsterisk: false,
                section: "payment",
            },
            {
                id: "place_of_payment",
                name: "place_of_payment",
                type: "select",
                label: "Place of Payment",
                placeholder: msg.select("place of payment"),
                options: PLACE_OF_PAYMENT_OPTIONS,
                withAsterisk: false,
                section: "payment",
            },

            // Property Details
            {
                id: "property_condition",
                name: "property_condition",
                type: "select",
                label: "Property Condition",
                placeholder: msg.select("property condition"),
                options: PROPERTY_CONDITION_OPTIONS,
                withAsterisk: false,
                section: "details",
            },
            {
                id: "repair_details",
                name: "repair_details",
                type: "textarea",
                label: "Repair Details",
                placeholder: msg.default("repair details"),
                withAsterisk: property_condition === "sometimes_items_to_be_repaired",
                section: "details",
                hidden: property_condition !== "sometimes_items_to_be_repaired",
            },
            {
                id: "house_warranty",
                name: "house_warranty",
                type: "select",
                label: "House Warranty",
                placeholder: msg.select("house warranty"),
                options: YES_NO_OPTIONS,
                withAsterisk: false,
                section: "details",
            },
            {
                id: "warranty_term",
                name: "warranty_term",
                type: "text",
                label: "Term of Warranty",
                placeholder: msg.default("warranty term"),
                withAsterisk: houseWarranty === "yes",
                section: "details",
                hidden: houseWarranty !== "yes",
            },
            {
                id: "warranty_condition",
                name: "warranty_condition",
                type: "text",
                label: "Warranty condition",
                placeholder: msg.default("warranty condition"),
                withAsterisk: houseWarranty === "yes",
                section: "details",
                hidden: houseWarranty !== "yes",
            },
            {
                id: "furniture_included",
                name: "furniture_included",
                type: "select",
                label: "Furniture included",
                placeholder: msg.select("furniture included"),
                options: FURNITURE_INCLUDED_OPTIONS,
                withAsterisk: false,
                section: "details",
            },

            // Cost Sharing
            {
                id: "transfer_fee",
                name: "transfer_fee",
                type: "select",
                label: "Transfer Fee",
                placeholder: msg.select("transfer fee"),
                options: BUYER_SELLER_COST_OPTIONS,
                withAsterisk: false,
                section: "costs",
            },
            {
                id: "withholding_tax",
                name: "withholding_tax",
                type: "select",
                label: "Withholding Tax",
                placeholder: msg.select("withholding tax"),
                options: BUYER_SELLER_COST_OPTIONS,
                withAsterisk: false,
                section: "costs",
            },
            {
                id: "business_tax",
                name: "business_tax",
                type: "select",
                label: "Specific Business Tax / Stamp Duty",
                placeholder: msg.select("business tax"),
                options: BUYER_SELLER_COST_OPTIONS,
                withAsterisk: false,
                section: "costs",
            },
            {
                id: "lease_registration_fee",
                name: "lease_registration_fee",
                type: "select",
                label: "Lease Registration Fee",
                placeholder: msg.select("lease registration fee"),
                options: LESSEE_LESSOR_COST_OPTIONS,
                withAsterisk: false,
                section: "costs",
                disabled: !['condominium_leasehold', 'house_and_land_leasehold'].includes(property_type)
            },
            {
                id: "mortgage_fee",
                name: "mortgage_fee",
                type: "select",
                label: "Mortgage Fee",
                placeholder: msg.select("mortgage fee"),
                options: MORTGAGOR_MORTGAGEE_COST_OPTIONS,
                withAsterisk: false,
                section: "costs",
                disabled: !transaction_type.includes("mortgage")
            },
            {
                id: "usufruct_registration_fee",
                name: "usufruct_registration_fee",
                type: "select",
                label: "Usufruct Registration Fee",
                placeholder: msg.select("usufruct registration fee"),
                options: USUFRUCTUARY_OWNER_COST_OPTIONS,
                withAsterisk: false,
                section: "costs",
                disabled: !transaction_type.includes("usufruct")
            },
            {
                id: "servitude_registration_fee",
                name: "servitude_registration_fee",
                type: "select",
                label: "Servitude Registration Fee",
                placeholder: msg.select("servitude registration fee"),
                options: SERVITUDE_COST_OPTIONS,
                withAsterisk: false,
                section: "costs",
                disabled: !transaction_type.includes("servitude")
            },
            {
                id: "declared_land_office_price",
                name: "declared_land_office_price",
                type: "select",
                label: "Price Declared to the land office",
                placeholder: msg.select("declared land office price"),
                options: DECLARED_LAND_OFFICE_PRICE_OPTIONS,
                withAsterisk: false,
                section: "costs",
            },

            // Documentation/Attachment
            {
                id: "land_title",
                name: "land_title",
                type: "select",
                label: "Land Title",
                placeholder: msg.select("land title"),
                options: LAND_TITLE_OPTIONS,
                withAsterisk: Boolean(landTitleDocument),
                section: "documents",
            },
            {
                id: "land_title_document",
                name: "land_title_document",
                type: "file",
                label: "Upload Land Title Document",
                placeholder: "Drag and drop a file here, or click to select",
                withAsterisk: Boolean(landTitle && landTitle.trim() !== ""),
                section: "documents",
            },
            {
                id: "house_title",
                name: "house_title",
                type: "select",
                label: "House Title",
                placeholder: msg.select("house title"),
                options: HOUSE_TITLE_OPTIONS,
                withAsterisk: Boolean(houseTitleDocument),
                section: "documents",
            },
            {
                id: "house_title_document",
                name: "house_title_document",
                type: "file",
                label: "Upload House Title Document",
                placeholder: "Drag and drop a file here, or click to select",
                withAsterisk: Boolean(houseTitle && houseTitle.trim() !== ""),
                section: "documents",
            },
            {
                id: "house_registration_book",
                name: "house_registration_book",
                type: "file",
                label: "Upload House Registration Book",
                placeholder: "Drag and drop a file here, or click to select",
                withAsterisk: false,
                section: "documents",
            },
            {
                id: "land_lease_agreement",
                name: "land_lease_agreement",
                type: "file",
                label: "Upload Land Lease Agreement",
                placeholder: "Drag and drop a file here, or click to select",
                withAsterisk: false,
                section: "documents",
            },
        ],
        [houseWarranty, property_type, intended_closing_date, transaction_type, property_condition, landTitle, landTitleDocument, houseTitle, houseTitleDocument]
    );

    const [onSubmit, loading, notification] = useAsyncOperation(
        async (payload) => {
            const fileFields = ['land_title_document', 'house_title_document', 'house_registration_book', 'land_lease_agreement'];
            const hasFiles = fileFields.some(field => payload[field] && payload[field] instanceof File);

            const values = {
              ...payload,
              acceptable_method_of_payment: Array.isArray(
                payload.acceptable_method_of_payment
              )
                ? payload.acceptable_method_of_payment.join(",")
                : payload.acceptable_method_of_payment,
              // Convert transaction_type array to comma-separated string
              transaction_type: Array.isArray(payload.transaction_type)
                ? payload.transaction_type.join(",")
                : payload.transaction_type,
            };

            let requestData;

            if (hasFiles) {
              // If there are files, use FormData
              const formData = new FormData();

              // Add regular fields to FormData
              Object.keys(values).forEach((key) => {
                if (
                  values[key] !== null &&
                  values[key] !== undefined &&
                  values[key] !== ""
                ) {
                  if (fileFields.includes(key) && values[key] instanceof File) {
                    // Add file to FormData
                    formData.append(key, values[key]);
                  } else if (!fileFields.includes(key)) {
                    // Add non-file fields to FormData
                    formData.append(key, values[key]);
                  }
                }
              });

              // Add client_id for create operation
              if (!isEditing) {
                formData.append("client_id", id);
              }

              requestData = formData;
            } else {
              // If no files, use regular JSON data
              requestData = removeEmptyFields(values);
              if (!isEditing) {
                requestData.client_id = id;
              }
            }

            if (isEditing) {
              await api.property.update({
                id: property.id,
                data: requestData,
              });
              toastSuccess(ACTION_MESSAGES.update("property"));
            } else {
              await api.property.create({
                data: requestData,
              });
              toastSuccess(ACTION_MESSAGES.add("property"));
            }

            // Refresh the property list
            await getAll({ id, params });

            // Close the drawer
            onClose();
        },
        () => {
            // Handle specific error cases if needed
            return false;
        }
    );

    return {
        methods,
        fieldsData,
        onSubmit,
        loading,
        notification,
        isEditing,
    };
}

export default useAddEditForm