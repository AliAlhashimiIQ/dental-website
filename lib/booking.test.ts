import test from "node:test";
import assert from "node:assert/strict";
import {
  formatArabicWhatsAppMessage,
  getWhatsAppSubmissionInfo,
  normalizeToWesternNumerals,
  validateBookingStep,
} from "./booking";

test("normalizeToWesternNumerals converts Eastern Arabic digits to Western 1, 2, 3", () => {
  assert.equal(normalizeToWesternNumerals("٠٧٧٠١٢٣٤٥٦٧"), "07701234567");
  assert.equal(normalizeToWesternNumerals("ساعة ١٠:٣٠"), "ساعة 10:30");
});

test("validateBookingStep enforces step 1, 2, and 3 rules accurately", () => {
  const emptyInput = {
    serviceId: "",
    preferredDateId: "",
    preferredTimeId: "",
    patientName: "",
  };

  const step1Result = validateBookingStep(1, emptyInput);
  assert.equal(step1Result.valid, false);
  assert.ok(step1Result.errors.serviceId);

  const validStep1 = {
    ...emptyInput,
    serviceId: "whitening-consultation",
  };
  assert.equal(validateBookingStep(1, validStep1).valid, true);

  const step2Invalid = validateBookingStep(2, validStep1);
  assert.equal(step2Invalid.valid, false);
  assert.ok(step2Invalid.errors.preferredDateId);
  assert.ok(step2Invalid.errors.preferredTimeId);

  const validStep2 = {
    ...validStep1,
    preferredDateId: "sat-upcoming",
    preferredTimeId: "morning-slot",
  };
  assert.equal(validateBookingStep(2, validStep2).valid, true);

  const step3InvalidName = validateBookingStep(3, {
    ...validStep2,
    patientName: "أ",
  });
  assert.equal(step3InvalidName.valid, false);
  assert.ok(step3InvalidName.errors.patientName);

  const step3Valid = validateBookingStep(3, {
    ...validStep2,
    patientName: "علي الكاظمي",
    patientPhone: "07701234567",
  });
  assert.equal(step3Valid.valid, true);
});

test("formatArabicWhatsAppMessage includes selected details and Western numerals", () => {
  const msg = formatArabicWhatsAppMessage({
    serviceId: "whitening-consultation",
    preferredDateId: "sat-upcoming",
    preferredTimeId: "morning-slot",
    patientName: "نور الهدى",
    patientPhone: "٠٧٧٠١١١٢٢٣٣",
    optionalNote: "أرغب بالاستفسار عن حساسية الأسنان",
  });

  assert.ok(msg.includes("مرحباً لُما لطب الأسنان"));
  assert.ok(msg.includes("نور الهدى"));
  assert.ok(msg.includes("استشارة تبييض الأسنان"));
  assert.ok(msg.includes("السبت القادم"));
  assert.ok(msg.includes("10:00 – 12:30"));
  assert.ok(msg.includes("07701112233"));
  assert.ok(msg.includes("هذا طلب موعد، ويتأكد بعد تواصل العيادة وياك."));
});

test("getWhatsAppSubmissionInfo returns null URL when clinic number is unconfigured", () => {
  const input = {
    serviceId: "whitening-consultation",
    preferredDateId: "sat-upcoming",
    preferredTimeId: "evening-slot",
    patientName: "أحمد العراقي",
  };

  const unconfigured = getWhatsAppSubmissionInfo(input, "");
  assert.equal(unconfigured.isConfigured, false);
  assert.equal(unconfigured.whatsappUrl, null);

  const configured = getWhatsAppSubmissionInfo(input, "9647701234567");
  assert.equal(configured.isConfigured, true);
  assert.ok(configured.whatsappUrl?.startsWith("https://wa.me/9647701234567?text="));
});
