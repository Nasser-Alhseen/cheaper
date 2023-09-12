const selectOptions = {
  gender: [
    { name: "ذكر", value: "ذكر" },
    { name: "أنثى", value: "أنثى" },
  ],

  checkWithImageOrNot: {
    true: "مع صور حالات",
    false: "ليس له صور حالات",
    "مع صور حالات": true,
    "ليس له صور حالات": false,
  },

  blocked: [
    { name: "محظور", value: true },
    { name: "غير محظور", value: false },
  ],

  active: [
    { name: "نشط", value: true },
    { name: "غير نشط", value: false },
  ],

  city: [
    { name: "homs", vlaue: "homs" },
    { name: "dama", vlaue: "dama" },
  ],

  category: [
    { name: "الأحذية", vlaue: "الأحذية" },
    { name: "مسبح", vlaue: "مسبح" },
    { name: "بقالية", vlaue: "بقالية" },
  ],
  show: [
    { name: "معاهد", value: "institutes" },
    { name: "موظفين", value: "employees" },
    { name: "أدوار", value: "roles" },
    { name: "إحصائيات", value: "statistics" },
  ],

  operators: {
    text: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
      { name: "يحتوي", value: "contains" },
    ],
    number: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
      { name: "أكبر من", value: "greater than" },
      { name: "أكبر أو يساوي", value: "greater than or equal" },
      { name: "أقل من", value: "lettle than " },
      { name: "أقل أو يساوي", value: "lettle than or equal" },
    ],
    select: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
    ],
    array: [
      { name: "يحتوي", value: "contains" },
      { name: "لا يحتوي", value: "not contains" },
    ],
    date: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
      { name: "قبل", value: "greater than" },
      { name: "بعد", value: "lettle than " },
    ],
    "": [],
  },
};

export default selectOptions;
