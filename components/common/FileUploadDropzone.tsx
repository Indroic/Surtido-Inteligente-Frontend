"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { Button, ButtonGroup, Spinner } from "@heroui/react";
import { IconFile, IconUpload, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
const MotionDiv = motion.div as ComponentType<any>;

type UploadHandler = (files: File[]) => Promise<unknown> | unknown;

export type FileUploadDropzoneProps = {
  label?: string;
  description?: string;
  helperText?: string;
  emptyStateText?: string;
  submitLabel?: string;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  allowMultiple?: boolean;
  autoResetOnSuccess?: boolean;
  disabled?: boolean;
  className?: string;
  uploadUrl?: string;
  uploadMethod?: "POST" | "PUT" | "PATCH";
  uploadFieldName?: string;
  additionalFormData?: Record<string, string | Blob>;
  headers?: Record<string, string>;
  onUpload?: UploadHandler;
  onSuccess?: (response?: any) => void;
  onError?: (error: unknown) => void;
  onFilesChange?: (files: File[]) => void;
  fileRenderer?: (
    file: File,
    index: number,
    removeFile: (file: File) => void,
  ) => ReactNode;
};

function formatBytes(size: number): string {
  if (!Number.isFinite(size) || size <= 0) {
    return "0 KB";
  }

  const units = ["bytes", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(size) / Math.log(1024)),
    units.length - 1,
  );
  const value = size / 1024 ** exponent;

  return `${value.toFixed(value < 10 && exponent > 0 ? 1 : 0)} ${units[exponent]}`;
}

const rejectionMessages: Record<string, string> = {
  "file-invalid-type": "El tipo de archivo no está permitido.",
  "file-too-large": "El archivo supera el tamaño máximo permitido.",
  "file-too-small": "El archivo es más pequeño que el mínimo permitido.",
  "too-many-files": "Se excedió la cantidad máxima de archivos.",
};

const mapRejectionErrors = (rejections: FileRejection[]): string | null => {
  if (!rejections.length) {
    return null;
  }

  const messages = rejections.map((rejection) => {
    const fileName = rejection.file.name;
    const reasons = rejection.errors
      .map((error) => rejectionMessages[error.code] ?? error.message)
      .join(" ");

    return `${fileName}: ${reasons}`;
  });

  return messages.join("\n");
};

export function FileUploadDropzone({
  label,
  description,
  helperText,
  emptyStateText = "Aún no se han seleccionado archivos.",
  submitLabel = "Subir archivos",
  accept,
  maxFiles,
  maxSize,
  minSize,
  allowMultiple = true,
  autoResetOnSuccess = true,
  disabled = false,
  className,
  uploadUrl,
  uploadMethod = "POST",
  uploadFieldName,
  additionalFormData,
  headers,
  onUpload,
  onSuccess,
  onError,
  onFilesChange,
  fileRenderer,
}: FileUploadDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [shouldAutoUpload, setShouldAutoUpload] = useState(false);

  const resetFiles = useCallback(() => {
    setFiles([]);
    setUploadSuccess(false);
    setUploadedFileName(null);
    setErrorMessage(null);
    setShouldAutoUpload(false);
    onFilesChange?.([]);
  }, [onFilesChange]);

  const removeFile = useCallback(
    (fileToRemove: File) => {
      setFiles((prev) => {
        const next = prev.filter(
          (file) =>
            !(
              file.name === fileToRemove.name &&
              file.lastModified === fileToRemove.lastModified &&
              file.size === fileToRemove.size
            ),
        );

        onFilesChange?.(next);

        return next;
      });
    },
    [onFilesChange],
  );

  const performUpload = useCallback(
    async (filesToUpload: File[]) => {
      if (!filesToUpload.length) {
        setErrorMessage("Selecciona al menos un archivo para continuar.");

        return;
      }

      setIsSubmitting(true);
      setErrorMessage(null);
      setUploadSuccess(false);
      setUploadedFileName(null);

      try {
        let responsePayload: unknown;

        if (onUpload) {
          responsePayload = await onUpload(filesToUpload);
        } else if (uploadUrl) {
          const fieldName =
            uploadFieldName ?? (allowMultiple ? "files" : "file");
          const formData = new FormData();

          filesToUpload.forEach((file) => {
            formData.append(fieldName, file);
          });

          if (additionalFormData) {
            Object.entries(additionalFormData).forEach(([key, value]) => {
              formData.append(key, value);
            });
          }

          const requestHeaders = { ...(headers ?? {}) };

          if (
            requestHeaders["Content-Type"] &&
            requestHeaders["Content-Type"].includes("multipart/form-data")
          ) {
            delete requestHeaders["Content-Type"];
          }

          const response = await fetch(uploadUrl, {
            method: uploadMethod,
            body: formData,
            headers: requestHeaders,
          });

          if (!response.ok) {
            throw new Error(`La carga falló con el estado ${response.status}.`);
          }

          responsePayload = await response
            .json()
            .catch(() => undefined as unknown);
        } else {
          throw new Error(
            "Configura 'onUpload' o 'uploadUrl' para poder subir los archivos.",
          );
        }

        if (!allowMultiple) {
          setUploadSuccess(true);
          setUploadedFileName(filesToUpload[0]?.name ?? null);
          setFiles([]);
          onFilesChange?.([]);
        } else if (autoResetOnSuccess) {
          resetFiles();
        }

        onSuccess?.(responsePayload);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "No se pudo completar la carga.";

        setErrorMessage(message);
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      additionalFormData,
      allowMultiple,
      autoResetOnSuccess,
      headers,
      onError,
      onSuccess,
      onUpload,
      onFilesChange,
      resetFiles,
      uploadFieldName,
      uploadMethod,
      uploadUrl,
    ],
  );

  const submitFiles = useCallback(() => {
    setShouldAutoUpload(false);
    void performUpload(files);
  }, [files, performUpload]);

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setUploadSuccess(false);
      setUploadedFileName(null);

      const rejectionMessage = mapRejectionErrors(rejectedFiles);

      setErrorMessage(rejectionMessage);

      if (!acceptedFiles.length) {
        return;
      }

      setFiles((prev) => {
        const base = allowMultiple ? [...prev] : [];

        acceptedFiles.forEach((file) => {
          const exists = base.some(
            (stored) =>
              stored.name === file.name &&
              stored.size === file.size &&
              stored.lastModified === file.lastModified,
          );

          if (!exists) {
            base.push(file);
          }
        });

        const limitedBase =
          typeof maxFiles === "number" ? base.slice(0, maxFiles) : base;
        const normalized = allowMultiple
          ? limitedBase
          : limitedBase.slice(0, 1);

        onFilesChange?.(normalized);

        return normalized;
      });

      if (!rejectionMessage) {
        setErrorMessage(null);
      }

      if (!allowMultiple && acceptedFiles.length) {
        setShouldAutoUpload(true);
      }
    },
    [allowMultiple, maxFiles, onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxFiles,
    maxSize,
    minSize,
    multiple: allowMultiple,
    noClick: true,
    noKeyboard: true,
    disabled: disabled || isSubmitting,
  });

  const showSuccessState = uploadSuccess && !allowMultiple;

  const submitDisabled =
    disabled || isSubmitting || !files.length || showSuccessState;

  const dropzoneClassName = useMemo(
    () =>
      clsx(
        "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        {
          "border-success-500 bg-success-50 text-success-600 ": isDragActive,
          "border-danger-500 text-danger-600": !!errorMessage && !isDragActive,
          "border-success-500 bg-success-50 text-success-600":
            showSuccessState && !isDragActive,
          "cursor-not-allowed opacity-60": disabled || isSubmitting,
          "cursor-pointer": !(disabled || isSubmitting || showSuccessState),
          "cursor-default": showSuccessState,
        },
      ),
    [disabled, isDragActive, isSubmitting, errorMessage, showSuccessState],
  );

  const dropzoneProps = getRootProps({
    className: dropzoneClassName,
    role: "presentation",
  });

  const renderFile = useCallback(
    (file: File, index: number) => {
      if (fileRenderer) {
        return fileRenderer(file, index, removeFile);
      }

      return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-foreground-200 bg-foreground-50 px-4 py-3 text-left text-sm">
          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            <IconFile className="h-5 w-5 flex-shrink-0 text-foreground-500" />
            <div className="flex flex-col overflow-hidden text-ellipsis">
              <span className="truncate font-medium text-foreground-700">
                {file.name}
              </span>
              <span className="text-foreground-500">
                {formatBytes(file.size)}
              </span>
            </div>
          </div>
          <Button
            isIconOnly
            color="danger"
            radius="full"
            size="sm"
            variant="light"
            onPress={() => removeFile(file)}
          >
            <IconX className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    [fileRenderer, removeFile],
  );

  useEffect(() => {
    if (
      shouldAutoUpload &&
      !allowMultiple &&
      files.length === 1 &&
      !isSubmitting
    ) {
      setShouldAutoUpload(false);
      void performUpload(files);
    }
  }, [allowMultiple, files, isSubmitting, performUpload, shouldAutoUpload]);

  return (
    <div className={clsx("flex w-full flex-col gap-4", className)}>
      {label ? (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-foreground-700">
            {label}
          </span>
          {description ? (
            <span className="text-sm text-foreground-500">{description}</span>
          ) : null}
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {!showSuccessState ? (
          <MotionDiv
            key="dropzone"
            {...dropzoneProps}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            initial={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <input {...getInputProps()} />
            <IconUpload className="h-10 w-10 text-inherit" />
            <div className="space-y-1 text-sm text-foreground-600">
              <p>
                Arrastra y suelta los archivos aquí o{" "}
                <button
                  className="text-blue-600 underline"
                  disabled={disabled || isSubmitting}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    open();
                  }}
                >
                  selecciónalos desde tu equipo
                </button>
              </p>
              <p className="text-xs text-foreground-500">
                Se admiten {allowMultiple ? "múltiples" : "un"} archivos.
              </p>
            </div>
          </MotionDiv>
        ) : null}
      </AnimatePresence>

      {helperText ? (
        <span className="text-xs text-foreground-500">{helperText}</span>
      ) : null}

      <AnimatePresence mode="wait">
        {showSuccessState ? (
          <MotionDiv
            key="success"
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-success-200 bg-success-50 px-4 py-6 text-center text-sm text-success-700"
            exit={{ opacity: 0, scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {uploadedFileName
              ? `${uploadedFileName} cargado correctamente.`
              : "Archivo cargado correctamente."}
          </MotionDiv>
        ) : files.length ? (
          <MotionDiv
            key="file-list"
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
            exit={{ opacity: 0, y: 8 }}
            initial={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {files.map((file, index) => (
              <MotionDiv
                key={`${file.name}-${file.lastModified}-${index}`}
                layout
                animate={{ opacity: 1, x: 0 }}
                className="w-full"
                exit={{ opacity: 0, x: -8 }}
                initial={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                {renderFile(file, index)}
              </MotionDiv>
            ))}
          </MotionDiv>
        ) : (
          <MotionDiv
            key="empty"
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-dashed border-foreground-200 px-4 py-6 text-center text-sm text-foreground-500"
            exit={{ opacity: 0, y: 8 }}
            initial={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {emptyStateText}
          </MotionDiv>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errorMessage ? (
          <MotionDiv
            key="error"
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-600"
            exit={{ opacity: 0, y: -6 }}
            initial={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {errorMessage.split("\n").map((text, index) => (
              <p key={`error-${index}`}>{text}</p>
            ))}
          </MotionDiv>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!showSuccessState ? (
          <MotionDiv
            key="actions"
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3"
            exit={{ opacity: 0, y: 8 }}
            initial={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <ButtonGroup>
              <Button
                color="secondary"
                isDisabled={disabled || isSubmitting}
                variant="flat"
                onPress={() => open()}
              >
                Seleccionar archivos
              </Button>
              <Button
                color="primary"
                isDisabled={submitDisabled}
                onPress={submitFiles}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner color="white" size="sm" />
                    Subiendo...
                  </span>
                ) : (
                  submitLabel
                )}
              </Button>
              {files.length ? (
                <Button
                  color="default"
                  isDisabled={disabled || isSubmitting}
                  variant="light"
                  onPress={resetFiles}
                >
                  Limpiar selección
                </Button>
              ) : null}
            </ButtonGroup>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default FileUploadDropzone;
