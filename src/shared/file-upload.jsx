import React, { useRef, useState } from 'react';
import { Upload, X, File, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createFileUrl } from '@/utils/helper';

const FileUpload = ({
    value,
    onChange,
    onRemove,
    accept = "image/*,.pdf,.doc,.docx",
    maxSize = 5 * 1024 * 1024, // 5MB
    className,
    placeholder = "Upload file",
    disabled = false,
    showPreview = true,
    multiple = false,
    uploading = false,
    error
}) => {
    const fileInputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files || []);
        handleFiles(files);
        // Reset input value to allow selecting the same file again
        event.target.value = '';
    };

    const handleFiles = (files) => {
        if (!files.length) return;

        const validFiles = files.filter(file => {
            if (file.size > maxSize) {
                alert(`File ${file.name} is too large. Maximum size is ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            if (multiple) {
                onChange(validFiles);
            } else {
                onChange(validFiles[0]);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const getFileIcon = (file) => {
        if( typeof file === 'string') {
            if (file.endsWith('.pdf')) return <FileText className="h-8 w-8" />;
            if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return <ImageIcon className="h-8 w-8" />;
            return <File className="h-8 w-8" />;
        }
        if (!file) return <Upload className="h-8 w-8" />;

        const type = file.type || '';
        if (type.startsWith('image/')) {
            return <ImageIcon className="h-8 w-8" />;
        } else if (type.includes('pdf')) {
            return <FileText className="h-8 w-8" />;
        } else {
            return <File className="h-8 w-8" />;
        }
    };

    const getFileName = (file) => {
        if (!file) return '';
        if (typeof file === 'string') return file.split('/').pop() || file;
        return file.name;
    };

    const getFileSize = (file) => {
        if (!file || typeof file === 'string') return '';
        const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
        return `${sizeInMB} MB`;
    };

    const isImage = (file) => {
        if (!file) return false;
        if (typeof file === 'string') {
            return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
        }
        return file.type?.startsWith('image/');
    };

    const getPreviewUrl = (file) => {
        if (typeof file === 'string'){
            return isImage(file) ? createFileUrl(file) : '';
        }
        if (isImage(file)) return URL.createObjectURL(file);
        return null;
    };

    const renderFilePreview = (file, index = 0) => {
        const previewUrl = getPreviewUrl(file);
        return (
            <div key={index} className="relative group border rounded-lg p-3 bg-gray-50">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt={getFileName(file)}
                                className="h-12 w-12 object-cover rounded"
                            />
                        ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                {getFileIcon(file)}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {getFileName(file)}
                        </p>
                        {getFileSize(file) && (
                            <p className="text-xs text-gray-500">{getFileSize(file)}</p>
                        )}
                    </div>

                    {!disabled && onRemove && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => multiple ? onRemove(index) : onRemove()}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    const hasFiles = multiple ? (Array.isArray(value) && value.length > 0) : value;

    return (
        <div className={cn("space-y-2", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                multiple={multiple}
                className="hidden"
                disabled={disabled}
            />

            {!hasFiles && (
                <div
                    onClick={!disabled ? triggerFileInput : undefined}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                        dragOver ? "border-primary bg-primary/5" : "border-gray-300",
                        disabled ? "cursor-not-allowed opacity-50" : "hover:border-primary hover:bg-primary/5",
                        error ? "border-red-500" : ""
                    )}
                >
                    <div className="flex flex-col items-center space-y-2">
                        {uploading ? (
                            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                        ) : (
                            <Upload className="h-8 w-8 text-gray-400" />
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                {uploading ? "Uploading..." : placeholder}
                            </p>
                            <p className="text-xs text-gray-500">
                                {multiple ? "Drag and drop files here, or click to select" : "Drag and drop a file here, or click to select"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Max size: {(maxSize / 1024 / 1024).toFixed(1)}MB
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {hasFiles && showPreview && (
                <div className="space-y-2">
                    {multiple ? (
                        Array.isArray(value) && value.map((file, index) => renderFilePreview(file, index))
                    ) : (
                        renderFilePreview(value)
                    )}

                    {!disabled && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={triggerFileInput}
                            className="w-full"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            {multiple ? "Add More Files" : "Change File"}
                        </Button>
                    )}
                </div>
            )}

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;
