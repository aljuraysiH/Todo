import * as yup from "yup";

export const Schema = yup.object().shape({
  title: yup
    .string()
    .required("الاسم مطلوب")
    .min(3, "يجب ان لا يقل عن ٣ احرف")
    .trim(),
});
