export interface ClinicService {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  durationNote: string;
  description: string;
}

export interface PreferredDateOption {
  id: string;
  label: string;
  dayName: string;
  dateFormatted: string;
}

export interface PreferredTimeSlot {
  id: string;
  label: string;
  period: string;
  hours: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  kicker: string;
  description: string;
  talkingPoints: string[];
  visualCaption: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/**
 * Single configuration variable for the clinic's WhatsApp number.
 * Keep empty ("") in demo mode so visitors see a message preview and copy button
 * instead of opening a fake WhatsApp link.
 * Example when configured for production: "9647700000000"
 */
export const CLINIC_WHATSAPP_NUMBER: string = "";

export const CLINIC_CONFIG = {
  brandNameAr: "لُما لطب الأسنان",
  brandNameEn: "Luma Dental",
  cityAr: "بغداد — المنصور، شارع الأميرات",
  hoursAr: "السبت – الخميس · 10:00 صباحاً – 8:00 مساءً",
  demoCredits: "نموذج تجريبي من تصميم CodeWithAli",
  bookingDisclaimer: "هذا طلب موعد، ويتأكد بعد تواصل العيادة وياك.",
  conceptualVisualNote: "رسوم ومشاهد توضيحية لمفهوم العيادة — لا تمثل صوراً فوتوغرافية لعيادة قائمة.",
};

export const CLINIC_SERVICES: ClinicService[] = [
  {
    id: "whitening-consultation",
    code: "01",
    title: "استشارة تبييض الأسنان",
    subtitle: "تقييم درجة اللون الطبيعية ومناقشة الخيارات الملائمة",
    durationNote: "جلسة استشارية · 30 دقيقة تقريباً",
    description:
      "فحص هادئ لطبقة المينا واللثة لتحديد مدى ملاءمة التبييض لحالتك، واستعراض الفرق بين التبييض داخل العيادة أو القوالب المنزلية بإشراف طبي.",
  },
  {
    id: "enamel-shade-assessment",
    code: "02",
    title: "فحص التصبغات وحساسية المينا",
    subtitle: "تحليل أسباب تغير اللون وطرق العناية المسبقة",
    durationNote: "فحص تقييمي · 25 دقيقة تقريباً",
    description:
      "مراجعة دقيقة للتصبغات السطحية أو العميقة وتقييم مستوى حساسية الأسنان قبل اتخاذ أي قرار علاجي أو تجميلي.",
  },
  {
    id: "aesthetic-smile-review",
    code: "03",
    title: "مراجعة تناسق الابتسامة العام",
    subtitle: "استشارة شاملة لتناغم اللون مع الحشوات أو التركيبات الحالية",
    durationNote: "استشارة موسعة · 40 دقيقة تقريباً",
    description:
      "مناقشة تناسق لون الأسنان الطبيعية مع أي حشوات تجميلية أو تيجان خزفية موجودة مسبقاً لضمان مظهر متوازن وطبيعي.",
  },
];

export const PREFERRED_DATES: PreferredDateOption[] = [
  {
    id: "sat-upcoming",
    label: "السبت القادم",
    dayName: "السبت",
    dateFormatted: "تفضيل بداية الأسبوع",
  },
  {
    id: "sun-upcoming",
    label: "الأحد القادم",
    dayName: "الأحد",
    dateFormatted: "تفضيل منتصف الصباح أو المساء",
  },
  {
    id: "tue-upcoming",
    label: "الثلاثاء القادم",
    dayName: "الثلاثاء",
    dateFormatted: "تفضيل منتصف الأسبوع",
  },
  {
    id: "thu-upcoming",
    label: "الخميس القادم",
    dayName: "الخميس",
    dateFormatted: "تفضيل نهاية الأسبوع",
  },
];

export const PREFERRED_TIME_SLOTS: PreferredTimeSlot[] = [
  {
    id: "morning-slot",
    label: "الفترة الصباحية",
    period: "صباحاً",
    hours: "10:00 – 12:30",
  },
  {
    id: "afternoon-slot",
    label: "فترة الظهيرة",
    period: "ظهراً",
    hours: "1:00 – 4:00",
  },
  {
    id: "evening-slot",
    label: "الفترة المسائية",
    period: "مساءً",
    hours: "5:00 – 8:00",
  },
];

export const VISIT_JOURNEY_STEPS: JourneyStep[] = [
  {
    number: "1",
    kicker: "الخطوة 1 · الاستماع والفهم",
    title: "الاستشارة الأولية",
    description:
      "تبدأ الزيارة بجلسة هادئة للاستماع إلى هدفك من زيارة العيادة، وما يزعجك في لون الأسنان الحالي، وتجاربك السابقة مع التبييض أو الحساسية.",
    talkingPoints: [
      "التعرف على تطلعاتك للون طبيعي ومريح",
      "مراجعة عاداتك اليومية المؤثرة على ثبات اللون",
      "الإجابة عن استفساراتك الأولية بوضوح تام",
    ],
    visualCaption: "لوحة قياس تدرجات السيراميك والمينا الطبيعية — رسم توضيحي للمفهوم",
  },
  {
    number: "2",
    kicker: "الخطوة 2 · التقييم السريري",
    title: "تقييم الملاءمة وصحة المينا",
    description:
      "قبل اقتراح أي إجراء، يفحص الطبيب حالة اللثة وسلامة طبقة المينا ووجود أي حشوات أمامية، لأن تبييض الأسنان لا يناسب جميع الحالات بنفس الدرجة.",
    talkingPoints: [
      "فحص سماكة المينا ومناطق الحساسية المحتملة",
      "التمييز بين التصبغات السطحية والتصبغات الداخلية",
      "ملاحظة أي تركيبات أو حشوات لا يتغير لونها بالتبييض",
    ],
    visualCaption: "تحليل انعكاس الضوء عبر طبقات المينا والعاج — رسم هندسي توضيحي",
  },
  {
    number: "3",
    kicker: "الخطوة 3 · القرار المشترك",
    title: "مناقشة الخيارات المتاحة",
    description:
      "بعد الفحص، يشرح لك الطبيب الخيارات الملائمة لحالتك بصراحة، مع توضيح خطوات كل خيار وما يمكن توقعه بواقعية لتختار ما يناسبك دون استعجال.",
    talkingPoints: [
      "مقارنة الخيارات الممكنة لحالتك الفردية",
      "توضيح تعليمات العناية لتقليل الحساسية المؤقتة",
      "منحك الوقت الكافي لاتخاذ القرار المناسب لك",
    ],
    visualCaption: "خطة زيارة واضحة ومصممة حسب استجابة الأسنان — مشهد توضيحي",
  },
];

export const SERVICE_EXPECTATIONS = {
  whatToExpect: [
    {
      index: "01",
      title: "تقييم صادق قبل أي إجراء",
      detail:
        "لا نبدأ بأي جلسة تبييض مباشرة دون التأكد من صحة اللثة وعدم وجود تسوس أو التهاب يحتاج إلى عناية أولاً.",
    },
    {
      index: "02",
      title: "توضيح واقعي لطبيعة النتائج",
      detail:
        "تختلف استجابة الأسنان للتبييض من شخص لآخر حسب طبيعة المينا ونوع التصبغ؛ لذلك نناقش معك التوقعات الواقعية بدون وعود مبالغ فيها.",
    },
    {
      index: "03",
      title: "بيئة هادئة ووقت مخصص لك",
      detail:
        "صُممت تجربة الزيارة لتكون بعيدة عن الاستعجال، مع شرح كل خطوة بلغة واضحة ومباشرة.",
    },
  ],
  questionsToAsk: [
    "هل نوع التصبغ لدي يستجيب للتبييض أم يحتاج إلى تنظيف وصقل أولاً؟",
    "ما الخيار الأنسب لي إذا كانت أسناني حساسة للمشروبات الباردة؟",
    "كيف سيؤثر التبييض على لون الحشوات التجميلية الموجودة في الأسنان الأمامية؟",
    "ما الإرشادات اليومية التي تساعد في الحفاظ على النتيجة بعد الجلسة؟",
  ],
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "حجز الموعد",
    question: "هل إرسال الطلب عبر الموقع يعني تأكيد الموعد فوراً؟",
    answer:
      "لا، إرسال الطلب يمثل تفضيلك الأولي للخدمة والوقت. هذا طلب موعد، ويتأكد بعد تواصل العيادة وياك لتنسيق الوقت المتاح بدقة.",
  },
  {
    id: "faq-2",
    category: "الاستشارة",
    question: "هل يتم إجراء التبييض في نفس يوم الاستشارة؟",
    answer:
      "الهدف الأساسي من الزيارة الأولى هو فحص حالة الأسنان واللثة وتحديد مدى الملاءمة. بعد التقييم ومناقشة الخيارات، يمكن تنسيق الخطوة التالية بما يناسب حالتك ووقتك.",
  },
  {
    id: "faq-3",
    category: "الملاءمة",
    question: "لماذا أحتاج إلى استشارة قبل تبييض الأسنان؟",
    answer:
      "تغير لون الأسنان له أسباب متعددة، وبعض الحالات قد تتطلب تنظيفاً أولياً أو معالجة للحساسية قبل التبييض، كما أن الحشوات والتيجان الخزفية لا يتغير لونها بمواد التبييض.",
  },
  {
    id: "faq-4",
    category: "التواصل",
    question: "ما المعلومات التي أحتاج لإدخالها عند طلب الموعد؟",
    answer:
      "نطلب فقط اختيار نوع الاستشارة، واليوم والفترة المفضلة، واسمك الكريم، مع رقم هاتف اختياري لتسهيل التواصل. لا نطلب أي سجل طبي عبر الموقع.",
  },
];
