const searchOptions = {
  categories: { name: { type: "text", operator: "contains", value: null, name: "الاسم" }, user: { type: "number", operator: null, value: null, name: "المستخدمين" }, store: { type: "number", operator: null, value: null, name: "المتاجر" }, offerTaken: { type: "number", operator: null, value: null, name: "العروض" } },
  roles: { name: { type: "text", operator: "contains", value: null, name: "الاسم" } },
  blocks: { reason: { type: "text", operator: "contains", value: null, name: "الاسم" } },
};

export default searchOptions;
