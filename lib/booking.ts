import {
  CLINIC_CONFIG,
  CLINIC_SERVICES,
  CLINIC_WHATSAPP_NUMBER,
  PREFERRED_DATES,
  PREFERRED_TIME_SLOTS,
} from "./clinic-config";

export interface BookingRequestInput {
  serviceId: string;
  preferredDateId: string;
  preferredTimeId: string;
  patientName: string;
  patientPhone?: string;
  optionalNote?: string;
}

export interface BookingValidationErrors {
  serviceId?: string;
  preferredDateId?: string;
  preferredTimeId?: string;
  patientName?: string;
  patientPhone?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: BookingValidationErrors;
}

/**
 * Converts Eastern Arabic numerals (٠-٩) to Western numerals (0-9)
 * so all numbers remain consistent in Western numerals (1, 2, 3).
 */
export function normalizeToWesternNumerals(input: string): string {
  const easternNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  let result = input;
  for (let i = 0; i < easternNumerals.length; i++) {
    result = result.replaceAll(easternNumerals[i], String(i));
  }
  return result;
}

export function validateBookingStep(
  step: 1 | 2 | 3,
  input: BookingRequestInput
): BookingValidationResult {
  const errors: BookingValidationErrors = {};

  if (step >= 1) {
    const serviceExists = CLINIC_SERVICES.some((s) => s.id === input.serviceId);
    if (!input.serviceId || !serviceExists) {
      errors.serviceId = "يرجى اختيار نوع الاستشارة المطلوبة.";
    }
  }

  if (step >= 2) {
    const dateExists = PREFERRED_DATES.some(
      (d) => d.id === input.preferredDateId
    );
    const timeExists = PREFERRED_TIME_SLOTS.some(
      (t) => t.id === input.preferredTimeId
    );
    if (!input.preferredDateId || !dateExists) {
      errors.preferredDateId = "يرجى تحديد اليوم المفضل للزيارة.";
    }
    if (!input.preferredTimeId || !timeExists) {
      errors.preferredTimeId = "يرجى تحديد الفترة الزمنية المفضلة.";
    }
  }

  if (step >= 3) {
    const trimmedName = (input.patientName || "").trim();
    if (trimmedName.length < 2) {
      errors.patientName = "يرجى كتابة الاسم الكريم (حرفين على الأقل).";
    } else if (trimmedName.length > 60) {
      errors.patientName = "الاسم المدخل طويل جداً، يرجى اختصاره.";
    }

    const rawPhone = normalizeToWesternNumerals((input.patientPhone || "").trim());
    if (rawPhone.length > 0) {
      const cleanedPhone = rawPhone.replace(/[\s\-+()]/g, "");
      if (!/^\d{7,15}$/.test(cleanedPhone)) {
        errors.patientPhone = "يرجى إدخال رقم هاتف صحيح بالأرقام (1, 2, 3) أو ترك الحقل فارغاً.";
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function resolveBookingDetails(input: BookingRequestInput) {
  const service =
    CLINIC_SERVICES.find((s) => s.id === input.serviceId) || CLINIC_SERVICES[0];
  const dateOption =
    PREFERRED_DATES.find((d) => d.id === input.preferredDateId) ||
    PREFERRED_DATES[0];
  const timeOption =
    PREFERRED_TIME_SLOTS.find((t) => t.id === input.preferredTimeId) ||
    PREFERRED_TIME_SLOTS[0];

  const cleanName = normalizeToWesternNumerals(input.patientName.trim());
  const cleanPhone = normalizeToWesternNumerals(
    (input.patientPhone || "").trim()
  );
  const cleanNote = normalizeToWesternNumerals(
    (input.optionalNote || "").trim()
  );

  return {
    service,
    dateOption,
    timeOption,
    cleanName,
    cleanPhone,
    cleanNote,
  };
}

export function formatArabicWhatsAppMessage(input: BookingRequestInput): string {
  const {
    service,
    dateOption,
    timeOption,
    cleanName,
    cleanPhone,
    cleanNote,
  } = resolveBookingDetails(input);

  const lines: string[] = [
    `مرحباً ${CLINIC_CONFIG.brandNameAr}،`,
    `أود إرسال طلب موعد جديد عبر الموقع:`,
    ``,
    `• الاسم: ${cleanName}`,
    `• نوع الزيارة: ${service.title}`,
    `• اليوم المفضل: ${dateOption.label}`,
    `• الفترة المفضلة: ${timeOption.label} (${timeOption.hours})`,
  ];

  if (cleanPhone) {
    lines.push(`• رقم التواصل: ${cleanPhone}`);
  }

  if (cleanNote) {
    lines.push(`• استفسار إضافي: ${cleanNote}`);
  }

  lines.push(``);
  lines.push(`ملاحظة: أتفهم أن ${CLINIC_CONFIG.bookingDisclaimer}`);

  return lines.join("\n");
}

export function getWhatsAppSubmissionInfo(
  input: BookingRequestInput,
  configuredNumber: string = CLINIC_WHATSAPP_NUMBER
): {
  isConfigured: boolean;
  message: string;
  whatsappUrl: string | null;
} {
  const message = formatArabicWhatsAppMessage(input);
  const sanitizedNumber = normalizeToWesternNumerals(configuredNumber).replace(
    /[^\d]/g,
    ""
  );

  if (!sanitizedNumber) {
    return {
      isConfigured: false,
      message,
      whatsappUrl: null,
    };
  }

  const encoded = encodeURIComponent(message);
  return {
    isConfigured: true,
    message,
    whatsappUrl: `https://wa.me/${sanitizedNumber}?text=${encoded}`,
  };
}
